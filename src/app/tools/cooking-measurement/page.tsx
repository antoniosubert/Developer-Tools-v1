import CookingMeasurementConverter from "@/components/tools/converters/cooking-converter";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function CookingMeasurementPage() {
  return (
    <ToolsLayout currentTool="/tools/cooking-measurement">
      <CookingMeasurementConverter />
    </ToolsLayout>
  );
}
