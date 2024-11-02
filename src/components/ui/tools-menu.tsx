import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Tool {
  name: string;
  description: string;
  icon: string;
  path: string;
}

const tools: Tool[] = [
  {
    name: "RGB to HEX",
    description: "Convert RGB colors to hexadecimal format and vice versa",
    icon: "🎨",
    path: "/tools/rgb-to-hex",
  },
  {
    name: "Date Difference",
    description:
      "Calculate the difference between two dates in months and days",
    icon: "📅",
    path: "/tools/date-difference",
  },
  {
    name: "Time Until Event",
    description: "Calculate the time remaining until a specific date and time",
    icon: "⏰",
    path: "/tools/time-until-event",
  },
  {
    name: "Age Calculator",
    description: "Calculate age from date of birth",
    icon: "👶",
    path: "/tools/age-calculator",
  },
  {
    name: "BMI Calculator",
    description:
      "Calculate Body Mass Index (BMI) and determine weight category",
    icon: "⚖️",
    path: "/tools/bmi-calculator",
  },
  {
    name: "Water Intake Calculator",
    description:
      "Calculate daily water intake based on weight and activity level",
    icon: "💧",
    path: "/tools/water-intake",
  },
  {
    name: "Cooking Measurement Converter",
    description: "Convert between different cooking measurements and units",
    icon: "🥄",
    path: "/tools/cooking-measurement",
  },
  {
    name: "Color Contrast Optimizer",
    description: "Check and optimize color contrast for accessibility",
    icon: "🎨",
    path: "/tools/color-contrast",
  },
  {
    name: "Ping Test URL",
    description: "Test the latency of a URL with simple ping requests",
    icon: "🌐",
    path: "/tools/ping-test",
  },
];

export function ToolsMenu() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <Link href={tool.path} key={tool.name}>
          <div className="p-6 border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="text-2xl mb-2">{tool.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
