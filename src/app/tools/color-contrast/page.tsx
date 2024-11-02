import ColorContrastOptimizer from "@/components/tools/design/color-contrast";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ColorContrastPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline">← Back to Tools</Button>
          </Link>
        </div>
        <ColorContrastOptimizer />
      </div>
    </main>
  );
}
