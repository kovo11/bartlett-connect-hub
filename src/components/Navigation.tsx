
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Twitter, 
  Linkedin 
} from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark/90 backdrop-blur-md py-4 shadow-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">
            <span className="gold-gradient">Steven Bartlett</span>
          </h2>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <a href="#about" className="text-white/80 hover:text-gold transition-colors">
            About
          </a>
          <a href="#events" className="text-white/80 hover:text-gold transition-colors">
            Events
          </a>
          <a href="#gallery" className="text-white/80 hover:text-gold transition-colors">
            Gallery
          </a>
          <a href="#faq" className="text-white/80 hover:text-gold transition-colors">
            FAQ
          </a>
          <div className="flex space-x-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-gold transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
          <Button className="bg-gold hover:bg-gold-dark text-dark font-medium">
            Book Now
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
