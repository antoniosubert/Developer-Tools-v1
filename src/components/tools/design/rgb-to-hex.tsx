"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RGBToHexConverter() {
  const [rgb, setRgb] = useState({ r: 128, g: 128, b: 128 });
  const [hex, setHex] = useState("#808080");

  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  useEffect(() => {
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  }, [rgb]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setHex(newHex);
    const newRgb = hexToRgb(newHex);
    if (newRgb) {
      setRgb(newRgb);
    }
  };

  const handleSliderChange = (color: "r" | "g" | "b", value: number[]) => {
    setRgb((prev) => ({ ...prev, [color]: value[0] }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          RGB to HEX Converter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {["r", "g", "b"].map((color) => (
            <div key={color} className="space-y-2">
              <Label htmlFor={color} className="text-sm font-medium">
                {color.toUpperCase()}: {rgb[color as keyof typeof rgb]}
              </Label>
              <Slider
                id={color}
                min={0}
                max={255}
                step={1}
                value={[rgb[color as keyof typeof rgb]]}
                onValueChange={(value) =>
                  handleSliderChange(color as "r" | "g" | "b", value)
                }
                className="[&_[role=slider]]:bg-gray-100"
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="hex" className="text-sm font-medium">
              HEX
            </Label>
            <Input
              id="hex"
              value={hex}
              onChange={handleHexChange}
              className="border-input"
            />
          </div>
          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Color Preview</div>
            <div
              className="w-full h-24 rounded-md border"
              style={{ backgroundColor: hex }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
