import TimeZoneConverter from "@/components/tools/converters/time-zone-converter";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function TimeZoneConverterPage() {
  return (
    <ToolsLayout currentTool="/tools/time-zone-converter">
      <TimeZoneConverter />
    </ToolsLayout>
  );
}
