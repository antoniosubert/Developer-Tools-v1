"use client";

import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface DataField {
  id: string;
  label: string;
  generator: () => string;
  enabled: boolean;
}

const availableFields: DataField[] = [
  {
    id: "fullName",
    label: "Full Name",
    generator: () => faker.person.fullName(),
    enabled: true,
  },
  {
    id: "email",
    label: "Email",
    generator: () => faker.internet.email(),
    enabled: true,
  },
  {
    id: "phone",
    label: "Phone Number",
    generator: () => faker.phone.number(),
    enabled: false,
  },
  {
    id: "address",
    label: "Address",
    generator: () => faker.location.streetAddress(),
    enabled: false,
  },
  {
    id: "company",
    label: "Company",
    generator: () => faker.company.name(),
    enabled: false,
  },
  {
    id: "jobTitle",
    label: "Job Title",
    generator: () => faker.person.jobTitle(),
    enabled: false,
  },
  {
    id: "website",
    label: "Website",
    generator: () => faker.internet.url(),
    enabled: false,
  },
  {
    id: "username",
    label: "Username",
    generator: () => faker.internet.userName(),
    enabled: false,
  },
];

const DataGenerator: React.FC = () => {
  const [fields, setFields] = useState<DataField[]>(availableFields);
  const [quantity, setQuantity] = useState<number>(10);
  const [generatedData, setGeneratedData] = useState<Record<string, string>[]>(
    []
  );

  const generateData = () => {
    const enabledFields = fields.filter((field) => field.enabled);
    if (enabledFields.length === 0) {
      toast.error("Please select at least one field");
      return;
    }

    const data = Array.from({ length: quantity }, () => {
      const record: Record<string, string> = {};
      enabledFields.forEach((field) => {
        record[field.id] = field.generator();
      });
      return record;
    });

    setGeneratedData(data);
    toast.success(`Generated ${quantity} records`);
  };

  const handleExportJSON = () => {
    if (generatedData.length === 0) {
      toast.error("No data to export");
      return;
    }
    const blob = new Blob([JSON.stringify(generatedData, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "generated-data.json");
    toast.success("Data exported as JSON");
  };

  const handleExportCSV = () => {
    if (generatedData.length === 0) {
      toast.error("No data to export");
      return;
    }
    const csv = Papa.unparse(generatedData);
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, "generated-data.csv");
    toast.success("Data exported as CSV");
  };

  const toggleField = (fieldId: string) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId ? { ...field, enabled: !field.enabled } : field
      )
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Data Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Fields</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {fields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={field.enabled}
                    onCheckedChange={() => toggleField(field.id)}
                  />
                  <Label htmlFor={field.id}>{field.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Number of Records</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max="1000"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="max-w-[200px]"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={generateData} className="flex-1">
              Generate Data
            </Button>
            <Button
              onClick={handleExportJSON}
              variant="outline"
              disabled={generatedData.length === 0}
            >
              Export JSON
            </Button>
            <Button
              onClick={handleExportCSV}
              variant="outline"
              disabled={generatedData.length === 0}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {generatedData.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Preview</h2>
            <div className="bg-secondary rounded-lg p-4 overflow-auto max-h-[400px]">
              <pre className="text-sm font-mono">
                {JSON.stringify(generatedData.slice(0, 5), null, 2)}
              </pre>
              {generatedData.length > 5 && (
                <p className="text-sm text-muted-foreground mt-2">
                  ... and {generatedData.length - 5} more records
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataGenerator;
