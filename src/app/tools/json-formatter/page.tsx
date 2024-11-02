import JSONFormatter from "@/components/tools/formatters/json-formatter";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function JSONFormatterPage() {
  return (
    <ToolsLayout currentTool="/tools/json-formatter">
      <JSONFormatter />
    </ToolsLayout>
  );
}
