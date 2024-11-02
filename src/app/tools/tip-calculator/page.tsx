import TipCalculator from "@/components/tools/calculators/tip-calculator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function TipCalculatorPage() {
  return (
    <ToolsLayout currentTool="/tools/tip-calculator">
      <TipCalculator />
    </ToolsLayout>
  );
}
