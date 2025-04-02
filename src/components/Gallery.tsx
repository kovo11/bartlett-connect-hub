
import React from "react";

const Gallery = () => {
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
      src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      alt: "Conference venue",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1544928147-79a2dbc1f669?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
      alt: "VIP dinner setting",
    },
  ];

  return (
    <section id="gallery" className="section-padding bg-dark-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Event <span className="gold-gradient">Gallery</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Take a look at our past events and hear from those who've experienced 
            the exclusive opportunity to meet Steven in person.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
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

        <div className="text-center mb-12 reveal">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            What People <span className="gold-gradient">Say</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-dark p-6 rounded-xl border border-dark-lighter hover:border-gold/20 transition-all duration-300 reveal"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-white/60">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-white/80 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
