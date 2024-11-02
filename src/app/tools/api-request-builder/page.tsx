import ApiRequestBuilder from "@/components/tools/dev/api-request-builder";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function ApiRequestBuilderPage() {
  return (
    <ToolsLayout currentTool="/tools/api-request-builder">
      <ApiRequestBuilder />
    </ToolsLayout>
  );
}
