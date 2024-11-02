import WeekOfYear from "@/components/tools/calculators/what-week";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function WeekOfYearPage() {
  return (
    <ToolsLayout currentTool="/tools/what-week">
      <WeekOfYear />
    </ToolsLayout>
  );
}
