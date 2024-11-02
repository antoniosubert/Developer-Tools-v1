import JSONGenerator from "@/components/tools/generators/json-generator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function JSONGeneratorPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline">← Back to Tools</Button>
          </Link>
        </div>
        <JSONGenerator />
      </div>
    </main>
  );
}
