
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
      <Gallery />
      <Registration />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
