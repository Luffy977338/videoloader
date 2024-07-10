import Hero from "@/components/Hero";
import HeaderFooterLayout from "./HeaderFooterLayout";
import Pricing from "@/components/Pricing";

export default async function Home() {
  return (
    <HeaderFooterLayout>
      <Hero />
      <Pricing />
    </HeaderFooterLayout>
  );
}
