import WaterIntakeCalculator from "@/components/ui/water-intake-calculator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function WaterIntakeCalculatorPage() {
  return (
    <ToolsLayout currentTool="/tools/water-intake">
      <WaterIntakeCalculator />
    </ToolsLayout>
  );
}
