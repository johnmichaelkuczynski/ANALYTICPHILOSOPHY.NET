import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { FigureChat } from "@/components/figure-chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Search, Users } from "lucide-react";
import type { Message, PersonaSettings, Figure } from "@shared/schema";
import kuczynskiIcon from "/jmk-photo.png";
import { ComparisonModal } from "@/components/comparison-modal";

const DEFAULT_PERSONA_SETTINGS: Partial<PersonaSettings> = {
  responseLength: 0,
  writePaper: false,
  quoteFrequency: 2,
};

export default function Chat() {
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [pendingAssistantMessage, setPendingAssistantMessage] = useState<string>("");
  const [messageCountBeforePending, setMessageCountBeforePending] = useState<number>(0);
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null);
  const [figureDialogOpen, setFigureDialogOpen] = useState(false);
  const [figureSearchQuery, setFigureSearchQuery] = useState("");
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  const { data: fetchedSettings, isLoading: settingsLoading } = useQuery<PersonaSettings>({
    queryKey: ["/api/persona-settings"],
  });

  const { data: figures = [], isLoading: figuresLoading } = useQuery<Figure[]>({
    queryKey: ["/api/figures"],
  });
  
  const personaSettings = fetchedSettings || DEFAULT_PERSONA_SETTINGS as PersonaSettings;

  const { data: messages = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const updatePersonaMutation = useMutation({
    mutationFn: async (settings: Partial<PersonaSettings>) => {
      return apiRequest("POST", "/api/persona-settings", settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/persona-settings"] });
    },
  });

  const handleSendMessage = async (content: string, documentText?: string) => {
    setIsStreaming(true);
    setStreamingMessage("");
    setPendingAssistantMessage("");

    // Optimistically add user message to UI immediately
    queryClient.setQueryData(["/api/messages"], (oldData: any) => {
      const newUserMessage = {
        id: Date.now(), // Temporary ID
        content,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      return oldData ? [...oldData, newUserMessage] : [newUserMessage];
    });

    try {
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content, documentText }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedText = "";
        let buffer = "";
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode without streaming flag to get complete chunks
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          
          // Keep the last incomplete line in the buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                setIsStreaming(false);
                
                // CRITICAL FIX v2: Don't clear streaming message yet
                // Keep it visible as pendingAssistantMessage until refetch confirms persistence
                // Track message count to ensure we wait for the NEW message, not just any matching text
                const currentMessages = queryClient.getQueryData<Message[]>(["/api/messages"]) || [];
                setMessageCountBeforePending(currentMessages.length);
                setPendingAssistantMessage(accumulatedText);
                setStreamingMessage("");
                
                // Refetch to get the real message from backend (with correct ID)
                queryClient.refetchQueries({ queryKey: ["/api/messages"] });
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  accumulatedText += parsed.content;
                  setStreamingMessage(accumulatedText);
                }
              } catch (e) {
                console.error("Parse error:", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsStreaming(false);
      setStreamingMessage("");
      setPendingAssistantMessage("");
      setMessageCountBeforePending(0);
    }
  };


  // Clear pending message once it appears in the fetched messages
  useEffect(() => {
    if (pendingAssistantMessage && messages.length > 0) {
      // Only clear if message count has increased (confirming new message was persisted)
      // AND the last message matches our pending content
      if (messages.length > messageCountBeforePending) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.role === "assistant" && lastMessage.content === pendingAssistantMessage) {
          setPendingAssistantMessage("");
          setMessageCountBeforePending(0);
        }
      }
    }
  }, [messages, pendingAssistantMessage, messageCountBeforePending]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage, pendingAssistantMessage]);

  if (settingsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const filteredFigures = figures.filter((figure) =>
    figure.name.toLowerCase().includes(figureSearchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Far Left Column: Religious Figures - ALWAYS VISIBLE */}
      <aside className="w-40 border-r flex-shrink-0 overflow-y-auto bg-card hidden lg:block">
        <div className="p-2 border-b sticky top-0 bg-card z-10 space-y-2">
          <div className="text-xs font-semibold text-center text-muted-foreground">
            Talk with
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={figureSearchQuery}
              onChange={(e) => setFigureSearchQuery(e.target.value)}
              className="h-7 text-xs pl-7 pr-2"
              data-testid="input-search-figures"
            />
          </div>
        </div>
        <div className="p-2">
          {figuresLoading ? (
            <div className="text-xs text-muted-foreground text-center">Loading...</div>
          ) : filteredFigures.length === 0 ? (
            <div className="text-xs text-muted-foreground text-center">
              {figureSearchQuery ? "No matches" : "No figures"}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {filteredFigures.map((figure) => (
                <button
                  key={figure.id}
                  onClick={() => {
                    setSelectedFigure(figure);
                    setFigureDialogOpen(true);
                  }}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-primary/10 transition-colors group"
                  title={`${figure.name} - ${figure.title}`}
                  data-testid={`button-talk-${figure.id}`}
                >
                  {figure.icon.startsWith('/') || figure.icon.startsWith('http') ? (
                    <img 
                      src={figure.icon} 
                      alt={figure.name}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <span className="text-2xl">{figure.icon}</span>
                  )}
                  <span className="text-[10px] leading-tight text-center font-medium group-hover:text-primary">
                    {(() => {
                      const parts = figure.name.split(' ');
                      // Handle compound surnames like "Le Bon"
                      if (parts.length >= 2 && parts[parts.length - 2] === 'Le') {
                        return parts.slice(-2).join(' ');
                      }
                      return parts.slice(-1)[0];
                    })()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Middle Sidebar: Settings */}
      <aside className="lg:w-64 border-r flex-shrink-0 overflow-y-auto bg-card">
        <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-card z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Settings</h2>
          </div>
          <ThemeToggle />
        </div>

        <div className="p-4 space-y-4">
          {/* Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="response-length" className="text-sm font-medium">
                  Response Length (words)
                </Label>
                <Input
                  id="response-length"
                  type="number"
                  placeholder="Auto"
                  value={personaSettings.responseLength === 0 ? '' : personaSettings.responseLength}
                  onChange={(e) => {
                    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= 0) {
                      updatePersonaMutation.mutate({ responseLength: value });
                    }
                  }}
                  min={0}
                  data-testid="input-response-length"
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank for auto mode (AI chooses optimal length)
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t">
                <Label htmlFor="quote-frequency" className="text-sm font-medium">
                  Quote Frequency
                </Label>
                <Select
                  value={(personaSettings.quoteFrequency || 2).toString()}
                  onValueChange={(value) =>
                    updatePersonaMutation.mutate({ quoteFrequency: parseInt(value, 10) })
                  }
                >
                  <SelectTrigger id="quote-frequency" data-testid="select-quote-frequency" className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Low (1 quote)</SelectItem>
                    <SelectItem value="2">Normal (1-2 quotes)</SelectItem>
                    <SelectItem value="3">High (2-3 quotes)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Control how many quotes appear in responses
                </p>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Label htmlFor="write-paper" className="text-sm font-medium cursor-pointer">
                      Write a Paper
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Generate formal philosophical papers
                    </p>
                  </div>
                  <Switch
                    id="write-paper"
                    checked={personaSettings.writePaper}
                    onCheckedChange={(checked) =>
                      updatePersonaMutation.mutate({ writePaper: checked })
                    }
                    data-testid="switch-write-paper"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main
        className="flex-1 flex flex-col relative bg-gradient-to-br from-sky-100 via-slate-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      >
        <div className="absolute inset-0 bg-background/60 dark:bg-background/70 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur-md">
            <div className="px-4 py-3 flex items-center justify-between">
              <a
                href="mailto:contact@zhisystems.ai"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-contact"
              >
                Contact Us
              </a>
              <div className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-primary/20">
                    <img
                      src={kuczynskiIcon}
                      alt="J.-M. Kuczynski"
                      className={`w-full h-full object-contain scale-75 -translate-y-1 transition-transform duration-500 ${isStreaming ? 'animate-spin' : ''}`}
                      data-testid="icon-kuczynski"
                    />
                  </div>
                  {isStreaming && (
                    <div className="absolute -inset-1 rounded-full border-2 border-primary/50 animate-ping" />
                  )}
                </div>
                <h1 className="font-display text-2xl font-light">
                  Ask A Philosopher
                </h1>
              </div>
              <Button
                onClick={() => setComparisonModalOpen(true)}
                variant="outline"
                size="sm"
                className="gap-2"
                data-testid="button-compare-thinkers"
              >
                <Users className="w-4 h-4" />
                Compare Thinkers
              </Button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 && !streamingMessage && !pendingAssistantMessage ? (
              <div className="h-full flex items-center justify-center p-8">
                <Card className="max-w-md">
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        Welcome to Ask A Philosopher
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        Ask and Learn
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto px-4 py-8">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {streamingMessage && (
                  <ChatMessage
                    message={{
                      id: "streaming",
                      conversationId: "",
                      role: "assistant",
                      content: streamingMessage,
                      verseText: null,
                      verseReference: null,
                      createdAt: new Date(),
                    }}
                    isStreaming={true}
                  />
                )}
                {pendingAssistantMessage && !streamingMessage && (
                  <ChatMessage
                    message={{
                      id: "pending",
                      conversationId: "",
                      role: "assistant",
                      content: pendingAssistantMessage,
                      verseText: null,
                      verseReference: null,
                      createdAt: new Date(),
                    }}
                    isStreaming={false}
                  />
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="relative">
            <ChatInput onSend={handleSendMessage} disabled={isStreaming} />
          </div>
        </div>
      </main>

      {/* Figure Chat Dialog */}
      <FigureChat 
        figure={selectedFigure} 
        open={figureDialogOpen} 
        onOpenChange={setFigureDialogOpen} 
      />

      {/* Comparison Modal */}
      <ComparisonModal
        open={comparisonModalOpen}
        onOpenChange={setComparisonModalOpen}
        figures={figures}
      />
    </div>
  );
}
