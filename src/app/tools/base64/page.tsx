import Base64EncoderDecoder from "@/components/tools/converters/base64-converter";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function Base64Page() {
  return (
    <ToolsLayout currentTool="/tools/base64">
      <Base64EncoderDecoder />
    </ToolsLayout>
  );
}
