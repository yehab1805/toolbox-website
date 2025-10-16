import HeroSection from "@/components/hero-section";
import PDFToolsShowcase from "@/components/pdf-tools-showcase";
import CategoriesSection from "@/components/categories-section";
import ToolsGrid from "@/components/tools-grid";

export const metadata = {
  title: "ToolBox - All-in-One Digital Toolbox with PDF Tools",
  description: "Access 50+ free online tools including professional PDF processing tools. Merge, split, convert, edit, and secure PDFs. No registration required, no hidden costs.",
  keywords: ["online tools", "free tools", "productivity", "study tools", "business tools", "file tools", "PDF tools", "PDF merger", "PDF converter", "PDF editor", "calculators", "converters"]
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PDFToolsShowcase />
      <CategoriesSection />
      <ToolsGrid />
    </div>
  );
}
