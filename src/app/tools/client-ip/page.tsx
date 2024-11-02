import ClientIPLookup from "@/components/tools/network/client-ip-lookup";
import { ToolsLayout } from "@/components/ui/tools-layout";

export default function ClientIPPage() {
  return (
    <ToolsLayout currentTool="/tools/client-ip">
      <ClientIPLookup />
    </ToolsLayout>
  );
}
