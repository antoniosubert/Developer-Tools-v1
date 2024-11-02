import ColorContrastOptimizer from "@/components/tools/design/color-contrast";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function ColorContrastPage() {
  return (
    <ToolsLayout currentTool="/tools/color-contrast">
      <ColorContrastOptimizer />
    </ToolsLayout>
  );
}
