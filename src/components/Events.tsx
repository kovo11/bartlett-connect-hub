
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Events = () => {
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

  return (
    <section id="events" className="section-padding bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming <span className="gold-gradient">Events</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Book your spot at one of our exclusive meet & greet events with Steven Bartlett.
            Limited spaces available for these intimate gatherings.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card 
              key={event.id} 
              className={`bg-dark-light border-dark-lighter hover:border-gold/30 transition-all duration-300 reveal ${
                event.featured ? "ring-2 ring-gold/50" : ""
              }`}
            >
              <CardHeader>
                {event.featured && (
                  <div className="text-xs uppercase tracking-wide text-gold mb-2 font-medium">
                    Featured Event
                  </div>
                )}
                <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
                <CardDescription className="text-white/60">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-white/70">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <User className="h-4 w-4 mr-2" />
                  <span>{event.spots}</span>
                </div>
                <div className="py-3">
                  <span className="text-2xl font-bold text-gold">{event.price}</span>
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
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
