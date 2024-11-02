"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const units = {
  tsp: { value: 1, label: "Teaspoon" },
  tbsp: { value: 3, label: "Tablespoon" },
  cup: { value: 48, label: "Cup" },
  ml: { value: 0.202884, label: "Milliliter" },
  l: { value: 202.884, label: "Liter" },
  oz: { value: 6, label: "Fluid Ounce" },
};

const CookingMeasurementConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>("tsp");
  const [toUnit, setToUnit] = useState<string>("ml");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };

  useEffect(() => {
    const amountInTsp = amount * units[fromUnit as keyof typeof units].value;
    const result = amountInTsp / units[toUnit as keyof typeof units].value;
    setConvertedAmount(result);
  }, [amount, fromUnit, toUnit]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Cooking Measurement Converter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={handleAmountChange}
              className="border-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fromUnit" className="text-sm font-medium">
              From
            </Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue>
                  {units[fromUnit as keyof typeof units].label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toUnit" className="text-sm font-medium">
              To
            </Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue>
                  {units[toUnit as keyof typeof units].label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-center text-lg">
              {amount} {units[fromUnit as keyof typeof units].label} ={" "}
              <span className="font-bold">
                {convertedAmount.toFixed(2)}{" "}
                {units[toUnit as keyof typeof units].label}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CookingMeasurementConverter;
