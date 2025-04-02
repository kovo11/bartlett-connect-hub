
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const Hero = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    
    const reveal = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 150) {
          element.classList.add("active");
        }
      });
    };
    
    window.addEventListener("scroll", reveal);
    reveal(); // Call once to check for elements in view on load
    
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 dark-gradient">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/95"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 reveal">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="block">Meet</span>
              <span className="gold-gradient text-5xl md:text-7xl">Steven Bartlett</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              Join an exclusive meet & greet with the renowned entrepreneur, 
              author, and host of "The Diary of a CEO" podcast.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gold hover:bg-gold-dark text-dark font-medium text-lg px-8 py-6">
                Book Your Spot
              </Button>
              <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                View Schedule
              </Button>
            </div>
            
            <div className="pt-4">
              <p className="text-white/60 text-sm">Next event: London, June 15th 2024</p>
            </div>
          </div>
          
          <div className="hidden md:block reveal">
            <img 
              src="/lovable-uploads/b6a0cd7f-1d3f-448c-b290-821e08065563.png" 
              alt="Steven Bartlett - The Diary of a CEO" 
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
