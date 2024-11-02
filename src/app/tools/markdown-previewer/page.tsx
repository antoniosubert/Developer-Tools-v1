import MarkdownPreviewer from "@/components/tools/formatters/markdown-previewer";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function MarkdownPreviewerPage() {
  return (
    <ToolsLayout currentTool="/tools/markdown-previewer">
      <MarkdownPreviewer />
    </ToolsLayout>
  );
}
