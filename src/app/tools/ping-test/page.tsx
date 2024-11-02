import PingTestURL from "@/components/ui/ping-test-url";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function PingTestPage() {
  return (
    <ToolsLayout currentTool="/tools/ping-test">
      <PingTestURL />
    </ToolsLayout>
  );
}
