import Metronome from "@/components/tools/music/metronome";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function MetronomePage() {
  return (
    <ToolsLayout currentTool="/tools/metronome">
      <Metronome />
    </ToolsLayout>
  );
}
