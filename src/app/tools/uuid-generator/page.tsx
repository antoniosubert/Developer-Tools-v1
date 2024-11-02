import UUIDGenerator from "@/components/tools/generators/uuid-generator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function UUIDGeneratorPage() {
  return (
    <ToolsLayout currentTool="/tools/uuid-generator">
      <UUIDGenerator />
    </ToolsLayout>
  );
}
