"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeekOfYear: React.FC = () => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24) +
      startOfYear.getDay() +
      1) /
      7
  );

  const yearProgress =
    ((today.getTime() - startOfYear.getTime()) /
      (new Date(today.getFullYear() + 1, 0, 1).getTime() -
        startOfYear.getTime())) *
    100;

  const startOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 1)
  );
  const startOfWeekFormatted = startOfWeek.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          What Week of {today.getFullYear()}?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">
              {weekNumber}
            </div>
            <p className="text-muted-foreground">Week of the Year</p>
          </div>

          <div className="space-y-2">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${yearProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {yearProgress.toFixed(1)}% through the year
            </p>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-center text-muted-foreground mb-2">
              First day of week {weekNumber}:
            </p>
            <p className="text-center text-lg font-semibold">
              {startOfWeekFormatted}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekOfYear;
