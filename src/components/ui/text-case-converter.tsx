"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TextCaseConverter: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [convertedText, setConvertedText] = useState<string>("");

  const handleUpperCase = () => {
    setConvertedText(inputText.toUpperCase());
  };

  const handleLowerCase = () => {
    setConvertedText(inputText.toLowerCase());
  };

  const handleTitleCase = () => {
    const titleCased = inputText
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setConvertedText(titleCased);
  };

  const handleSentenceCase = () => {
    const sentenceCased = inputText
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s+\w)/g, (letter) => letter.toUpperCase());
    setConvertedText(sentenceCased);
  };

  const handleClear = () => {
    setInputText("");
    setConvertedText("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText);
      toast.success("Text copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Text Case Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[120px] font-mono"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button onClick={handleUpperCase} variant="secondary">
            UPPERCASE
          </Button>
          <Button onClick={handleLowerCase} variant="secondary">
            lowercase
          </Button>
          <Button onClick={handleTitleCase} variant="secondary">
            Title Case
          </Button>
          <Button onClick={handleSentenceCase} variant="secondary">
            Sentence case
          </Button>
        </div>

        <div className="space-y-2">
          <Textarea
            value={convertedText}
            readOnly
            placeholder="Converted text will appear here..."
            className="min-h-[120px] font-mono"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCopy}
            className="flex-1"
            disabled={!convertedText}
          >
            Copy to Clipboard
          </Button>
          <Button
            onClick={handleClear}
            variant="destructive"
            disabled={!inputText && !convertedText}
          >
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextCaseConverter;
