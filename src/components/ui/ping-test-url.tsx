"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PingResult {
  time: string;
  latency: number;
  status: number;
}

const PingTestURL: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [results, setResults] = useState<PingResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    avg: number;
    min: number;
    max: number;
  } | null>(null);

  const pingUrl = async () => {
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to ping URL");
      }

      const newResult: PingResult = {
        time: new Date().toLocaleTimeString(),
        latency: data.latency,
        status: data.status,
      };

      const updatedResults = [...results, newResult].slice(-5); // Keep last 5 results
      setResults(updatedResults);

      // Calculate statistics
      const latencies = updatedResults.map((r) => r.latency);
      setStats({
        avg: Math.round(
          latencies.reduce((a, b) => a + b, 0) / latencies.length
        ),
        min: Math.min(...latencies),
        max: Math.max(...latencies),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to ping URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          URL Ping Test
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={pingUrl} disabled={isLoading}>
              {isLoading ? "Pinging..." : "Ping"}
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}

          {stats && (
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Average</div>
                <div className="text-lg font-bold">{stats.avg}ms</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Min</div>
                <div className="text-lg font-bold">{stats.min}ms</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-sm text-muted-foreground">Max</div>
                <div className="text-lg font-bold">{stats.max}ms</div>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Results</h3>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-2 bg-secondary rounded-lg"
                  >
                    <span className="text-sm text-muted-foreground">
                      {result.time}
                    </span>
                    <div className="flex gap-4">
                      <span className="font-medium">{result.latency}ms</span>
                      <span className="text-sm text-muted-foreground">
                        Status: {result.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PingTestURL;
