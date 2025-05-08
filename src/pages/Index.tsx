
import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Events from "../components/Events";
import Gallery from "../components/Gallery";
import FAQ from "../components/FAQ";
import Registration from "../components/Registration";
import Footer from "../components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = isMobile ? 50 : 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleReveal);
    // Initial check on load
    setTimeout(handleReveal, 100);
    
    return () => window.removeEventListener("scroll", handleReveal);
  }, [isMobile]);

  return (
    <div className="bg-dark text-white min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Events />
      
      {/* Vimeo Video Section */}
      <section className="relative py-16 md:py-24 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 reveal">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              Featured <span className="gold-gradient">Video</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
              Watch Steven in action and get a taste of what to expect at our exclusive events.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto reveal">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-dark-lighter">
              <AspectRatio ratio={16/9}>
                <iframe 
                  title="Steven Bartlett Featured Video" 
                  src="https://player.vimeo.com/video/1082402043?h=c4a03a184d&autoplay=1&loop=1&background=1" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                ></iframe>
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>
      
      <Gallery />
      <Registration />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
