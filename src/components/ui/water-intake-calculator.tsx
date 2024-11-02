"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const WaterIntakeCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [activityLevel, setActivityLevel] = useState<number>(1);
  const [hotWeather, setHotWeather] = useState<boolean>(false);
  const [waterIntake, setWaterIntake] = useState<number>(0);

  const getActivityLevelLabel = (level: number): string => {
    switch (level) {
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      default:
        return "Low";
    }
  };

  useEffect(() => {
    calculateWaterIntake();
  }, [weight, activityLevel, hotWeather]);

  const calculateWaterIntake = () => {
    let intake = weight * 0.03;

    switch (activityLevel) {
      case 2: // Medium
        intake *= 1.2;
        break;
      case 3: // High
        intake *= 1.4;
        break;
    }

    if (hotWeather) {
      intake *= 1.2;
    }

    setWaterIntake(intake);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Water Intake Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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

          <div className="space-y-2">
            <Label htmlFor="activity" className="text-sm font-medium">
              Activity Level: {getActivityLevelLabel(activityLevel)}
            </Label>
            <Slider
              id="activity"
              min={1}
              max={3}
              step={1}
              value={[activityLevel]}
              onValueChange={(value) => setActivityLevel(value[0])}
              className="[&_[role=slider]]:bg-gray-100"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="weather"
              checked={hotWeather}
              onChange={(e) => setHotWeather(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="weather">Hot weather/extreme conditions</Label>
          </div>

          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-center text-lg">
              Recommended Water Intake:{" "}
              <span className="font-bold">{waterIntake.toFixed(2)}</span> liters
              per day
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterIntakeCalculator;
