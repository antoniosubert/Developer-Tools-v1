"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Base64EncoderDecoder: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    try {
      const encodedText = btoa(inputText);
      setOutputText(encodedText);
      setError(null);
    } catch (e) {
      setError("Encoding failed. Please enter valid text.");
      setOutputText("");
    }
  };

  const handleDecode = () => {
    try {
      const decodedText = atob(inputText);
      setOutputText(decodedText);
      setError(null);
    } catch (e) {
      setError("Decoding failed. Please enter valid Base64 encoded text.");
      setOutputText("");
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setError(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast.success("Text copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Base64 Encoder / Decoder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to encode or decode..."
            className="min-h-[120px] font-mono"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button onClick={handleEncode} variant="secondary">
            Encode to Base64
          </Button>
          <Button onClick={handleDecode} variant="secondary">
            Decode from Base64
          </Button>
          <Button
            onClick={handleCopy}
            variant="secondary"
            disabled={!outputText}
          >
            Copy Result
          </Button>
          <Button
            onClick={handleClear}
            variant="destructive"
            disabled={!inputText && !outputText}
          >
            Clear All
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm text-center">{error}</p>
        )}

        <div className="space-y-2">
          <Textarea
            value={outputText}
            readOnly
            placeholder="Result will appear here..."
            className="min-h-[120px] font-mono"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Base64EncoderDecoder;
