import { ToolsSidebar } from "./tools-sidebar";

export function ToolsLayout({
  children,
  currentTool,
}: {
  children: React.ReactNode;
  currentTool: string;
}) {
  return (
    <div className="min-h-screen flex">
      <ToolsSidebar currentTool={currentTool} />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
