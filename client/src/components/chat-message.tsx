import { BibleVerseCard } from "./bible-verse-card";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ArrowRight } from "lucide-react";
import type { Message } from "@shared/schema";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
  onTransferContent?: (content: string, target: 'chat' | 'model' | 'paper') => void;
}

export function ChatMessage({ message, isStreaming, onTransferContent }: ChatMessageProps) {
  const isUser = message.role === "user";

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

        {!isUser && !isStreaming && onTransferContent && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="self-end text-xs gap-1"
                data-testid="button-transfer-response"
              >
                Send to
                <ArrowRight className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => onTransferContent(message.content, 'model')}
                data-testid="menu-transfer-to-model"
              >
                Model Builder
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onTransferContent(message.content, 'paper')}
                data-testid="menu-transfer-to-paper"
              >
                Paper Writer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
