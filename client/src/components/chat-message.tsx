import { BibleVerseCard } from "./bible-verse-card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import type { Message } from "@shared/schema";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [, setLocation] = useLocation();

  const handleSendToModelBuilder = () => {
    const encodedText = encodeURIComponent(message.content);
    setLocation(`/model-builder?text=${encodedText}`);
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300`}
      data-testid={`message-${message.id}`}
    >
      <div className={`max-w-[85%] md:max-w-[75%] space-y-3 ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`px-4 py-3 md:px-6 md:py-4 rounded-2xl ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-card text-card-foreground border border-card-border rounded-bl-sm"
          }`}
        >
          <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap">
            {message.content}
            {isStreaming && (
              <span className="inline-block w-2 h-5 ml-1 bg-current animate-pulse" />
            )}
          </p>
        </div>

        {!isUser && message.verseText && message.verseReference && (
          <BibleVerseCard
            verseText={message.verseText}
            verseReference={message.verseReference}
          />
        )}

        {!isUser && !isStreaming && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSendToModelBuilder}
            className="self-end text-xs"
            data-testid="button-send-to-model-builder"
          >
            Send to Model Builder
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
