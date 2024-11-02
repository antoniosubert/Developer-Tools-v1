import TimeUntilEventCalculator from "@/components/ui/time-until-event-calculator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function TimeUntilEventPage() {
  return (
    <ToolsLayout currentTool="/tools/time-until-event">
      <TimeUntilEventCalculator />
    </ToolsLayout>
  );
}
