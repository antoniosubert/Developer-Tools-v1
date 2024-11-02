import { ToolsMenu } from "@/components/ui/tools-menu";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Developer Tools</h1>
          <p className="text-xl text-muted-foreground">
            A collection of useful tools for developers
          </p>
        </div>
        <ToolsMenu />
      </div>
    </main>
  );
}
