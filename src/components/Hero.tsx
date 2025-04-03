
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 dark-gradient">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/95"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 py-12 md:py-0">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 md:space-y-6 reveal text-center md:text-left">
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">
              <span className="block">Meet</span>
              <span className="gold-gradient text-4xl md:text-7xl">Steven Bartlett</span>
            </h1>
            
            <p className="text-base md:text-xl text-white/80 max-w-xl mx-auto md:mx-0">
              Join an exclusive meet & greet with the renowned entrepreneur, 
              author, and host of "The Diary of a CEO" podcast.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Button className="bg-gold hover:bg-gold-dark text-dark font-medium text-base md:text-lg px-6 md:px-8 py-5 md:py-6">
                Book Your Spot
              </Button>
              <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6">
                <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                View Schedule
              </Button>
            </div>
            
            <div className="pt-2 md:pt-4">
              <p className="text-white/60 text-sm">Next event: London, June 15th 2024</p>
            </div>
          </div>
          
          {/* Show image on mobile but make it smaller */}
          <div className={`mx-auto md:mx-0 px-6 md:px-0 mt-8 md:mt-0 ${isMobile ? 'w-full max-w-xs' : ''} reveal`}>
            <img 
              src="/lovable-uploads/b6a0cd7f-1d3f-448c-b290-821e08065563.png" 
              alt="Steven Bartlett - The Diary of a CEO" 
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
