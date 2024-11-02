"use client";

import Link from "next/link";
import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface ToolsLayoutProps {
  children: React.ReactNode;
  currentTool: string;
}

export function ToolsLayout({ children, currentTool }: ToolsLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        {/* Mobile Return Button */}
        {isMobile && (
          <div className="p-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="flex items-center gap-2"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                Return Home
              </Link>
            </Button>
          </div>
        )}

        {/* Sidebar - Only visible on desktop */}
        {!isMobile && (
          <div className="w-64 border-r min-h-screen p-4">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-8 flex items-center gap-2"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                Return Home
              </Link>
            </Button>
            {/* Your existing sidebar content */}
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
