
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Twitter, 
  Linkedin,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "FAQ", href: "#faq" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
  ];

  return (
    <>
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
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-white/80 hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex space-x-2">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-gold transition-colors"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
            <Button className="bg-gold hover:bg-gold-dark text-dark font-medium">
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-1"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-dark-dark pt-24 px-6 overflow-y-auto">
          <div className="flex flex-col space-y-6 items-center">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-white text-xl hover:text-gold transition-colors"
                onClick={() => {
                  toggleMobileMenu();
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="flex space-x-6 py-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-gold transition-colors"
                >
                  <link.icon size={24} />
                </a>
              ))}
            </div>
            <Button 
              className="bg-gold hover:bg-gold-dark text-dark font-medium w-full"
              onClick={toggleMobileMenu}
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
