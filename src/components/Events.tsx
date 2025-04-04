
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingForm from "./BookingForm";

// Event data - updated dates to start from May 2025
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

const Events = () => {
  const isMobile = useIsMobile();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  
  // Display featured events first, then limit to 3 unless showing all
  const displayEvents = showAllEvents 
    ? allEvents 
    : allEvents.filter((event, index) => event.featured || index < 3);

  const handleBookNow = (event) => {
    setSelectedEvent(event);
    setBookingDialogOpen(true);
  };

  const handleViewSchedule = () => {
    setSelectedEvent(null); // No specific event selected
    setScheduleDialogOpen(true);
  };

  const handleBookingSuccess = () => {
    setBookingDialogOpen(false);
    setScheduleDialogOpen(false);
  };

  const handleViewAllEvents = () => {
    setShowAllEvents(true);
  };

  const renderEventCard = (event) => (
    <Card 
      key={event.id} 
      className={`bg-dark-light border-dark-lighter hover:border-gold/30 transition-all duration-300 h-full ${
        event.featured ? "ring-2 ring-gold/50" : ""
      }`}
    >
      <CardHeader>
        {event.featured && (
          <div className="text-xs uppercase tracking-wide text-gold mb-2 font-medium">
            Featured Event
          </div>
        )}
        <CardTitle className="text-lg md:text-xl font-bold">{event.title}</CardTitle>
        <CardDescription className="text-white/60">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            {event.date}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-white/70">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-white/70">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-white/70">
          <User className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{event.spots}</span>
        </div>
        <div className="py-3">
          <span className="text-xl md:text-2xl font-bold text-gold">{event.price}</span>
          <span className="text-white/60 text-sm ml-1">per person</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${
            event.featured 
              ? "bg-gold hover:bg-gold-dark text-dark" 
              : "bg-dark-lighter hover:bg-dark-light text-white"
          }`}
          onClick={() => handleBookNow(event)}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <section id="events" className="section-padding bg-dark py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16 reveal">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Upcoming <span className="gold-gradient">Events</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Book your spot at one of our exclusive meet & greet events with Steven Bartlett.
            Limited spaces available for these intimate gatherings.
          </p>
        </div>

        {isMobile ? (
          <div className="px-4 reveal">
            <Carousel className="w-full">
              <CarouselContent>
                {displayEvents.map((event) => (
                  <CarouselItem key={event.id}>
                    {renderEventCard(event)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="relative static transform-none mx-1" />
                <CarouselNext className="relative static transform-none mx-1" />
              </div>
            </Carousel>
          </div>
        ) : (
          <div className={`grid gap-6 reveal ${showAllEvents ? 'md:grid-cols-3' : 'md:grid-cols-3'}`}>
            {displayEvents.map(renderEventCard)}
          </div>
        )}

        <div className="text-center mt-8 md:mt-12">
          {!showAllEvents && (
            <Button 
              variant="outline" 
              className="border-gold/50 text-gold hover:bg-gold/10"
              onClick={handleViewAllEvents}
            >
              View All Events
            </Button>
          )}

          {showAllEvents && (
            <Button 
              variant="outline" 
              className="border-gold/50 text-gold hover:bg-gold/10 ml-4"
              onClick={handleViewSchedule}
            >
              <Calendar className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
          )}
        </div>

        {/* Booking Dialog */}
        <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
          <DialogContent className="max-w-3xl bg-dark border-dark-lighter text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl">Book Your Spot</DialogTitle>
              <DialogDescription className="text-white/70">
                Fill out the form below to register your interest for this event.
              </DialogDescription>
            </DialogHeader>
            
            {selectedEvent && (
              <BookingForm 
                eventTitle={selectedEvent.title}
                eventPrice={selectedEvent.price}
                eventLocation={selectedEvent.location}
                eventDate={selectedEvent.date}
                eventTime={selectedEvent.time}
                eventId={selectedEvent.id}
                onSubmitSuccess={handleBookingSuccess}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Schedule Dialog for View Schedule button */}
        <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
          <DialogContent className="max-w-3xl bg-dark border-dark-lighter text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl">Event Schedule</DialogTitle>
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
      </div>
    </section>
  );
};

export default Events;
