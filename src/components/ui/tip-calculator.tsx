"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>("0");
  const [tipPercentage, setTipPercentage] = useState<string>("15");
  const [numPeople, setNumPeople] = useState<number>(1);
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [totalPerPerson, setTotalPerPerson] = useState<number | null>(null);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = (bill * parseFloat(tipPercentage)) / 100;
    const total = bill + tip;
    const perPerson = numPeople > 0 ? total / numPeople : total;

    setTipAmount(tip);
    setTotalPerPerson(perPerson);
  };

  const handleClear = () => {
    setBillAmount("0");
    setTipPercentage("15");
    setNumPeople(1);
    setTipAmount(null);
    setTotalPerPerson(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Tip Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="billAmount">Bill Amount</Label>
            <Input
              id="billAmount"
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              step="0.01"
              min="0"
              placeholder="Enter bill amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipPercentage">Tip Percentage (%)</Label>
            <Input
              id="tipPercentage"
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              step="0.1"
              min="0"
              placeholder="Enter tip percentage"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numPeople">Number of People</Label>
            <Input
              id="numPeople"
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(parseInt(e.target.value) || 1)}
              min="1"
              placeholder="Enter number of people"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateTip} className="flex-1">
              Calculate Tip
            </Button>
            <Button onClick={handleClear} variant="destructive">
              Clear
            </Button>
          </div>

          {tipAmount !== null && totalPerPerson !== null && (
            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <div className="text-center space-y-2">
                <div className="text-lg">
                  Tip Amount:{" "}
                  <span className="font-bold">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="text-lg">
                  Total Per Person:{" "}
                  <span className="font-bold">
                    ${totalPerPerson.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TipCalculator;
