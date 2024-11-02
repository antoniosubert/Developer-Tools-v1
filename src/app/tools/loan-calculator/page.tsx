import LoanCalculator from "@/components/tools/calculators/loan-calculator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function LoanCalculatorPage() {
  return (
    <ToolsLayout currentTool="/tools/loan-calculator">
      <LoanCalculator />
    </ToolsLayout>
  );
}
