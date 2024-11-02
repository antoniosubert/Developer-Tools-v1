"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 24.9)
      return { category: "Normal weight", color: "text-green-500" };
    if (bmi < 29.9) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obesity", color: "text-red-500" };
  };

  useEffect(() => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue);
    const { category } = getBMICategory(bmiValue);
    setCategory(category);
  }, [height, weight]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          BMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="height" className="text-sm font-medium">
              Height: {height} cm
            </Label>
            <Slider
              id="height"
              min={140}
              max={220}
              step={1}
              value={[height]}
              onValueChange={(value) => setHeight(value[0])}
              className="[&_[role=slider]]:bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium">
              Weight: {weight} kg
            </Label>
            <Slider
              id="weight"
              min={40}
              max={160}
              step={1}
              value={[weight]}
              onValueChange={(value) => setWeight(value[0])}
              className="[&_[role=slider]]:bg-gray-100"
            />
          </div>

          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-center text-lg">
              Your BMI: <span className="font-bold">{bmi.toFixed(1)}</span>
              <br />
              Category:{" "}
              <span className={`font-bold ${getBMICategory(bmi).color}`}>
                {category}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMICalculator;
