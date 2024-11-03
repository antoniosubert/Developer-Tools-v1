"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PDFFile {
  file: File;
  name: string;
}

export default function PDFMerger() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        file,
        name: file.name,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error("Please upload at least two PDF files");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    files.forEach((pdfFile) => formData.append("pdfFiles", pdfFile.file));

    try {
      const response = await fetch("/api/merge-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to merge PDFs");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("PDFs merged successfully");
    } catch (error) {
      toast.error("Failed to merge PDFs");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          PDF Merger 📄
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileUpload}
            className="w-full p-2 border rounded bg-background"
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Selected Files:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-secondary rounded"
                >
                  <span className="truncate">{file.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveFile(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          onClick={handleMerge}
          disabled={files.length < 2 || isLoading}
          className="w-full"
        >
          {isLoading ? "Merging..." : "Merge PDFs"}
        </Button>
      </CardContent>
    </Card>
  );
}
