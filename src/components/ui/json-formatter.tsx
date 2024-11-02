"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const JSONFormatter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [formattedJson, setFormattedJson] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFormatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
      setError(null);
    } catch (e) {
      setError("Invalid JSON. Please check your input.");
      setFormattedJson("");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      toast.success("JSON copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy JSON");
    }
  };

  const handleClear = () => {
    setJsonInput("");
    setFormattedJson("");
    setError(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          JSON Formatter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Enter your JSON here..."
            className="min-h-[200px] font-mono"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleFormatJson}
            className="flex-1"
            variant="secondary"
          >
            Format JSON
          </Button>
          <Button
            onClick={handleCopy}
            variant="secondary"
            disabled={!formattedJson}
          >
            Copy
          </Button>
          <Button
            onClick={handleClear}
            variant="destructive"
            disabled={!jsonInput && !formattedJson}
          >
            Clear
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm text-center">{error}</p>
        )}

        {formattedJson && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Formatted JSON:</h2>
            <div className="bg-secondary rounded-lg p-4">
              <pre className="whitespace-pre-wrap break-all font-mono text-sm">
                {formattedJson}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JSONFormatter;
