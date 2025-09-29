import HeroSection from "@/components/hero-section";
import CategoriesSection from "@/components/categories-section";
import ToolsGrid from "@/components/tools-grid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <ToolsGrid />
    </div>
  );
}
