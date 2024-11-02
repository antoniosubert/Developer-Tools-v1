import RegexTester from "@/components/tools/dev/regex-tester";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function RegexTesterPage() {
  return (
    <ToolsLayout currentTool="/tools/regex-tester">
      <RegexTester />
    </ToolsLayout>
  );
}
