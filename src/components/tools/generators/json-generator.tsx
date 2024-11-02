"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JSONField {
  key: string;
  value: string | number | boolean | any[];
  type: "string" | "number" | "boolean" | "array" | "object";
}

const getValueType = (value: any): JSONField["type"] => {
  if (Array.isArray(value)) return "array";
  if (value === null) return "string";
  switch (typeof value) {
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      return "object";
    default:
      return "string";
  }
};

const NestedJSONEditor = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (value: any) => void;
}) => {
  const [nestedFields, setNestedFields] = useState<JSONField[]>(() => {
    let initialValue = value;
    if (typeof value === "string") {
      try {
        initialValue = JSON.parse(value);
      } catch {
        initialValue = {};
      }
    }

    const fields = Object.entries(initialValue).map(([key, val]) => ({
      key,
      value: typeof val === "object" ? JSON.stringify(val) : String(val),
      type: getValueType(val),
    }));
    return fields;
  });

  const handleNestedFieldChange = (
    index: number,
    key: string,
    value: any,
    type: JSONField["type"]
  ) => {
    const updatedFields = [...nestedFields];
    updatedFields[index] = { key, value, type };
    setNestedFields(updatedFields);

    const newObject = updatedFields.reduce((acc, field) => {
      acc[field.key] =
        field.type === "object"
          ? typeof field.value === "string"
            ? JSON.parse(field.value)
            : field.value
          : field.value;
      return acc;
    }, {} as Record<string, any>);

    onChange(newObject);
  };

  const addNestedField = () => {
    setNestedFields([...nestedFields, { key: "", value: "", type: "string" }]);
  };

  const removeNestedField = (index: number) => {
    const updatedFields = nestedFields.filter((_, i) => i !== index);
    setNestedFields(updatedFields);
  };

  return (
    <div className="space-y-4 pl-4 border-l-2 border-border">
      {nestedFields.map((field, index) => (
        <div key={index} className="space-y-2">
          <div className="flex gap-4 items-center">
            <Input
              type="text"
              placeholder="Key"
              value={field.key}
              onChange={(e) =>
                handleNestedFieldChange(
                  index,
                  e.target.value,
                  field.value,
                  field.type
                )
              }
              className="flex-1"
            />
            <Select
              value={field.type}
              onValueChange={(value) =>
                handleNestedFieldChange(
                  index,
                  field.key,
                  field.value,
                  value as JSONField["type"]
                )
              }
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="array">Array</SelectItem>
                <SelectItem value="object">Object</SelectItem>
              </SelectContent>
            </Select>
            {field.type === "object" ? (
              <div className="flex-1">
                <NestedJSONEditor
                  value={field.value}
                  onChange={(newValue) =>
                    handleNestedFieldChange(
                      index,
                      field.key,
                      newValue,
                      field.type
                    )
                  }
                />
              </div>
            ) : (
              <Input
                type="text"
                placeholder="Value"
                value={field.value as string}
                onChange={(e) =>
                  handleNestedFieldChange(
                    index,
                    field.key,
                    e.target.value,
                    field.type
                  )
                }
                className="flex-1"
              />
            )}
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeNestedField(index)}
            >
              ✕
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={addNestedField} className="w-full">
        Add Nested Field
      </Button>
    </div>
  );
};

const JSONGenerator: React.FC = () => {
  const [fields, setFields] = useState<JSONField[]>([]);
  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [rawJSON, setRawJSON] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (
    index: number,
    key: string,
    value: any,
    type: JSONField["type"]
  ) => {
    const updatedFields = [...fields];
    updatedFields[index] = { key, value, type };
    setFields(updatedFields);
    updateJsonOutput(updatedFields);
  };

  const updateJsonOutput = (updatedFields: JSONField[]) => {
    const jsonObject: any = {};
    updatedFields.forEach((field) => {
      switch (field.type) {
        case "string":
          jsonObject[field.key] = field.value as string;
          break;
        case "number":
          jsonObject[field.key] = Number(field.value);
          break;
        case "boolean":
          jsonObject[field.key] = field.value === "true";
          break;
        case "array":
          jsonObject[field.key] =
            typeof field.value === "string"
              ? field.value.split(",").map((v: string) => v.trim())
              : [];
          break;
        case "object":
          try {
            jsonObject[field.key] =
              typeof field.value === "string"
                ? JSON.parse(field.value)
                : field.value;
          } catch {
            jsonObject[field.key] = {};
          }
          break;
      }
    });
    const formatted = JSON.stringify(jsonObject, null, 2);
    setJsonOutput(formatted);
    setRawJSON(formatted);
  };

  const handleRawJSONChange = (value: string) => {
    setRawJSON(value);
    try {
      const parsed = JSON.parse(value);
      const newFields: JSONField[] = Object.entries(parsed).map(
        ([key, value]) => ({
          key,
          value:
            typeof value === "object" ? JSON.stringify(value) : String(value),
          type: getValueType(value),
        })
      );
      setFields(newFields);
      setError(null);
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const addField = () => {
    setFields([...fields, { key: "", value: "", type: "string" }]);
  };

  const removeField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
    updateJsonOutput(updatedFields);
  };

  const downloadJSONFile = () => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    alert("JSON copied to clipboard");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          JSON Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visual" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="visual">Visual Editor</TabsTrigger>
            <TabsTrigger value="raw">Raw JSON</TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-4">
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-4 items-center">
                    <Input
                      type="text"
                      placeholder="Key"
                      value={field.key}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          e.target.value,
                          field.value,
                          field.type
                        )
                      }
                      className="flex-1"
                    />
                    <Select
                      value={field.type}
                      onValueChange={(value) =>
                        handleFieldChange(
                          index,
                          field.key,
                          field.value,
                          value as JSONField["type"]
                        )
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="array">Array</SelectItem>
                        <SelectItem value="object">Object</SelectItem>
                      </SelectContent>
                    </Select>
                    {field.type !== "object" ? (
                      <Input
                        type="text"
                        placeholder="Value"
                        value={field.value as string}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            field.key,
                            e.target.value,
                            field.type
                          )
                        }
                        className="flex-1"
                      />
                    ) : (
                      <div className="flex-1">
                        <NestedJSONEditor
                          value={field.value}
                          onChange={(newValue) =>
                            handleFieldChange(
                              index,
                              field.key,
                              newValue,
                              field.type
                            )
                          }
                        />
                      </div>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeField(index)}
                    >
                      ✕
                    </Button>
                  </div>
                  {field.type === "object" && field.value && (
                    <div className="pl-6 border-l-2 border-border mt-2">
                      <div className="text-sm text-muted-foreground mb-2">
                        Parsed Object Preview:
                      </div>
                      <pre className="bg-secondary p-2 rounded-md text-sm overflow-x-auto">
                        {JSON.stringify(
                          typeof field.value === "string"
                            ? JSON.parse(field.value)
                            : field.value,
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
              <Button onClick={addField} className="w-full">
                Add Field
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="raw">
            <div className="space-y-4">
              <Textarea
                value={rawJSON}
                onChange={(e) => handleRawJSONChange(e.target.value)}
                className="min-h-[300px] font-mono"
                placeholder="Enter JSON here..."
              />
              {error && <div className="text-destructive text-sm">{error}</div>}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={downloadJSONFile}
            variant="outline"
            className="flex-1"
          >
            Download JSON
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="flex-1"
          >
            Copy to Clipboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JSONGenerator;
