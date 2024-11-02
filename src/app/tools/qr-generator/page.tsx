import QRCodeGenerator from "@/components/tools/generators/qr-generator";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function QRGeneratorPage() {
  return (
    <ToolsLayout currentTool="/tools/qr-generator">
      <QRCodeGenerator />
    </ToolsLayout>
  );
}
