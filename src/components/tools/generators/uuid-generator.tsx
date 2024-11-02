"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const UUIDGenerator: React.FC = () => {
  const [uuid, setUUID] = useState<string>("");

  const handleGenerateUUID = () => {
    const newUUID = uuidv4();
    setUUID(newUUID);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uuid);
      toast.success("UUID copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy UUID");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          UUID Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          onClick={handleGenerateUUID}
          className="w-full"
          variant="secondary"
        >
          Generate UUID
        </Button>

        {uuid && (
          <div className="space-y-2">
            <Input
              type="text"
              readOnly
              value={uuid}
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="font-mono text-center"
            />
            <Button
              onClick={handleCopyToClipboard}
              className="w-full"
              variant="outline"
            >
              Copy to Clipboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UUIDGenerator;
