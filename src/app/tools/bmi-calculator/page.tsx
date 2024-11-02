import BMICalculator from "@/components/tools/calculators/bmi-calculator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function BMICalculatorPage() {
  return (
    <ToolsLayout currentTool="/tools/bmi-calculator">
      <BMICalculator />
    </ToolsLayout>
  );
}
