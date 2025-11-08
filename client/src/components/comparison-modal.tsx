import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, Users, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Figure, FigureMessage } from "@shared/schema";

interface ComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  figures: Figure[];
}

export function ComparisonModal({ open, onOpenChange, figures }: ComparisonModalProps) {
  const [selectedFigure1, setSelectedFigure1] = useState<Figure | null>(null);
  const [selectedFigure2, setSelectedFigure2] = useState<Figure | null>(null);
  const [input, setInput] = useState("");
  const [streaming1, setStreaming1] = useState("");
  const [streaming2, setStreaming2] = useState("");
  const [isStreaming1, setIsStreaming1] = useState(false);
  const [isStreaming2, setIsStreaming2] = useState(false);
  const messagesEndRef1 = useRef<HTMLDivElement>(null);
  const messagesEndRef2 = useRef<HTMLDivElement>(null);

  const { data: messages1 = [] } = useQuery<FigureMessage[]>({
    queryKey: [`/api/figures/${selectedFigure1?.id}/messages`],
    enabled: !!selectedFigure1 && open,
  });

  const { data: messages2 = [] } = useQuery<FigureMessage[]>({
    queryKey: [`/api/figures/${selectedFigure2?.id}/messages`],
    enabled: !!selectedFigure2 && open,
  });

  const streamResponse = async (figure: Figure, setStreaming: (msg: string) => void, setIsStreaming: (val: boolean) => void) => {
    if (!figure) {
      console.log("streamResponse: no figure provided");
      return;
    }

    console.log(`Starting stream for ${figure.name}, message: "${input.trim()}"`);
    setIsStreaming(true);
    setStreaming("");

    try {
      const response = await fetch(`/api/figures/${figure.id}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Ensure cookies are sent
        body: JSON.stringify({ message: input.trim() }),
      });

      console.log(`Response status for ${figure.name}:`, response.status, response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error response for ${figure.name}:`, errorText);
        throw new Error(`Failed to send message: ${response.status} ${errorText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let accumulatedText = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              setIsStreaming(false);
              // Invalidate the messages query to fetch the complete conversation including the new message
              await queryClient.invalidateQueries({
                queryKey: [`/api/figures/${figure.id}/messages`],
              });
              // Clear streaming after a brief delay to prevent flicker
              setTimeout(() => {
                setStreaming("");
              }, 100);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedText += parsed.content;
                setStreaming(accumulatedText);
              }
            } catch (err) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      console.error(`Stream error for ${figure.name}:`, error);
      setIsStreaming(false);
      setStreaming("");
      // Show error to user
      setStreaming(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setTimeout(() => setStreaming(""), 3000);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isStreaming1 || isStreaming2 || !selectedFigure1 || !selectedFigure2) {
      console.log("handleSend blocked:", { 
        hasInput: !!input.trim(), 
        isStreaming1, 
        isStreaming2, 
        hasFigure1: !!selectedFigure1, 
        hasFigure2: !!selectedFigure2 
      });
      return;
    }
    
    console.log("Starting comparison chat with:", selectedFigure1.name, "and", selectedFigure2.name);
    
    // Send to both figures in parallel
    await Promise.all([
      streamResponse(selectedFigure1, setStreaming1, setIsStreaming1),
      streamResponse(selectedFigure2, setStreaming2, setIsStreaming2),
    ]);

    setInput("");
  };

  const handleReset = () => {
    setSelectedFigure1(null);
    setSelectedFigure2(null);
    setInput("");
    setStreaming1("");
    setStreaming2("");
  };

  const handleDownload = () => {
    if (!selectedFigure1 || !selectedFigure2) return;
    
    const timestamp = new Date().toLocaleString();
    let content = `Philosophical Comparison: ${selectedFigure1.name} vs ${selectedFigure2.name}\n`;
    content += `Generated: ${timestamp}\n`;
    content += `${'='.repeat(80)}\n\n`;
    
    // Get all unique user questions
    const userMessages = messages1.filter(m => m.role === 'user');
    
    userMessages.forEach((userMsg, index) => {
      content += `QUESTION ${index + 1}:\n`;
      content += `${userMsg.content}\n\n`;
      content += `${'-'.repeat(80)}\n\n`;
      
      // Find corresponding responses
      const response1 = messages1.find(m => 
        m.role === 'assistant' && 
        messages1.indexOf(m) > messages1.indexOf(userMsg) &&
        (index === userMessages.length - 1 || messages1.indexOf(m) < messages1.indexOf(userMessages[index + 1]))
      );
      
      const response2 = messages2.find(m => 
        m.role === 'assistant' && 
        messages2.indexOf(m) > messages2.indexOf(userMsg) &&
        (index === userMessages.length - 1 || messages2.indexOf(m) < messages2.indexOf(userMessages[index + 1]))
      );
      
      if (response1) {
        content += `${selectedFigure1.name.toUpperCase()}'S RESPONSE:\n`;
        content += `${response1.content}\n\n`;
      }
      
      if (response2) {
        content += `${selectedFigure2.name.toUpperCase()}'S RESPONSE:\n`;
        content += `${response2.content}\n\n`;
      }
      
      content += `${'='.repeat(80)}\n\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = `${selectedFigure1.name.replace(/\s+/g, '_')}_vs_${selectedFigure2.name.replace(/\s+/g, '_')}_comparison_${Date.now()}.txt`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (messagesEndRef1.current) {
      messagesEndRef1.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages1, streaming1]);

  useEffect(() => {
    if (messagesEndRef2.current) {
      messagesEndRef2.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages2, streaming2]);

  const isSelectionMode = !selectedFigure1 || !selectedFigure2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <DialogTitle className="text-xl">Compare Two Thinkers</DialogTitle>
            </div>
            {!isSelectionMode && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={messages1.length === 0 && messages2.length === 0}
                  data-testid="button-download-comparison"
                  title="Download both responses"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  data-testid="button-change-thinkers"
                >
                  Change Thinkers
                </Button>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {isSelectionMode 
              ? "Select two philosophers to compare their perspectives side-by-side"
              : `Comparing: ${selectedFigure1?.name} vs ${selectedFigure2?.name}`
            }
          </p>
        </DialogHeader>

        {isSelectionMode ? (
          <div className="flex-1 px-6 py-8 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Select First Thinker */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {selectedFigure1 ? "✓ First Thinker Selected" : "Select First Thinker"}
                </h3>
                {selectedFigure1 ? (
                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {selectedFigure1.icon.startsWith('/') || selectedFigure1.icon.startsWith('http') ? (
                          <img 
                            src={selectedFigure1.icon} 
                            alt={selectedFigure1.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">{selectedFigure1.icon}</span>
                        )}
                        <CardTitle>{selectedFigure1.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{selectedFigure1.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFigure1(null)}
                        className="mt-3"
                      >
                        Change
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-2 pr-4">
                      {figures
                        .filter(f => f.id !== selectedFigure2?.id)
                        .map((figure) => (
                        <Card
                          key={figure.id}
                          className="cursor-pointer hover:border-primary transition-colors"
                          onClick={() => setSelectedFigure1(figure)}
                          data-testid={`select-figure1-${figure.id}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              {figure.icon.startsWith('/') || figure.icon.startsWith('http') ? (
                                <img 
                                  src={figure.icon} 
                                  alt={figure.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-2xl">{figure.icon}</span>
                              )}
                              <div className="flex-1">
                                <h4 className="font-semibold">{figure.name}</h4>
                                <p className="text-xs text-muted-foreground">{figure.title}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>

              {/* Right Column - Select Second Thinker */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {selectedFigure2 ? "✓ Second Thinker Selected" : "Select Second Thinker"}
                </h3>
                {selectedFigure2 ? (
                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {selectedFigure2.icon.startsWith('/') || selectedFigure2.icon.startsWith('http') ? (
                          <img 
                            src={selectedFigure2.icon} 
                            alt={selectedFigure2.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">{selectedFigure2.icon}</span>
                        )}
                        <CardTitle>{selectedFigure2.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{selectedFigure2.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFigure2(null)}
                        className="mt-3"
                      >
                        Change
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-2 pr-4">
                      {figures
                        .filter(f => f.id !== selectedFigure1?.id)
                        .map((figure) => (
                        <Card
                          key={figure.id}
                          className="cursor-pointer hover:border-primary transition-colors"
                          onClick={() => setSelectedFigure2(figure)}
                          data-testid={`select-figure2-${figure.id}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              {figure.icon.startsWith('/') || figure.icon.startsWith('http') ? (
                                <img 
                                  src={figure.icon} 
                                  alt={figure.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-2xl">{figure.icon}</span>
                              )}
                              <div className="flex-1">
                                <h4 className="font-semibold">{figure.name}</h4>
                                <p className="text-xs text-muted-foreground">{figure.title}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Comparison View - Two Columns */}
            <div className="flex-1 grid grid-cols-2 gap-4 px-6 min-h-0">
              {/* Left Column - Figure 1 */}
              <div className="flex flex-col border-r pr-4 min-h-0">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b flex-shrink-0">
                  {selectedFigure1.icon.startsWith('/') || selectedFigure1.icon.startsWith('http') ? (
                    <div className="relative">
                      <img 
                        src={selectedFigure1.icon} 
                        alt={selectedFigure1.name}
                        className={`w-12 h-12 rounded-full object-cover border-2 border-primary/20 transition-transform duration-500 ${isStreaming1 ? 'animate-spin' : ''}`}
                      />
                      {isStreaming1 && (
                        <div className="absolute -inset-1 rounded-full border-2 border-primary/50 animate-ping" />
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <span className={`text-3xl transition-transform duration-500 ${isStreaming1 ? 'animate-spin' : ''}`}>
                        {selectedFigure1.icon}
                      </span>
                      {isStreaming1 && (
                        <div className="absolute -inset-2 rounded-full border-2 border-primary/50 animate-ping" />
                      )}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{selectedFigure1.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedFigure1.title}</p>
                  </div>
                </div>

                <ScrollArea className="flex-1 h-0">
                  <div className="space-y-4 pr-2">
                    {messages1.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[90%] rounded-lg px-3 py-2 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}

                    {streaming1 && (
                      <div className="flex justify-start">
                        <div className="max-w-[90%] rounded-lg px-3 py-2 bg-muted">
                          <p className="text-sm whitespace-pre-wrap">{streaming1}</p>
                          <span className="inline-block w-1 h-4 bg-foreground/50 ml-0.5 animate-pulse" />
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef1} />
                  </div>
                </ScrollArea>
              </div>

              {/* Right Column - Figure 2 */}
              <div className="flex flex-col pl-4 min-h-0">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b flex-shrink-0">
                  {selectedFigure2.icon.startsWith('/') || selectedFigure2.icon.startsWith('http') ? (
                    <div className="relative">
                      <img 
                        src={selectedFigure2.icon} 
                        alt={selectedFigure2.name}
                        className={`w-12 h-12 rounded-full object-cover border-2 border-primary/20 transition-transform duration-500 ${isStreaming2 ? 'animate-spin' : ''}`}
                      />
                      {isStreaming2 && (
                        <div className="absolute -inset-1 rounded-full border-2 border-primary/50 animate-ping" />
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <span className={`text-3xl transition-transform duration-500 ${isStreaming2 ? 'animate-spin' : ''}`}>
                        {selectedFigure2.icon}
                      </span>
                      {isStreaming2 && (
                        <div className="absolute -inset-2 rounded-full border-2 border-primary/50 animate-ping" />
                      )}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{selectedFigure2.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedFigure2.title}</p>
                  </div>
                </div>

                <ScrollArea className="flex-1 h-0">
                  <div className="space-y-4 pr-2">
                    {messages2.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[90%] rounded-lg px-3 py-2 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}

                    {streaming2 && (
                      <div className="flex justify-start">
                        <div className="max-w-[90%] rounded-lg px-3 py-2 bg-muted">
                          <p className="text-sm whitespace-pre-wrap">{streaming2}</p>
                          <span className="inline-block w-1 h-4 bg-foreground/50 ml-0.5 animate-pulse" />
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef2} />
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Input Area */}
            <div className="px-6 py-4 border-t">
              <div className="flex gap-2 items-end">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={`Ask both ${selectedFigure1.name} and ${selectedFigure2.name} the same question...`}
                  disabled={isStreaming1 || isStreaming2}
                  data-testid="input-comparison-message"
                  className="min-h-[100px] resize-none"
                  rows={4}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming1 || isStreaming2}
                  data-testid="button-send-comparison"
                  className="h-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Both thinkers will respond simultaneously in real-time
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
