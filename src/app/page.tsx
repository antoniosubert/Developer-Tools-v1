"use client";

import { ToolsMenu } from "@/components/ui/tools-menu";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Developer Tools
          </h1>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/antoniosubert"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </nav>

      {/* Tools Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">
            Available Tools
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Explore our collection of developer tools, organized by category.
            Start with our recommended tools or browse by category.
          </p>
        </div>
        <ToolsMenu expandedCategories={[]} onToggleCategory={() => {}} />
      </div>

      {/* Footer */}
      <footer className="border-t border-secondary/30 fixed bottom-0 w-full bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Built with Next.js, TypeScript, and Tailwind CSS. Hosted on
            Firebase.
            <span className="ml-2">
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
