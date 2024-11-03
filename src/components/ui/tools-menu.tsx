import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Tool {
  name: string;
  description: string;
  icon: string;
  path: string;
  category: string;
}

interface ToolsMenuProps {
  expandedCategories: string[];
  onToggleCategory: (category: string) => void;
}

export const tools: Tool[] = [
  {
    name: "RGB to HEX",
    description: "Convert RGB colors to hexadecimal format and vice versa",
    icon: "🎨",
    path: "/tools/rgb-to-hex",
    category: "Design",
  },
  {
    name: "Color Contrast Optimizer",
    description: "Check and optimize color contrast for accessibility",
    icon: "🎨",
    path: "/tools/color-contrast",
    category: "Design",
  },
  {
    name: "Date Difference",
    description:
      "Calculate the difference between two dates in months and days",
    icon: "📅",
    path: "/tools/date-difference",
    category: "Date & Time",
  },
  {
    name: "Time Until Event",
    description: "Calculate the time remaining until a specific date and time",
    icon: "⏰",
    path: "/tools/time-until-event",
    category: "Date & Time",
  },
  {
    name: "Age Calculator",
    description: "Calculate age from date of birth",
    icon: "👶",
    path: "/tools/age-calculator",
    category: "Date & Time",
  },
  {
    name: "BMI Calculator",
    description:
      "Calculate Body Mass Index (BMI) and determine weight category",
    icon: "⚖️",
    path: "/tools/bmi-calculator",
    category: "Health",
  },
  {
    name: "Water Intake Calculator",
    description:
      "Calculate daily water intake based on weight and activity level",
    icon: "💧",
    path: "/tools/water-intake",
    category: "Health",
  },
  {
    name: "Cooking Measurement Converter",
    description: "Convert between different cooking measurements and units",
    icon: "🥄",
    path: "/tools/cooking-measurement",
    category: "Conversion",
  },
  {
    name: "Ping Test URL",
    description: "Test the latency of a URL with simple ping requests",
    icon: "🌐",
    path: "/tools/ping-test",
    category: "Development",
  },
  {
    name: "JSON Generator",
    description: "Generate JSON objects with a visual interface",
    icon: "📝",
    path: "/tools/json-generator",
    category: "Development",
  },
  {
    name: "Password Generator",
    description: "Generate secure passwords with custom requirements",
    icon: "🔒",
    path: "/tools/password-generator",
    category: "Security",
  },
  {
    name: "Text Case Converter",
    description: "Convert text between different letter cases",
    icon: "✏️",
    path: "/tools/text-case",
    category: "Text",
  },
  {
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: "📏",
    path: "/tools/unit-converter",
    category: "Conversion",
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Convert text to and from Base64 encoding",
    icon: "🔄",
    path: "/tools/base64",
    category: "Development",
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs",
    icon: "📱",
    path: "/tools/qr-generator",
    category: "Development",
  },
  {
    name: "UUID Generator",
    description: "Generate random UUIDs (Universally Unique Identifiers)",
    icon: "🔑",
    path: "/tools/uuid-generator",
    category: "Development",
  },
  {
    name: "Loan Calculator",
    description: "Calculate loan payments, total interest, and amortization",
    icon: "💰",
    path: "/tools/loan-calculator",
    category: "Finance",
  },
  {
    name: "Tip Calculator",
    description: "Calculate tip amount and split bills between people",
    icon: "💰",
    path: "/tools/tip-calculator",
    category: "Finance",
  },
  {
    name: "Regex Tester",
    description: "Test and validate regular expressions with live matching",
    icon: "🔍",
    path: "/tools/regex-tester",
    category: "Development",
  },
  {
    name: "Markdown Previewer",
    description: "Preview and edit Markdown with live rendering",
    icon: "📝",
    path: "/tools/markdown-previewer",
    category: "Text",
  },
  {
    name: "JSON Formatter",
    description: "Format and validate JSON with proper indentation",
    icon: "🔧",
    path: "/tools/json-formatter",
    category: "Development",
  },
  {
    name: "Client IP Lookup",
    description: "Find your local IP address using WebRTC",
    icon: "🌐",
    path: "/tools/client-ip",
    category: "Network",
  },
  {
    name: "What Week?",
    description: "Find out the current week number of the year",
    icon: "📅",
    path: "/tools/what-week",
    category: "Date & Time",
  },
  {
    name: "Time Zone Converter",
    description: "Convert times between different time zones",
    icon: "🌍",
    path: "/tools/time-zone-converter",
    category: "Date & Time",
  },
  {
    name: "API Request Builder",
    description: "Build and test API requests with a visual interface",
    icon: "🔌",
    path: "/tools/api-request-builder",
    category: "Development",
  },
  {
    name: "Metronome",
    description: "A simple metronome for keeping time while practicing music",
    icon: "🎵",
    path: "/tools/metronome",
    category: "Music",
  },
  {
    name: "Chord Finder",
    description: "Find guitar and piano chord shapes",
    icon: "🎸",
    path: "/tools/chord-finder",
    category: "Music",
  },
  {
    name: "PDF Merger",
    description: "Merge multiple PDF files into a single document",
    icon: "📄",
    path: "/tools/pdf-merger",
    category: "Document",
  },
  {
    name: "Data Generator",
    description:
      "Generate sample data with custom fields and export as JSON/CSV",
    icon: "📊",
    path: "/tools/data-generator",
    category: "Development",
  },
];

// Get categories and their icons
const categoryIcons: Record<string, string> = {
  Development: "👨‍💻",
  Design: "🎨",
  "Date & Time": "📅",
  Health: "💪",
  Conversion: "🔄",
  Security: "🔒",
  Text: "📝",
  Network: "🌐",
  Finance: "💰",
  Music: "🎵",
  Document: "📄",
};

// Add recommended tools array
const recommendedTools = [
  "/tools/json-formatter",
  "/tools/password-generator",
  "/tools/color-contrast",
  "/tools/markdown-previewer",
  "/tools/base64",
  "/tools/unit-converter",
];

export function ToolsMenu({
  expandedCategories,
  onToggleCategory,
}: ToolsMenuProps) {
  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  // Filter recommended tools
  const recommended = tools.filter((tool) =>
    recommendedTools.includes(tool.path)
  );

  return (
    <Tabs defaultValue="recommended" className="w-full">
      <TabsList className="w-full justify-center mb-6 overflow-x-auto flex-wrap gap-2 h-auto py-2 px-4">
        <TabsTrigger
          value="recommended"
          className="min-w-[140px] flex-shrink-0"
        >
          ⭐ Recommended
        </TabsTrigger>
        {Object.keys(toolsByCategory).map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="min-w-[140px] flex-shrink-0"
          >
            {categoryIcons[category]} {category}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="recommended">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommended.map((tool) => (
            <Link href={tool.path} key={tool.name}>
              <div className="p-6 border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer h-full">
                <div className="text-2xl mb-2">{tool.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </TabsContent>

      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        <TabsContent key={category} value={category}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTools.map((tool) => (
              <Link href={tool.path} key={tool.name}>
                <div className="p-6 border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer h-full">
                  <div className="text-2xl mb-2">{tool.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
