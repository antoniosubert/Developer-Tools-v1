import TimeUntilEventCalculator from "@/components/ui/time-until-event-calculator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TimeUntilEventPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline">← Back to Tools</Button>
          </Link>
        </div>
        <TimeUntilEventCalculator />
      </div>
    </main>
  );
}
