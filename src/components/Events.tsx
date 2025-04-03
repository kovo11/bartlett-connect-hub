
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

const Events = () => {
  const isMobile = useIsMobile();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  
  const upcomingEvents = [
    {
      id: 1,
      title: "London VIP Meet & Greet",
      date: "June 15, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "The Savoy, London",
      spots: "10 spots left",
      price: "£299",
      featured: true,
    },
    {
      id: 2,
      title: "Manchester Exclusive Dinner",
      date: "July 23, 2024",
      time: "7:00 PM - 10:30 PM",
      location: "The Ivy, Manchester",
      spots: "5 spots left",
      price: "£399",
      featured: false,
    },
    {
      id: 3,
      title: "New York CEO Breakfast",
      date: "August 12, 2024",
      time: "8:30 AM - 11:00 AM",
      location: "The Plaza Hotel, NYC",
      spots: "15 spots left",
      price: "$499",
      featured: false,
    },
  ];

  const handleBookNow = (event) => {
    setSelectedEvent(event);
    setBookingDialogOpen(true);
  };

  const handleBookingSuccess = () => {
    setBookingDialogOpen(false);
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
                {upcomingEvents.map((event) => (
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
          <div className="grid md:grid-cols-3 gap-6 reveal">
            {upcomingEvents.map(renderEventCard)}
          </div>
        )}

        <div className="text-center mt-8 md:mt-12">
          <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10">
            View All Events
          </Button>
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
                onSubmitSuccess={handleBookingSuccess}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Events;
