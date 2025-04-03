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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import BookingForm from "./BookingForm";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  // All events data shared with the Events component
  const allEvents = [
    {
      id: 1,
      title: "London VIP Meet & Greet",
      date: "January 15, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "The Savoy, London",
      spots: "10 spots left",
      price: "£299",
      featured: true,
    },
    {
      id: 2,
      title: "Manchester Exclusive Dinner",
      date: "February 10, 2025",
      time: "7:00 PM - 10:30 PM",
      location: "The Ivy, Manchester",
      spots: "5 spots left",
      price: "£399",
      featured: false,
    },
    {
      id: 3,
      title: "New York CEO Breakfast",
      date: "March 5, 2025",
      time: "8:30 AM - 11:00 AM",
      location: "The Plaza Hotel, NYC",
      spots: "15 spots left",
      price: "$499",
      featured: false,
    },
    {
      id: 4,
      title: "Dubai Business Masterclass",
      date: "March 25, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Burj Al Arab, Dubai",
      spots: "8 spots left",
      price: "$599",
      featured: false,
    },
    {
      id: 5,
      title: "Paris Networking Evening",
      date: "April 12, 2025",
      time: "7:00 PM - 10:00 PM",
      location: "Four Seasons Hotel George V, Paris",
      spots: "12 spots left",
      price: "€349",
      featured: false,
    },
    {
      id: 6,
      title: "Berlin Entrepreneurship Workshop",
      date: "May 8, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Hotel Adlon Kempinski, Berlin",
      spots: "20 spots left",
      price: "€299",
      featured: false,
    },
  ];

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

  const handleBookNow = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
    setBookingDialogOpen(true);
  };

  const handleBookingSuccess = () => {
    setBookingDialogOpen(false);
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
            <Button 
              className="bg-gold hover:bg-gold-dark text-dark font-medium"
              onClick={handleBookNow}
            >
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
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </div>
      )}

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-3xl bg-dark border-dark-lighter text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">Book Your Spot</DialogTitle>
            <DialogDescription className="text-white/70">
              Choose an event and book your spot
            </DialogDescription>
          </DialogHeader>
          
          <BookingForm 
            availableEvents={allEvents.map(event => ({
              id: event.id,
              title: event.title, 
              date: event.date,
              location: event.location,
              price: event.price,
              time: event.time
            }))}
            onSubmitSuccess={handleBookingSuccess}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;
