import PDFMerger from "@/components/ui/pdf-merger";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function PDFMergerPage() {
  return (
    <ToolsLayout currentTool="/tools/pdf-merger">
      <PDFMerger />
    </ToolsLayout>
  );
}
