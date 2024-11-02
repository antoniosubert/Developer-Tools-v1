"use client";

import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [qrCodeValue, setQRCodeValue] = useState<string>("");

  const handleGenerateQRCode = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text or URL");
      return;
    }
    setQRCodeValue(inputText);
  };

  const handleClear = () => {
    setInputText("");
    setQRCodeValue("");
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    if (canvas) {
      try {
        const qrImage = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = qrImage;
        link.download = "qr-code.png";
        link.click();
        toast.success("QR Code downloaded successfully");
      } catch (error) {
        toast.error("Failed to download QR Code");
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          QR Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text or URL to generate QR code..."
            className="min-h-[120px]"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleGenerateQRCode}
            className="flex-1"
            variant="secondary"
          >
            Generate QR Code
          </Button>
          <Button
            onClick={handleClear}
            variant="destructive"
            disabled={!inputText && !qrCodeValue}
          >
            Clear
          </Button>
        </div>

        {qrCodeValue && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg">
                <QRCodeCanvas value={qrCodeValue} size={256} />
              </div>
            </div>
            <Button onClick={handleDownload} className="w-full">
              Download QR Code
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
