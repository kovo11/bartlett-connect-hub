
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Gallery = () => {
  const isMobile = useIsMobile();
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, Innovative Solutions",
      quote: "Meeting Steven was a game-changer for my business. His insights were exactly what I needed to take my company to the next level.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 2,
      name: "Mark Williams",
      position: "Founder, TechStart",
      quote: "The VIP dinner with Steven exceeded all my expectations. Not only was the conversation inspiring, but the connections I made were invaluable.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 3,
      name: "Jessica Chen",
      position: "Marketing Director",
      quote: "Steven's personal advice during the meet & greet completely changed my perspective on building a personal brand. Worth every penny!",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    },
  ];

  const eventImages = [
    {
      id: 1,
      src: "/lovable-uploads/571f4162-7392-4482-b9ad-5fc61a9be33c.png",
      alt: "Steven Bartlett at an event",
    },
    {
      id: 2,
      src: "/lovable-uploads/4e0b19aa-065e-4937-aa3c-b8dd8e58f53f.png",
      alt: "Steven Bartlett podcast",
    },
    {
      id: 3,
      src: "/lovable-uploads/502e27df-b10f-469b-9614-be27905ee801.png",
      alt: "VIP dinner setting with Steven Bartlett",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      alt: "Conference venue",
    },
  ];

  const renderTestimonial = (testimonial) => (
    <div 
      key={testimonial.id} 
      className="bg-dark p-4 md:p-6 rounded-xl border border-dark-lighter hover:border-gold/20 transition-all duration-300 h-full"
    >
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden mr-3 md:mr-4 flex-shrink-0">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-sm md:text-base">{testimonial.name}</h4>
          <p className="text-xs md:text-sm text-white/60">{testimonial.position}</p>
        </div>
      </div>
      <p className="text-white/80 italic text-sm md:text-base">"{testimonial.quote}"</p>
    </div>
  );

  return (
    <section id="gallery" className="section-padding bg-dark-light py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16 reveal">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Event <span className="gold-gradient">Gallery</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Take a look at our past events and hear from those who've experienced 
            the exclusive opportunity to meet Steven in person.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8 md:mb-16">
          {eventImages.map((image) => (
            <div 
              key={image.id} 
              className="overflow-hidden rounded-lg aspect-square reveal"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center mb-6 md:mb-12 reveal">
          <h3 className="text-xl md:text-3xl font-bold mb-2">
            What People <span className="gold-gradient">Say</span>
          </h3>
        </div>

        {isMobile ? (
          <div className="px-4 reveal">
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pt-2 pb-8">
                    {renderTestimonial(testimonial)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-2">
                <CarouselPrevious className="relative static transform-none mx-1" />
                <CarouselNext className="relative static transform-none mx-1" />
              </div>
            </Carousel>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 reveal">
            {testimonials.map(renderTestimonial)}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
