"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ApiRequestBuilder: React.FC = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);
  const [body, setBody] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleHeaderChange = (index: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value };
    setHeaders(newHeaders);
  };

  const handleSendRequest = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const requestOptions: RequestInit = {
        method,
        headers: headers.reduce((acc, header) => {
          if (header.key && header.value) acc[header.key] = header.value;
          return acc;
        }, {} as Record<string, string>),
        body: method !== "GET" && method !== "DELETE" ? body : undefined,
      };

      const res = await fetch(url, requestOptions);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(
        "Failed to fetch data. Please check the URL or request settings."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          API Request Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="method">Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
            />
          </div>

          <div className="space-y-2">
            <Label>Headers</Label>
            <div className="space-y-2">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Key"
                    value={header.key}
                    onChange={(e) =>
                      handleHeaderChange(index, e.target.value, header.value)
                    }
                  />
                  <Input
                    placeholder="Value"
                    value={header.value}
                    onChange={(e) =>
                      handleHeaderChange(index, header.key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            <Button
              onClick={handleAddHeader}
              variant="outline"
              className="w-full mt-2"
            >
              Add Header
            </Button>
          </div>

          {(method === "POST" || method === "PUT") && (
            <div className="space-y-2">
              <Label htmlFor="body">JSON Body</Label>
              <Textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="h-32 font-mono"
              />
            </div>
          )}

          <Button
            onClick={handleSendRequest}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Sending..." : "Send Request"}
          </Button>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}

          {response && (
            <div className="space-y-2">
              <Label>Response</Label>
              <div className="p-4 bg-secondary rounded-lg">
                <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-96">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiRequestBuilder;
