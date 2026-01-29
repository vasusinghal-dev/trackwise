import CTA from "@/src/components/landing-page/cta-section";
import Hero from "@/src/components/landing-page/hero-section";
import TechStack from "@/src/components/landing-page/techstack-section";
import ValueProps from "@/src/components/landing-page/value-props-section";
import Footer from "@/src/components/landing-page/layout/footer";
import Navbar from "@/src/components/landing-page/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ValueProps />
      <TechStack />
      <CTA />
      <Footer />
    </main>
  );
}
