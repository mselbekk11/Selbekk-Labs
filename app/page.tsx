import CTA from "@/components/CTA/cta";
import Footer from "@/components/footer/footer";
import Hero from "@/components/hero/hero";
import Projects from "@/components/projects/projects";
import Services from "@/components/services/services";
import Testimonials from "@/components/testimonials/testimonials";

export default function Page() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
