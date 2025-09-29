import HeroSection from "@/components/hero-section";
import CategoriesSection from "@/components/categories-section";
import ToolsGrid from "@/components/tools-grid";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "ToolBox - All-in-One Digital Toolbox",
  description: "Access 25+ free online tools for studying, business, file management, and daily tasks. No registration required, no hidden costs.",
  keywords: ["online tools", "free tools", "productivity", "study tools", "business tools", "file tools", "PDF tools", "calculators", "converters"]
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <ToolsGrid />
    </div>
  );
}
