"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Chord {
  name: string;
  guitarShape: string;
  pianoKeys: string;
}

const chords: Record<string, Chord[]> = {
  C: [
    { name: "Major", guitarShape: "x32010", pianoKeys: "C E G" },
    { name: "Minor", guitarShape: "x35543", pianoKeys: "C E♭ G" },
    { name: "7th", guitarShape: "x32310", pianoKeys: "C E G B♭" },
  ],
  "C#": [
    { name: "Major", guitarShape: "x43121", pianoKeys: "C# F G#" },
    { name: "Minor", guitarShape: "x46564", pianoKeys: "C# E G#" },
    { name: "7th", guitarShape: "x43424", pianoKeys: "C# F G# B" },
  ],
  D: [
    { name: "Major", guitarShape: "xx0232", pianoKeys: "D F# A" },
    { name: "Minor", guitarShape: "xx0231", pianoKeys: "D F A" },
    { name: "7th", guitarShape: "xx0212", pianoKeys: "D F# A C" },
  ],
  "D#": [
    { name: "Major", guitarShape: "xx1343", pianoKeys: "D# G A#" },
    { name: "Minor", guitarShape: "xx1342", pianoKeys: "D# F# A#" },
    { name: "7th", guitarShape: "xx1323", pianoKeys: "D# G A# C#" },
  ],
  E: [
    { name: "Major", guitarShape: "022100", pianoKeys: "E G# B" },
    { name: "Minor", guitarShape: "022000", pianoKeys: "E G B" },
    { name: "7th", guitarShape: "020100", pianoKeys: "E G# B D" },
  ],
  F: [
    { name: "Major", guitarShape: "133211", pianoKeys: "F A C" },
    { name: "Minor", guitarShape: "133111", pianoKeys: "F A♭ C" },
    { name: "7th", guitarShape: "131211", pianoKeys: "F A C E♭" },
  ],
  "F#": [
    { name: "Major", guitarShape: "244322", pianoKeys: "F# A# C#" },
    { name: "Minor", guitarShape: "244222", pianoKeys: "F# A C#" },
    { name: "7th", guitarShape: "242322", pianoKeys: "F# A# C# E" },
  ],
  G: [
    { name: "Major", guitarShape: "320003", pianoKeys: "G B D" },
    { name: "Minor", guitarShape: "355333", pianoKeys: "G B♭ D" },
    { name: "7th", guitarShape: "320001", pianoKeys: "G B D F" },
  ],
  "G#": [
    { name: "Major", guitarShape: "466544", pianoKeys: "G# C D#" },
    { name: "Minor", guitarShape: "466444", pianoKeys: "G# B D#" },
    { name: "7th", guitarShape: "464544", pianoKeys: "G# C D# F#" },
  ],
  A: [
    { name: "Major", guitarShape: "x02220", pianoKeys: "A C# E" },
    { name: "Minor", guitarShape: "x02210", pianoKeys: "A C E" },
    { name: "7th", guitarShape: "x02020", pianoKeys: "A C# E G" },
  ],
  "A#": [
    { name: "Major", guitarShape: "x13331", pianoKeys: "A# D F" },
    { name: "Minor", guitarShape: "x13321", pianoKeys: "A# C# F" },
    { name: "7th", guitarShape: "x13131", pianoKeys: "A# D F G#" },
  ],
  B: [
    { name: "Major", guitarShape: "x24442", pianoKeys: "B D# F#" },
    { name: "Minor", guitarShape: "x24432", pianoKeys: "B D F#" },
    { name: "7th", guitarShape: "x21202", pianoKeys: "B D# F# A" },
  ],
};

export default function ChordFinder() {
  const [note, setNote] = useState("C");
  const [chordType, setChordType] = useState<Chord | null>(chords["C"][0]);

  const handleChordTypeChange = (value: string) => {
    const selectedChord = chords[note].find((chord) => chord.name === value);
    setChordType(selectedChord || null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Chord Finder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Note</Label>
            <Select
              value={note}
              onValueChange={(value) => {
                setNote(value);
                setChordType(chords[value][0]);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select note" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(chords).map((noteOption) => (
                  <SelectItem key={noteOption} value={noteOption}>
                    {noteOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Chord Type</Label>
            <Select
              value={chordType?.name || ""}
              onValueChange={handleChordTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select chord type" />
              </SelectTrigger>
              <SelectContent>
                {chords[note].map((chord) => (
                  <SelectItem key={chord.name} value={chord.name}>
                    {chord.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {chordType && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              {note} {chordType.name}
            </h2>
            <div className="space-y-2">
              <Label>Guitar Shape</Label>
              <div className="p-3 bg-secondary rounded-lg text-center font-mono">
                {chordType.guitarShape}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Piano Keys</Label>
              <div className="p-3 bg-secondary rounded-lg text-center">
                {chordType.pianoKeys}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
