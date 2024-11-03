import ChordFinder from "@/components/tools/music/chord-finder";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function ChordFinderPage() {
  return (
    <ToolsLayout currentTool="/tools/chord-finder">
      <ChordFinder />
    </ToolsLayout>
  );
}
