import JSONGenerator from "@/components/tools/generators/json-generator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function JSONGeneratorPage() {
  return (
    <ToolsLayout currentTool="/tools/json-generator">
      <JSONGenerator />
    </ToolsLayout>
  );
}
