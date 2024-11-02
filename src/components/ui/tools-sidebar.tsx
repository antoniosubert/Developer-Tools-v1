"use client";

import Link from "next/link";
import { tools } from "@/components/ui/tools-menu";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./button";

export function ToolsSidebar({ currentTool }: { currentTool: string }) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Find the category of the current tool and expand it on mount or when currentTool changes
  useEffect(() => {
    const currentToolData = tools.find((tool) => tool.path === currentTool);
    if (currentToolData) {
      setExpandedCategories((prev) =>
        prev.includes(currentToolData.category)
          ? prev
          : [...prev, currentToolData.category]
      );
    }
  }, [currentTool]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  return (
    <div className="w-64 h-screen border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed left-0 top-0 overflow-y-auto pb-8">
      <div className="p-4 border-b">
        <Link href="/">
          <Button variant="outline" className="w-full">
            ← Back to Home
          </Button>
        </Link>
      </div>
      <div className="p-4 space-y-4">
        {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between w-full p-2 text-sm font-medium hover:bg-accent rounded-md"
            >
              <span>{category}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedCategories.includes(category) ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedCategories.includes(category) && (
              <div className="ml-2 space-y-1 mt-1">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    className={`block p-2 text-sm rounded-md ${
                      tool.path === currentTool
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                  >
                    {tool.icon} {tool.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
