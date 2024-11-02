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

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = dayjs();
    const birth = birthDate.startOf("day");

    if (birth.isAfter(today)) {
      setAge(null);
      return;
    }

    let years = today.year() - birth.year();
    let months = today.month() - birth.month();
    let days = today.date() - birth.date();

    if (days < 0) {
      months -= 1;
      const daysInPreviousMonth = today.subtract(1, "month").daysInMonth();
      days += daysInPreviousMonth;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    setAge({ years, months, days });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Age Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <DatePicker
                  label="Date of Birth"
                  value={birthDate}
                  onChange={(newValue) => setBirthDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </div>

              <Button
                onClick={calculateAge}
                className="w-full"
                disabled={!birthDate}
              >
                Calculate Age
              </Button>

              {age && (
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-center text-lg">
                    Age: {age.years} year{age.years !== 1 ? "s" : ""},{" "}
                    {age.months} month{age.months !== 1 ? "s" : ""}, and{" "}
                    {age.days} day
                    {age.days !== 1 ? "s" : ""}.
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

export default AgeCalculator;
