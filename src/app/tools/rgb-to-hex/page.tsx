import RGBToHexConverter from "@/components/tools/design/rgb-to-hex";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function RGBToHexPage() {
  return (
    <ToolsLayout currentTool="/tools/rgb-to-hex">
      <RGBToHexConverter />
    </ToolsLayout>
  );
}
