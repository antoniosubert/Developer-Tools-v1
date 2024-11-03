import DataGenerator from "@/components/tools/generators/data-generator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function DataGeneratorPage() {
  return (
    <ToolsLayout currentTool="/tools/data-generator">
      <DataGenerator />
    </ToolsLayout>
  );
}
