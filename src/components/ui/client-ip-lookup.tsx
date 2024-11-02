"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IPResponse {
  ip: string;
}

const ClientIPLookup: React.FC = () => {
  const [clientIp, setClientIp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getClientIp = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // Using ipify API - a free IP lookup service
      const response = await fetch("https://api.ipify.org?format=json");
      if (!response.ok) {
        throw new Error("Failed to fetch IP address");
      }
      const data: IPResponse = await response.json();
      setClientIp(data.ip);
    } catch (e) {
      setError("Could not retrieve IP address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setClientIp(null);
    setError(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Client IP Lookup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 justify-center">
          <Button
            onClick={getClientIp}
            variant="secondary"
            disabled={isLoading}
          >
            {isLoading ? "Getting IP..." : "Get My IP Address"}
          </Button>
          <Button
            onClick={handleClear}
            variant="destructive"
            disabled={!clientIp && !error}
          >
            Clear
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-center">
            {error}
          </div>
        )}

        {clientIp && (
          <div className="bg-secondary rounded-lg p-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">
              Your IP Address
            </div>
            <div className="text-lg font-bold font-mono">{clientIp}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientIPLookup;
