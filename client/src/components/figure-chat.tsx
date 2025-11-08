import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Download, FileText } from "lucide-react";
import type { Figure, FigureMessage } from "@shared/schema";
import { PaperWriter } from "@/components/paper-writer";

interface FigureChatProps {
  figure: Figure | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FigureChat({ figure, open, onOpenChange }: FigureChatProps) {
  const [input, setInput] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const [pendingAssistantMessage, setPendingAssistantMessage] = useState("");
  const [messageCountBeforePending, setMessageCountBeforePending] = useState<number>(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [paperWriterOpen, setPaperWriterOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages = [] } = useQuery<FigureMessage[]>({
    queryKey: [`/api/figures/${figure?.id}/messages`],
    enabled: !!figure && open,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!figure) return;

      setIsStreaming(true);
      setStreamingMessage("");
      setPendingAssistantMessage("");

      const response = await fetch(`/api/figures/${figure.id}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      return new Promise<void>(async (resolve, reject) => {
        try {
          let accumulatedText = ""; // Local accumulator to avoid stale state
          
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
                  // CRITICAL FIX v2: Keep message visible until refetch confirms persistence
                  // Track message count to ensure we wait for the NEW message
                  // Use local accumulator to avoid stale state closure bug
                  const currentMessages = queryClient.getQueryData<FigureMessage[]>([`/api/figures/${figure.id}/messages`]) || [];
                  setMessageCountBeforePending(currentMessages.length);
                  setPendingAssistantMessage(accumulatedText);
                  setStreamingMessage("");
                  queryClient.invalidateQueries({
                    queryKey: [`/api/figures/${figure.id}/messages`],
                  });
                  resolve();
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  if (parsed.content) {
                    accumulatedText += parsed.content;
                    setStreamingMessage(accumulatedText);
                  }
                  if (parsed.error) {
                    console.error("Streaming error:", parsed.error);
                    setIsStreaming(false);
                    reject(new Error(parsed.error));
                    return;
                  }
                } catch (err) {
                  // Ignore parsing errors for incomplete chunks
                }
              }
            }
          }
        } catch (error) {
          console.error("Stream reading error:", error);
          setIsStreaming(false);
          setStreamingMessage("");
          setPendingAssistantMessage("");
          setMessageCountBeforePending(0);
          reject(error);
        }
      });
    },
  });

  const clearChatMutation = useMutation({
    mutationFn: async () => {
      if (!figure) return;
      const response = await fetch(`/api/figures/${figure.id}/messages`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to clear chat");
    },
    onSuccess: () => {
      if (!figure) return;
      queryClient.invalidateQueries({
        queryKey: [`/api/figures/${figure.id}/messages`],
      });
    },
  });

  const handleSend = () => {
    if (!input.trim() || isStreaming || !figure) return;
    
    const message = input.trim();
    setInput("");
    sendMessageMutation.mutate(message);
  };

  const handleDownload = () => {
    if (!figure || messages.length === 0) return;

    const timestamp = new Date().toLocaleString();
    let content = `Conversation with ${figure.name}\n`;
    content += `${figure.title}\n`;
    content += `Downloaded: ${timestamp}\n`;
    content += `${'='.repeat(60)}\n\n`;

    messages.forEach((message) => {
      const role = message.role === 'user' ? 'You' : figure.name;
      content += `${role}:\n${message.content}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${figure.name.replace(/\s+/g, '_')}_conversation_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear pending message once it appears in the fetched messages
  useEffect(() => {
    if (pendingAssistantMessage && messages.length > 0) {
      // Only clear if message count has increased (confirming new message was persisted)
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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingMessage, pendingAssistantMessage]);

  if (!figure) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="relative">
              {figure.icon.startsWith('/') || figure.icon.startsWith('http') ? (
                <>
                  <img 
                    src={figure.icon} 
                    alt={figure.name}
                    className={`w-16 h-16 rounded-full object-cover border-2 border-primary/20 transition-transform duration-500 ${isStreaming ? 'animate-spin' : ''}`}
                    data-testid={`icon-${figure.id}`}
                  />
                  {isStreaming && (
                    <div className="absolute -inset-1 rounded-full border-2 border-primary/50 animate-ping" />
                  )}
                </>
              ) : (
                <>
                  <span 
                    className={`text-4xl block transition-transform duration-500 ${isStreaming ? 'animate-spin' : ''}`}
                    data-testid={`icon-${figure.id}`}
                  >
                    {figure.icon}
                  </span>
                  {isStreaming && (
                    <div className="absolute -inset-2 rounded-full border-2 border-primary/50 animate-ping" />
                  )}
                </>
              )}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">{figure.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{figure.title}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => setPaperWriterOpen(true)}
                data-testid="button-write-paper"
              >
                <FileText className="w-4 h-4 mr-1" />
                Write Paper
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={messages.length === 0}
                data-testid="button-download-chat"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => clearChatMutation.mutate()}
                disabled={clearChatMutation.isPending || messages.length === 0}
                data-testid="button-clear-chat"
              >
                Clear Chat
              </Button>
            </div>
          </div>
          <DialogDescription className="text-sm text-muted-foreground mt-3">
            {figure.description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
            {messages.length === 0 && !streamingMessage && !pendingAssistantMessage && (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  Start a conversation with {figure.name}
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`figure-message-${message.id}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {streamingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted">
                  <p className="text-sm whitespace-pre-wrap">{streamingMessage}</p>
                  <span className="inline-block w-1 h-4 bg-foreground/50 ml-0.5 animate-pulse" />
                </div>
              </div>
            )}

            {pendingAssistantMessage && !streamingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted">
                  <p className="text-sm whitespace-pre-wrap">{pendingAssistantMessage}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

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
              placeholder={`Ask ${figure.name} a question...`}
              disabled={isStreaming}
              data-testid="input-figure-message"
              className="min-h-[120px] resize-none"
              rows={5}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              data-testid="button-send-figure-message"
              className="h-10"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
      
      <PaperWriter 
        figure={figure}
        open={paperWriterOpen}
        onOpenChange={setPaperWriterOpen}
      />
    </Dialog>
  );
}
