"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UnitType = "Length" | "Weight" | "Volume";
type Unit =
  | "meters"
  | "kilometers"
  | "centimeters"
  | "millimeters"
  | "inches"
  | "feet"
  | "yards"
  | "miles"
  | "grams"
  | "kilograms"
  | "milligrams"
  | "ounces"
  | "pounds"
  | "tons"
  | "liters"
  | "milliliters"
  | "gallons"
  | "quarts"
  | "pints"
  | "cups"
  | "fluid_ounces";

const conversionRates: Partial<Record<Unit, Partial<Record<Unit, number>>>> = {
  meters: {
    meters: 1,
    kilometers: 0.001,
    centimeters: 100,
    millimeters: 1000,
    inches: 39.3701,
    feet: 3.28084,
    yards: 1.09361,
    miles: 0.000621371,
  },
  kilometers: {
    kilometers: 1,
    meters: 1000,
    centimeters: 100000,
    millimeters: 1000000,
    inches: 39370.1,
    feet: 3280.84,
    yards: 1093.61,
    miles: 0.621371,
  },
  centimeters: {
    centimeters: 1,
    meters: 0.01,
    kilometers: 0.00001,
    millimeters: 10,
    inches: 0.393701,
    feet: 0.0328084,
    yards: 0.0109361,
    miles: 0.00000621371,
  },
  millimeters: {
    millimeters: 1,
    meters: 0.001,
    kilometers: 0.000001,
    centimeters: 0.1,
    inches: 0.0393701,
    feet: 0.00328084,
    yards: 0.00109361,
    miles: 0.000000621371,
  },
  inches: {
    inches: 1,
    meters: 0.0254,
    kilometers: 0.0000254,
    centimeters: 2.54,
    millimeters: 25.4,
    feet: 0.0833333,
    yards: 0.0277778,
    miles: 0.0000157828,
  },
  feet: {
    feet: 1,
    meters: 0.3048,
    kilometers: 0.0003048,
    centimeters: 30.48,
    millimeters: 304.8,
    inches: 12,
    yards: 0.333333,
    miles: 0.000189394,
  },
  yards: {
    yards: 1,
    meters: 0.9144,
    kilometers: 0.0009144,
    centimeters: 91.44,
    millimeters: 914.4,
    inches: 36,
    feet: 3,
    miles: 0.000568182,
  },
  miles: {
    miles: 1,
    meters: 1609.34,
    kilometers: 1.60934,
    centimeters: 160934,
    millimeters: 1609340,
    inches: 63360,
    feet: 5280,
    yards: 1760,
  },
  grams: {
    grams: 1,
    kilograms: 0.001,
    milligrams: 1000,
    ounces: 0.035274,
    pounds: 0.00220462,
    tons: 0.00000110231,
  },
  kilograms: {
    kilograms: 1,
    grams: 1000,
    milligrams: 1000000,
    ounces: 35.274,
    pounds: 2.20462,
    tons: 0.00110231,
  },
  milligrams: {
    milligrams: 1,
    grams: 0.001,
    kilograms: 0.000001,
    ounces: 0.000035274,
    pounds: 0.00000220462,
    tons: 0.00000000110231,
  },
  ounces: {
    ounces: 1,
    grams: 28.3495,
    kilograms: 0.0283495,
    milligrams: 28349.5,
    pounds: 0.0625,
    tons: 0.00003125,
  },
  pounds: {
    pounds: 1,
    grams: 453.592,
    kilograms: 0.453592,
    milligrams: 453592,
    ounces: 16,
    tons: 0.0005,
  },
  tons: {
    tons: 1,
    grams: 907185,
    kilograms: 907.185,
    milligrams: 907185000,
    ounces: 32000,
    pounds: 2000,
  },
  liters: {
    liters: 1,
    milliliters: 1000,
    gallons: 0.264172,
    quarts: 1.05669,
    pints: 2.11338,
    cups: 4.22675,
    fluid_ounces: 33.814,
  },
  milliliters: {
    milliliters: 1,
    liters: 0.001,
    gallons: 0.000264172,
    quarts: 0.00105669,
    pints: 0.00211338,
    cups: 0.00422675,
    fluid_ounces: 0.033814,
  },
  gallons: {
    gallons: 1,
    liters: 3.78541,
    milliliters: 3785.41,
    quarts: 4,
    pints: 8,
    cups: 16,
    fluid_ounces: 128,
  },
  quarts: {
    quarts: 1,
    liters: 0.946353,
    milliliters: 946.353,
    gallons: 0.25,
    pints: 2,
    cups: 4,
    fluid_ounces: 32,
  },
  pints: {
    pints: 1,
    liters: 0.473176,
    milliliters: 473.176,
    gallons: 0.125,
    quarts: 0.5,
    cups: 2,
    fluid_ounces: 16,
  },
  cups: {
    cups: 1,
    liters: 0.236588,
    milliliters: 236.588,
    gallons: 0.0625,
    quarts: 0.25,
    pints: 0.5,
    fluid_ounces: 8,
  },
  fluid_ounces: {
    fluid_ounces: 1,
    liters: 0.0295735,
    milliliters: 29.5735,
    gallons: 0.0078125,
    quarts: 0.03125,
    pints: 0.0625,
    cups: 0.125,
  },
};

const unitOptions: Record<UnitType, Unit[]> = {
  Length: [
    "meters",
    "kilometers",
    "centimeters",
    "millimeters",
    "inches",
    "feet",
    "yards",
    "miles",
  ],
  Weight: ["grams", "kilograms", "milligrams", "ounces", "pounds", "tons"],
  Volume: [
    "liters",
    "milliliters",
    "gallons",
    "quarts",
    "pints",
    "cups",
    "fluid_ounces",
  ],
};

const UnitConverter: React.FC = () => {
  const [unitType, setUnitType] = useState<UnitType>("Length");
  const [fromUnit, setFromUnit] = useState<Unit>("meters");
  const [toUnit, setToUnit] = useState<Unit>("kilometers");
  const [inputValue, setInputValue] = useState<string>("0");
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const handleConversion = () => {
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) return;

    const rate = conversionRates[fromUnit]?.[toUnit];
    if (rate === undefined) return;

    const result = numericValue * rate;
    setConvertedValue(result);
  };

  const handleUnitTypeChange = (newType: UnitType) => {
    setUnitType(newType);
    setFromUnit(unitOptions[newType][0]);
    setToUnit(unitOptions[newType][1]);
    setConvertedValue(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Unit Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="unitType">Unit Type</Label>
          <Select value={unitType} onValueChange={handleUnitTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Length">Length</SelectItem>
              <SelectItem value="Weight">Weight</SelectItem>
              <SelectItem value="Volume">Volume</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromUnit">From</Label>
          <Select
            value={fromUnit}
            onValueChange={(value) => setFromUnit(value as Unit)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {unitOptions[unitType].map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="toUnit">To</Label>
          <Select
            value={toUnit}
            onValueChange={(value) => setToUnit(value as Unit)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {unitOptions[unitType].map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-input"
          />
        </div>

        <Button onClick={handleConversion} className="w-full">
          Convert
        </Button>

        {convertedValue !== null && (
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-center text-lg">
              {inputValue} {fromUnit} = {convertedValue.toFixed(4)} {toUnit}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
