"use client";

import React, { useState } from "react";
import { marked } from "marked";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const MarkdownPreviewer: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownText);
      toast.success("Markdown copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const handleClear = () => {
    setMarkdownText("");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Markdown Previewer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Textarea
            value={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            placeholder="Enter your Markdown here..."
            className="min-h-[200px] font-mono"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCopy}
            className="flex-1"
            variant="secondary"
            disabled={!markdownText}
          >
            Copy Markdown
          </Button>
          <Button
            onClick={handleClear}
            variant="destructive"
            disabled={!markdownText}
          >
            Clear
          </Button>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div
            className="prose prose-sm dark:prose-invert max-w-none p-4 bg-secondary rounded-lg"
            dangerouslySetInnerHTML={{ __html: marked(markdownText) }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MarkdownPreviewer;
