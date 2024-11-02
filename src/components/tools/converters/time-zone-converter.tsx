"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const TimeZoneConverter: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [fromTimeZone, setFromTimeZone] = useState<string>("UTC");
  const [toTimeZone, setToTimeZone] = useState<string>("America/New_York");
  const [convertedTime, setConvertedTime] = useState<string>("");

  const timeZones = [
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
    "America/Los_Angeles",
    "Europe/Paris",
    "Asia/Dubai",
    "America/Sao_Paulo",
    "Africa/Johannesburg",
    "Asia/Kolkata",
  ];

  const handleConvertTime = () => {
    if (!date) return;

    const formattedTime = new Intl.DateTimeFormat("en-US", {
      timeZone: toTimeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date.toDate());

    setConvertedTime(formattedTime);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Time Zone Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <DateTimePicker
                  label="Date & Time"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromTimeZone">From Time Zone</Label>
                <Select value={fromTimeZone} onValueChange={setFromTimeZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="toTimeZone">To Time Zone</Label>
                <Select value={toTimeZone} onValueChange={setToTimeZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleConvertTime} className="w-full">
                Convert Time
              </Button>

              {convertedTime && (
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-center">
                    <span className="font-bold">Converted Time:</span>
                    <br />
                    {convertedTime} ({toTimeZone})
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

export default TimeZoneConverter;
