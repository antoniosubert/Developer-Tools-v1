"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = ((rgb >> 16) & 0xff) / 255;
  const g = ((rgb >> 8) & 0xff) / 255;
  const b = (rgb & 0xff) / 255;
  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const ColorContrastOptimizer: React.FC = () => {
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
  const [contrastRatio, setContrastRatio] = useState<number>(21);
  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(100);

  useEffect(() => {
    const ratio = getContrastRatio(textColor, backgroundColor);
    setContrastRatio(ratio);
  }, [textColor, backgroundColor]);

  const getComplianceStatus = (ratio: number) => {
    if (ratio >= 7) return { text: "AAA", color: "text-green-500" };
    if (ratio >= 4.5) return { text: "AA", color: "text-blue-500" };
    if (ratio >= 3)
      return { text: "AA (Large text only)", color: "text-yellow-500" };
    return { text: "Fail", color: "text-red-500" };
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Color Contrast Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="textColor" className="text-sm font-medium">
              Text Color
            </Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="textColor"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backgroundColor" className="text-sm font-medium">
              Background Color
            </Label>
            <div className="flex gap-2">
              <Input
                type="color"
                id="backgroundColor"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hue" className="text-sm font-medium">
              Hue: {hue}°
            </Label>
            <Slider
              id="hue"
              min={0}
              max={360}
              step={1}
              value={[hue]}
              onValueChange={(value) => setHue(value[0])}
              className="[&_[role=slider]]:bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="saturation" className="text-sm font-medium">
              Saturation: {saturation}%
            </Label>
            <Slider
              id="saturation"
              min={0}
              max={100}
              step={1}
              value={[saturation]}
              onValueChange={(value) => setSaturation(value[0])}
              className="[&_[role=slider]]:bg-gray-100"
            />
          </div>

          <div className="mt-6 p-4 bg-secondary rounded-lg space-y-4">
            <p className="text-center text-lg">
              Contrast Ratio:{" "}
              <span className="font-bold">{contrastRatio.toFixed(2)}</span>
            </p>
            <p className="text-center text-lg">
              WCAG Compliance:{" "}
              <span
                className={`font-bold ${
                  getComplianceStatus(contrastRatio).color
                }`}
              >
                {getComplianceStatus(contrastRatio).text}
              </span>
            </p>
          </div>

          <div
            className="p-4 rounded-lg border text-center space-y-2"
            style={{ color: textColor, backgroundColor }}
          >
            <p className="text-2xl font-bold">Preview Text</p>
            <p className="text-base">This is how your text will look.</p>
            <p className="text-sm">
              Small text example for testing readability.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorContrastOptimizer;
