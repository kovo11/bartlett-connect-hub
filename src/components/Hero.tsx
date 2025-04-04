
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import BookingForm from "./BookingForm";

const Hero = () => {
  const isMobile = useIsMobile();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);

  // All events data shared with the Events component - updated to start from May
  const allEvents = [
    {
      id: 1,
      title: "London VIP Meet & Greet",
      date: "May 15, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "The Savoy, London",
      spots: "10 spots left",
      price: "£299",
      featured: true,
    },
    {
      id: 2,
      title: "Manchester Exclusive Dinner",
      date: "June 10, 2025",
      time: "7:00 PM - 10:30 PM",
      location: "The Ivy, Manchester",
      spots: "5 spots left",
      price: "£399",
      featured: false,
    },
    {
      id: 3,
      title: "New York CEO Breakfast",
      date: "July 5, 2025",
      time: "8:30 AM - 11:00 AM",
      location: "The Plaza Hotel, NYC",
      spots: "15 spots left",
      price: "$499",
      featured: false,
    },
    {
      id: 4,
      title: "Dubai Business Masterclass",
      date: "August 25, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Burj Al Arab, Dubai",
      spots: "8 spots left",
      price: "$599",
      featured: false,
    },
    {
      id: 5,
      title: "Paris Networking Evening",
      date: "September 12, 2025",
      time: "7:00 PM - 10:00 PM",
      location: "Four Seasons Hotel George V, Paris",
      spots: "12 spots left",
      price: "€349",
      featured: false,
    },
    {
      id: 6,
      title: "Berlin Entrepreneurship Workshop",
      date: "October 8, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Hotel Adlon Kempinski, Berlin",
      spots: "20 spots left",
      price: "€299",
      featured: false,
    },
  ];

  const handleBookingSuccess = () => {
    setBookingDialogOpen(false);
    setScheduleDialogOpen(false);
  };

  const openBookingForm = () => {
    setBookingDialogOpen(true);
  };

  const openScheduleDialog = () => {
    setScheduleDialogOpen(true);
  };

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
              <Button 
                onClick={openBookingForm}
                className="bg-gold hover:bg-gold-dark text-dark font-medium text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
              >
                Book Your Spot
              </Button>
              <Button 
                variant="outline" 
                className="border-gold/50 text-gold hover:bg-gold/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6"
                onClick={openScheduleDialog}
              >
                <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                View Schedule
              </Button>
            </div>
            
            <div className="pt-2 md:pt-4">
              <p className="text-white/60 text-sm">Next event: London, May 15th 2025</p>
              <p className="text-white/60 text-sm mt-1">
                For more information: <a href="mailto:support@stevenbartlett.info" className="text-gold hover:underline">support@stevenbartlett.info</a>
              </p>
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

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="max-w-3xl bg-dark border-dark-lighter text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">Event Schedule</DialogTitle>
            <DialogDescription className="text-white/70">
              Browse our upcoming events and secure your spot
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
    </section>
  );
};

export default Hero;
