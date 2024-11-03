"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ScaleInfo {
  key: string;
  relativeMinor: string;
  notes: string[];
  sharpsOrFlats: string;
  chordProgression: string[];
  dominantKey: string;
  subdominantKey: string;
}

// Enhance the data structure with more musical information
const circleOfFifthsData: ScaleInfo[] = [
  {
    key: "C",
    relativeMinor: "Am",
    notes: ["C", "D", "E", "F", "G", "A", "B"],
    sharpsOrFlats: "0",
    chordProgression: ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
    dominantKey: "G",
    subdominantKey: "F",
  },
  {
    key: "G",
    relativeMinor: "Em",
    notes: ["G", "A", "B", "C", "D", "E", "F#"],
    sharpsOrFlats: "1#",
    chordProgression: ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
    dominantKey: "D",
    subdominantKey: "C",
  },
  {
    key: "D",
    relativeMinor: "Bm",
    notes: ["D", "E", "F#", "G", "A", "B", "C#"],
    sharpsOrFlats: "2#",
    chordProgression: ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
    dominantKey: "A",
    subdominantKey: "G",
  },
  {
    key: "A",
    relativeMinor: "F#m",
    notes: ["A", "B", "C#", "D", "E", "F#", "G#"],
    sharpsOrFlats: "3#",
    chordProgression: ["A", "Bm", "C#m", "D", "E", "F#m", "G#dim"],
    dominantKey: "E",
    subdominantKey: "D",
  },
  {
    key: "E",
    relativeMinor: "C#m",
    notes: ["E", "F#", "G#", "A", "B", "C#", "D#"],
    sharpsOrFlats: "4#",
    chordProgression: ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
    dominantKey: "B",
    subdominantKey: "A",
  },
  {
    key: "B",
    relativeMinor: "G#m",
    notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
    sharpsOrFlats: "5#",
    chordProgression: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#dim"],
    dominantKey: "F#",
    subdominantKey: "E",
  },
  {
    key: "F#",
    relativeMinor: "D#m",
    notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
    sharpsOrFlats: "6#",
    chordProgression: ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#dim"],
    dominantKey: "C#",
    subdominantKey: "B",
  },
  {
    key: "F",
    relativeMinor: "Dm",
    notes: ["F", "G", "A", "Bb", "C", "D", "E"],
    sharpsOrFlats: "1b",
    chordProgression: ["F", "Gm", "Am", "Bb", "C", "Dm", "Edim"],
    dominantKey: "C",
    subdominantKey: "Bb",
  },
  {
    key: "Bb",
    relativeMinor: "Gm",
    notes: ["Bb", "C", "D", "Eb", "F", "G", "A"],
    sharpsOrFlats: "2b",
    chordProgression: ["Bb", "Cm", "Dm", "Eb", "F", "Gm", "Adim"],
    dominantKey: "F",
    subdominantKey: "Eb",
  },
  {
    key: "Eb",
    relativeMinor: "Cm",
    notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
    sharpsOrFlats: "3b",
    chordProgression: ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Ddim"],
    dominantKey: "Bb",
    subdominantKey: "Ab",
  },
  {
    key: "Ab",
    relativeMinor: "Fm",
    notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
    sharpsOrFlats: "4b",
    chordProgression: ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "Gdim"],
    dominantKey: "Eb",
    subdominantKey: "Db",
  },
  {
    key: "Db",
    relativeMinor: "Bbm",
    notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
    sharpsOrFlats: "5b",
    chordProgression: ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "Cdim"],
    dominantKey: "Ab",
    subdominantKey: "Gb",
  },
  {
    key: "Gb",
    relativeMinor: "Ebm",
    notes: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
    sharpsOrFlats: "6b",
    chordProgression: ["Gb", "Abm", "Bbm", "Cb", "Db", "Ebm", "Fdim"],
    dominantKey: "Db",
    subdominantKey: "Cb",
  },
  {
    key: "Cb",
    relativeMinor: "Abm",
    notes: ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"],
    sharpsOrFlats: "7b",
    chordProgression: ["Cb", "Dbm", "Ebm", "Fb", "Gb", "Abm", "Bbdim"],
    dominantKey: "Gb",
    subdominantKey: "Fb",
  },
];

export default function CircleOfFifths() {
  const [selectedKey, setSelectedKey] = useState<ScaleInfo | null>(null);
  const [isMinorSelected, setIsMinorSelected] = useState(false);
  const [view, setView] = useState<"wheel" | "details" | "progressions">(
    "wheel"
  );
  const totalKeys = circleOfFifthsData.length;

  const handleMajorClick = (scale: ScaleInfo) => {
    setSelectedKey(scale);
    setIsMinorSelected(false);
  };

  const handleMinorClick = (scale: ScaleInfo) => {
    setSelectedKey(scale);
    setIsMinorSelected(true);
  };

  const renderWheel = () => (
    <div className="relative w-[400px] h-[400px] mx-auto">
      {/* Center circle with key signature info */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {selectedKey?.sharpsOrFlats || "0"}
        </div>
      </div>

      {/* Outer circle (Major keys) */}
      <div className="absolute inset-0">
        {circleOfFifthsData.map((scale, index) => {
          const angle = (index * 360) / totalKeys;
          return (
            <button
              key={scale.key}
              onClick={() => handleMajorClick(scale)}
              className={`absolute left-1/2 top-1/2 w-14 h-14 
                rounded-full flex items-center justify-center transform
                transition-colors duration-200
                ${
                  selectedKey?.key === scale.key && !isMinorSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-primary/90 hover:text-primary-foreground"
                }`}
              style={{
                transform: `
                  translate(-50%, -50%) 
                  rotate(${angle}deg) 
                  translateY(-160px) 
                  rotate(-${angle}deg)
                `,
              }}
            >
              {scale.key}
            </button>
          );
        })}
      </div>

      {/* Inner circle (Minor keys) */}
      <div className="absolute inset-0">
        {circleOfFifthsData.map((scale, index) => {
          const angle = (index * 360) / totalKeys;
          return (
            <button
              key={`${scale.key}-minor`}
              onClick={() => handleMinorClick(scale)}
              className={`absolute left-1/2 top-1/2 w-12 h-12 
                rounded-full flex items-center justify-center transform
                transition-colors duration-200
                ${
                  selectedKey?.key === scale.key && isMinorSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-primary/90 hover:text-primary-foreground"
                }`}
              style={{
                transform: `
                  translate(-50%, -50%) 
                  rotate(${angle}deg) 
                  translateY(-100px) 
                  rotate(-${angle}deg)
                `,
              }}
            >
              {scale.relativeMinor}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Circle of Fifths
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="wheel">Wheel</TabsTrigger>
            <TabsTrigger value="details">Scale Details</TabsTrigger>
            <TabsTrigger value="progressions">Chord Progressions</TabsTrigger>
          </TabsList>

          <TabsContent value="wheel" className="mt-4">
            {renderWheel()}
          </TabsContent>

          <TabsContent value="details" className="mt-4">
            {selectedKey && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  {isMinorSelected
                    ? `${selectedKey.relativeMinor} Minor / ${selectedKey.key} Major`
                    : `${selectedKey.key} Major / ${selectedKey.relativeMinor} Minor`}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium mb-2">
                      {isMinorSelected ? "Minor Scale" : "Major Scale"}
                    </h4>
                    <p>{selectedKey.notes.join(" - ")}</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium mb-2">Key Relationships</h4>
                    <p>Dominant: {selectedKey.dominantKey}</p>
                    <p>Subdominant: {selectedKey.subdominantKey}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="progressions" className="mt-4">
            {selectedKey && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Common Progressions in {selectedKey.key}
                </h3>
                <div className="grid gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium mb-2">I - IV - V</h4>
                    <p>{`${selectedKey.chordProgression[0]} - ${selectedKey.chordProgression[3]} - ${selectedKey.chordProgression[4]}`}</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium mb-2">ii - V - I</h4>
                    <p>{`${selectedKey.chordProgression[1]} - ${selectedKey.chordProgression[4]} - ${selectedKey.chordProgression[0]}`}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
