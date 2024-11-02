"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const TimeUntilEventCalculator: React.FC = () => {
  const [eventDate, setEventDate] = useState<Dayjs | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!eventDate) return;

    const interval = setInterval(() => {
      calculateTimeUntilEvent();
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  const calculateTimeUntilEvent = () => {
    if (!eventDate) return;

    const now = dayjs();
    const event = eventDate;

    if (event.isBefore(now)) {
      setTimeLeft(null);
      return;
    }

    let years = event.year() - now.year();
    let months = event.month() - now.month();
    let days = event.date() - now.date();
    let hours = event.hour() - now.hour();
    let minutes = event.minute() - now.minute();
    let seconds = event.second() - now.second();

    if (seconds < 0) {
      seconds += 60;
      minutes -= 1;
    }
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    if (hours < 0) {
      hours += 24;
      days -= 1;
    }
    if (days < 0) {
      const daysInPreviousMonth = event.subtract(1, "month").daysInMonth();
      days += daysInPreviousMonth;
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    setTimeLeft({ years, months, days, hours, minutes, seconds });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Time Until Event Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <DateTimePicker
                  label="Event Date & Time"
                  value={eventDate}
                  onChange={(newValue) => setEventDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </div>

              {timeLeft && (
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-center text-lg">
                    Time Until Event: {timeLeft.years} year
                    {timeLeft.years !== 1 ? "s" : ""}, {timeLeft.months} month
                    {timeLeft.months !== 1 ? "s" : ""}, {timeLeft.days} day
                    {timeLeft.days !== 1 ? "s" : ""}, {timeLeft.hours} hour
                    {timeLeft.hours !== 1 ? "s" : ""}, {timeLeft.minutes} minute
                    {timeLeft.minutes !== 1 ? "s" : ""}, {timeLeft.seconds}{" "}
                    second
                    {timeLeft.seconds !== 1 ? "s" : ""}.
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

export default TimeUntilEventCalculator;
