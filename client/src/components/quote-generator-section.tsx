import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Quote, Copy, Trash2, Upload, BookOpen, FileUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import type { Figure } from "@shared/schema";

interface QuoteGeneratorSectionProps {
  onRegisterInput?: (setter: (content: string) => void) => void;
}

export function QuoteGeneratorSection({ onRegisterInput }: QuoteGeneratorSectionProps) {
  const [mode, setMode] = useState<'author' | 'upload'>('author');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [query, setQuery] = useState('');
  const [numQuotes, setNumQuotes] = useState('10');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedQuotes, setGeneratedQuotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const queryTextareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch available figures
  const { data: figures = [] } = useQuery<Figure[]>({
    queryKey: ["/api/figures"],
  });

  // Register input setter for external content transfer
  useEffect(() => {
    if (onRegisterInput) {
      onRegisterInput((content: string) => setQuery(content));
    }
  }, [onRegisterInput]);

  const handleGenerate = async () => {
    if (mode === 'author' && (!selectedAuthor || !query.trim())) {
      toast({
        title: "Missing information",
        description: "Please select an author and enter a query.",
        variant: "destructive",
      });
      return;
    }

    if (mode === 'upload' && !selectedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a file to extract quotes from.",
        variant: "destructive",
      });
      return;
    }

    const quotesNum = parseInt(numQuotes) || 10;
    if (quotesNum < 1 || quotesNum > 50) {
      toast({
        title: "Invalid number",
        description: "Number of quotes must be between 1 and 50.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedQuotes('');

    try {
      if (mode === 'author') {
        // Use public quote generation API for site authors
        const response = await fetch('/api/quotes/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query.trim(),
            author: selectedAuthor,
            numQuotes: quotesNum,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.success || !data.quotes || data.quotes.length === 0) {
          setGeneratedQuotes('No quotes found matching your query. Try a different search term or author.');
          return;
        }

        // Format quotes with numbering and source attribution
        const formattedQuotes = data.quotes
          .map((q: any, index: number) => 
            `${index + 1}. "${q.text}"\n   — ${selectedAuthor} (${q.source}, chunk ${q.chunkIndex})`
          )
          .join('\n\n');

        setGeneratedQuotes(formattedQuotes);

        toast({
          title: "Quotes generated",
          description: `Found ${data.quotes.length} quotes from ${selectedAuthor}`,
        });

      } else {
        // Upload mode: extract quotes from user's document
        const formData = new FormData();
        formData.append('file', selectedFile!);
        formData.append('query', query.trim() || 'all');
        formData.append('numQuotes', quotesNum.toString());

        const response = await fetch('/api/quotes/extract', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success || !data.quotes || data.quotes.length === 0) {
          setGeneratedQuotes('No quotes found in the uploaded file. Try adjusting your search criteria.');
          return;
        }

        // Format quotes with numbering
        const formattedQuotes = data.quotes
          .map((q: string, index: number) => `${index + 1}. "${q}"`)
          .join('\n\n');

        setGeneratedQuotes(formattedQuotes);

        toast({
          title: "Quotes extracted",
          description: `Found ${data.quotes.length} quotes from ${selectedFile!.name}`,
        });
      }
    } catch (error) {
      console.error('Quote generation error:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate quotes",
        variant: "destructive",
      });
      setGeneratedQuotes('');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
      if (!allowedTypes.includes(file.type) && !file.name.match(/\.(txt|pdf|docx|doc)$/i)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a .txt, .pdf, .doc, or .docx file",
          variant: "destructive",
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedQuotes);
    toast({
      title: "Copied to clipboard",
      description: "Quotes have been copied successfully",
    });
  };

  const handleDelete = () => {
    setGeneratedQuotes('');
    toast({
      title: "Quotes deleted",
      description: "The generated quotes have been cleared",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Quote className="w-5 h-5 text-primary" />
          <CardTitle>Quote Generator</CardTitle>
        </div>
        <CardDescription>
          Extract quotes from site authors or upload your own documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={mode} onValueChange={(v) => setMode(v as 'author' | 'upload')} className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="author" data-testid="tab-mode-author">
              <BookOpen className="w-4 h-4 mr-2" />
              Site Authors
            </TabsTrigger>
            <TabsTrigger value="upload" data-testid="tab-mode-upload">
              <FileUp className="w-4 h-4 mr-2" />
              Upload File
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Column */}
          <div className="space-y-4">
            {mode === 'author' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="author-select-quotes">Select Author</Label>
                  <Select
                    value={selectedAuthor}
                    onValueChange={setSelectedAuthor}
                  >
                    <SelectTrigger id="author-select-quotes" data-testid="select-author-quotes">
                      <SelectValue placeholder="Choose an author..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {figures.map((figure) => (
                        <SelectItem key={figure.id} value={figure.name}>
                          {figure.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="query-input-quotes">
                    Query (topic or keywords)
                  </Label>
                  <Textarea
                    ref={queryTextareaRef}
                    id="query-input-quotes"
                    placeholder="e.g., 'unconscious mind', 'action at a distance', 'class struggle'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (selectedAuthor && query.trim() && !isGenerating) {
                          handleGenerate();
                        }
                      }
                    }}
                    rows={4}
                    data-testid="input-query-quotes"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="file-upload-quotes">Upload Document</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file-upload-quotes"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".txt,.pdf,.doc,.docx"
                      className="hidden"
                      data-testid="input-file-quotes"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                      data-testid="button-select-file"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {selectedFile ? selectedFile.name : 'Choose file (.txt, .pdf, .doc, .docx)'}
                    </Button>
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      File size: {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="query-input-upload">
                    Search Criteria (optional)
                  </Label>
                  <Textarea
                    id="query-input-upload"
                    placeholder="Leave blank to extract all quotes, or specify keywords to filter"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (selectedFile && !isGenerating) {
                          handleGenerate();
                        }
                      }
                    }}
                    rows={3}
                    data-testid="input-query-upload"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="num-quotes-input">Number of Quotes (1-50)</Label>
              <Input
                id="num-quotes-input"
                type="number"
                min="1"
                max="50"
                value={numQuotes}
                onChange={(e) => setNumQuotes(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if ((mode === 'author' && selectedAuthor && query.trim() && !isGenerating) || 
                        (mode === 'upload' && selectedFile && !isGenerating)) {
                      handleGenerate();
                    }
                  }
                }}
                placeholder="10"
                data-testid="input-num-quotes"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || (mode === 'author' && (!selectedAuthor || !query.trim())) || (mode === 'upload' && !selectedFile)}
              className="w-full"
              data-testid="button-generate-quotes"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Quotes...
                </>
              ) : (
                <>
                  <Quote className="w-4 h-4 mr-2" />
                  Generate Quotes
                </>
              )}
            </Button>
          </div>

          {/* Output Column */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Generated Quotes</Label>
              {generatedQuotes && !isGenerating && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 px-2"
                    data-testid="button-copy-quotes"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    className="h-7 px-2 text-destructive hover:text-destructive"
                    data-testid="button-delete-quotes"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className="min-h-[400px] p-4 rounded-md border bg-muted/30">
              {generatedQuotes ? (
                <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-serif">
                  {generatedQuotes}
                  {isGenerating && (
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  {isGenerating ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <p className="text-center">
                      {mode === 'author' 
                        ? 'Select an author, enter a query, and click "Generate Quotes"'
                        : 'Upload a document and click "Generate Quotes"'
                      }
                    </p>
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
