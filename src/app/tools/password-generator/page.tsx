import PasswordGenerator from "@/components/ui/password-generator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function PasswordGeneratorPage() {
  return (
    <ToolsLayout currentTool="/tools/password-generator">
      <PasswordGenerator />
    </ToolsLayout>
  );
}
