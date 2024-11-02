"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>("0");
  const [interestRate, setInterestRate] = useState<string>("0");
  const [loanTerm, setLoanTerm] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyInterestRate === 0) {
      const payment = principal / numberOfPayments;
      setMonthlyPayment(payment);
      setTotalPayment(payment * numberOfPayments);
      setTotalInterest(0);
    } else {
      const payment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
      setMonthlyPayment(payment);
      setTotalPayment(payment * numberOfPayments);
      setTotalInterest(payment * numberOfPayments - principal);
    }
  };

  const handleClear = () => {
    setLoanAmount("0");
    setInterestRate("0");
    setLoanTerm(0);
    setMonthlyPayment(null);
    setTotalPayment(null);
    setTotalInterest(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Loan Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              step="0.01"
              min="0"
              placeholder="Enter loan amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              step="0.01"
              min="0"
              placeholder="Enter annual interest rate"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseFloat(e.target.value) || 0)}
              placeholder="Enter loan term in years"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateLoan} className="flex-1">
              Calculate
            </Button>
            <Button onClick={handleClear} variant="destructive">
              Clear
            </Button>
          </div>

          {monthlyPayment !== null && (
            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <div className="text-center space-y-2">
                <div className="text-lg">
                  Monthly Payment:{" "}
                  <span className="font-bold">
                    ${monthlyPayment.toFixed(2)}
                  </span>
                </div>
                <div className="text-lg">
                  Total Payment:{" "}
                  <span className="font-bold">${totalPayment!.toFixed(2)}</span>
                </div>
                <div className="text-lg">
                  Total Interest:{" "}
                  <span className="font-bold">
                    ${totalInterest!.toFixed(2)}
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

export default LoanCalculator;
