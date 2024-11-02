import DateDifferenceCalculator from "@/components/ui/date-difference-calculator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function DateDifferencePage() {
  return (
    <ToolsLayout currentTool="/tools/date-difference">
      <DateDifferenceCalculator />
    </ToolsLayout>
  );
}
