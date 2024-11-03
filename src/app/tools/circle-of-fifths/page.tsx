import CircleOfFifths from "@/components/tools/music/circle-of-fifths";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function CircleOfFifthsPage() {
  return (
    <ToolsLayout currentTool="/tools/circle-of-fifths">
      <CircleOfFifths />
    </ToolsLayout>
  );
}
