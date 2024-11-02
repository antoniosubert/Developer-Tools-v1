"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [difference, setDifference] = useState<{
    months: number;
    days: number;
  } | null>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = startDate.startOf("day");
    const end = endDate.startOf("day");

    let months =
      (end.year() - start.year()) * 12 + (end.month() - start.month());
    let days = end.date() - start.date();

    if (days < 0) {
      months -= 1;
      const daysInPreviousMonth = end.subtract(1, "month").daysInMonth();
      days += daysInPreviousMonth;
    }

    setDifference({ months, days });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Date Difference Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </div>

              <div className="space-y-2">
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </div>

              <Button
                onClick={calculateDifference}
                className="w-full"
                disabled={!startDate || !endDate}
              >
                Calculate Difference
              </Button>

              {difference !== null && (
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-center text-lg">
                    Difference: {difference.months} month
                    {difference.months !== 1 ? "s" : ""} and {difference.days}{" "}
                    day
                    {difference.days !== 1 ? "s" : ""}.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default DateDifferenceCalculator;
