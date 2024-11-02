"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegexTester: React.FC = () => {
  const [regexInput, setRegexInput] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTestRegex = () => {
    try {
      const regex = new RegExp(regexInput, "g");
      const foundMatches = textInput.match(regex);
      setMatches(foundMatches);
      setError(null);
    } catch (e) {
      setError("Invalid regular expression");
      setMatches(null);
    }
  };

  const handleClear = () => {
    setRegexInput("");
    setTextInput("");
    setMatches(null);
    setError(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Regex Tester
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="regex">Regular Expression</Label>
          <Input
            id="regex"
            type="text"
            value={regexInput}
            onChange={(e) => setRegexInput(e.target.value)}
            placeholder="Enter regex pattern (e.g., \d+)"
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="text">Test Text</Label>
          <Textarea
            id="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text to test against the regex pattern"
            className="min-h-[120px] font-mono"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleTestRegex}
            className="flex-1"
            variant="secondary"
          >
            Test Regex
          </Button>
          <Button
            onClick={handleClear}
            variant="destructive"
            disabled={!regexInput && !textInput}
          >
            Clear
          </Button>
        </div>

        {error && (
          <p className="text-destructive text-sm text-center">{error}</p>
        )}

        {matches && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Matches:</h2>
            {matches.length > 0 ? (
              <div className="bg-secondary rounded-lg p-4">
                <ul className="space-y-2">
                  {matches.map((match, index) => (
                    <li key={index} className="font-mono">
                      {match}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">
                No matches found.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegexTester;
