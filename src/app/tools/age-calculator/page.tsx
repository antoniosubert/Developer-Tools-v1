import AgeCalculator from "@/components/tools/calculators/age-calculator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function AgeCalculatorPage() {
  return (
    <ToolsLayout currentTool="/tools/age-calculator">
      <AgeCalculator />
    </ToolsLayout>
  );
}
