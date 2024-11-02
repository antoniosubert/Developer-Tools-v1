"use client";

import { ToolsMenu } from "@/components/ui/tools-menu";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-8 pt-20 pb-16">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Developer Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive collection of tools for developers, designers, and
              professionals. Built with modern web technologies for reliability
              and ease of use.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/antoniosubert/Developer-Tools-v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">
            Available Tools
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Explore our collection of developer tools, organized by category.
            Click on a category to expand and see available tools.
          </p>
        </div>
        <ToolsMenu
          expandedCategories={expandedCategories}
          onToggleCategory={toggleCategory}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-secondary/30">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <p className="text-center text-muted-foreground">
            Built with Next.js, TypeScript, and Tailwind CSS. Hosted on
            Firebase.
            <br />
            <span className="mt-2 inline-block">
              Created by{" "}
              <a
                href="https://github.com/antoniosubert"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Antonio Šubert
              </a>
            </span>
          </p>
        </div>
      </footer>
    </main>
  );
}
