"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function Metronome() {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio on component mount
    const audio = new Audio("/sounds/hat.wav");
    audio.preload = "auto";

    // Log the audio source for debugging
    console.log("Audio source:", audio.src);

    audio.addEventListener("canplaythrough", () => {
      console.log("Audio loaded successfully");
      audioRef.current = audio;
    });

    audio.addEventListener("error", (e) => {
      console.error("Audio loading error:", e);
      console.error("Audio error code:", audio.error?.code);
      console.error("Audio error message:", audio.error?.message);
      toast.error("Failed to load metronome sound");
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("canplaythrough", () => {});
        audioRef.current.removeEventListener("error", () => {});
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      toast.error("Audio not loaded yet");
      return;
    }
    if (audioRef.current.readyState !== 4) {
      toast.error("Audio not ready yet");
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  const handleBpmChange = (value: number[]) => {
    setBpm(value[0]);
  };

  const playBeat = () => {
    setBeat(true);
    setTimeout(() => setBeat(false), 100);

    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.error("Playback error:", error);
          toast.error("Failed to play metronome sound");
          setIsPlaying(false);
        });
      }
    } catch (error) {
      console.error("Playback error:", error);
      toast.error("Failed to play metronome sound");
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(playBeat, (60 / bpm) * 1000);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isPlaying, bpm]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Metronome
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bpm">BPM (Beats Per Minute): {bpm}</Label>
          <Slider
            id="bpm"
            min={30}
            max={300}
            step={1}
            value={[bpm]}
            onValueChange={(value) => setBpm(value[0])}
            className="[&_[role=slider]]:bg-gray-100"
          />
        </div>

        <div
          className={`w-20 h-20 mx-auto rounded-full transition-colors ${
            beat ? "bg-accent" : "bg-muted"
          }`}
        ></div>

        <Button onClick={togglePlay} className="w-full">
          {isPlaying ? "Stop" : "Start"}
        </Button>
      </CardContent>
    </Card>
  );
}
