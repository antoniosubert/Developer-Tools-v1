import TextCaseConverter from "@/components/tools/converters/text-case-converter";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function TextCasePage() {
  return (
    <ToolsLayout currentTool="/tools/text-case">
      <TextCaseConverter />
    </ToolsLayout>
  );
}
