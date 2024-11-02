import UnitConverter from "@/components/tools/converters/unit-converter";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function UnitConverterPage() {
  return (
    <ToolsLayout currentTool="/tools/unit-converter">
      <UnitConverter />
    </ToolsLayout>
  );
}
