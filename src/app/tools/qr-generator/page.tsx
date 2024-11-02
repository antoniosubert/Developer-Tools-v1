import QRCodeGenerator from "@/components/tools/generators/qr-generator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function QRGeneratorPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline">← Back to Tools</Button>
          </Link>
        </div>
        <QRCodeGenerator />
      </div>
    </main>
  );
}
