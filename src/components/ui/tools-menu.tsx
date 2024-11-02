import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Tool {
  name: string;
  description: string;
  icon: string;
  path: string;
  category: string;
}

const tools: Tool[] = [
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
];

export function ToolsMenu() {
  // Group tools by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  return (
    <div className="space-y-8">
      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTools.map((tool) => (
              <Link href={tool.path} key={tool.name}>
                <div className="p-6 border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="text-2xl mb-2">{tool.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
