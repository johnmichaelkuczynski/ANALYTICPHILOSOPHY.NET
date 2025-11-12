import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ModelBuilderSectionProps {
  onRegisterInput?: (setter: (text: string) => void) => void;
  onTransferContent?: (content: string, target: 'chat' | 'model' | 'paper') => void;
}

export function ModelBuilderSection({ onRegisterInput, onTransferContent }: ModelBuilderSectionProps) {
  const [originalText, setOriginalText] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [generatedModel, setGeneratedModel] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Register input setter with parent
  useEffect(() => {
    if (onRegisterInput) {
      onRegisterInput(setOriginalText);
    }
  }, [onRegisterInput]);

  const handleGenerate = async () => {
    if (!originalText.trim()) {
      return;
    }

    setIsGenerating(true);
    setGeneratedModel("");

    try {
      const response = await fetch("/api/model-builder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalText: originalText.trim(),
          customInstructions: customInstructions.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate model");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulatedText = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                setIsGenerating(false);
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  accumulatedText += parsed.content;
                  setGeneratedModel(accumulatedText);
                }
              } catch (e) {
                console.error("Parse error:", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error generating model:", error);
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <CardTitle>Model Builder</CardTitle>
        </div>
        <CardDescription>
          Validate philosophical theories and find isomorphic reinterpretations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="original-theory">Philosophical Response</Label>
              <Textarea
                id="original-theory"
                placeholder="Paste the philosopher's response here, or click the arrow button on any response..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                rows={8}
                data-testid="input-original-theory"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-instructions">Custom Instructions (Optional)</Label>
              <Textarea
                id="custom-instructions"
                placeholder="e.g., 'Find a model from finance that validates Spinoza's theory' or 'Translate to modern cognitive science terms'"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                rows={4}
                data-testid="input-custom-instructions"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !originalText.trim()}
              className="w-full"
              data-testid="button-generate-model"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Model...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Model
                </>
              )}
            </Button>
          </div>

          {/* Output Column */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Generated Model</Label>
              {generatedModel && !isGenerating && onTransferContent && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs gap-1"
                      data-testid="button-transfer-model"
                    >
                      Send to
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => onTransferContent(generatedModel, 'chat')}
                      data-testid="menu-transfer-to-chat"
                    >
                      Chat Input
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onTransferContent(generatedModel, 'paper')}
                      data-testid="menu-transfer-to-paper"
                    >
                      Paper Writer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="border rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-y-auto bg-muted/30">
              {!generatedModel && !isGenerating ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-center">
                  <div className="space-y-2">
                    <Sparkles className="w-12 h-12 mx-auto opacity-20" />
                    <p>Generated model will appear here...</p>
                    <p className="text-xs">Click Generate to begin</p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{generatedModel}</ReactMarkdown>
                  {isGenerating && (
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
