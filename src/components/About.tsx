
import React from "react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-dark-light py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1 px-4 md:px-0">
            <img 
              src="/lovable-uploads/571f4162-7392-4482-b9ad-5fc61a9be33c.png" 
              alt="Steven Bartlett" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          
          <div className="order-1 md:order-2 reveal text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
              About <span className="gold-gradient">Steven</span>
            </h2>
            
            <div className="space-y-3 md:space-y-4 text-white/80 text-sm md:text-base">
              <p>
                Steven Bartlett is the founder of Social Chain and host of Europe's biggest podcast, 
                "The Diary of a CEO." He's a sought-after speaker, investor, author, and content creator 
                who inspires millions of people with his insights on entrepreneurship, success, and personal growth.
              </p>
              
              <p>
                At just 31, Steven has built multiple successful businesses, authored the bestselling book 
                "Happy Sexy Millionaire," and continues to impact people through his thought-provoking content 
                and candid conversations with world-class guests.
              </p>
              
              <p>
                Meet & greet events with Steven offer a rare opportunity to connect personally with one of 
                the most influential young entrepreneurs in the world, gaining insights that could transform 
                your business and life.
              </p>
            </div>
            
            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-2 md:gap-4 text-center">
              <div className="bg-dark p-3 md:p-4 rounded-lg">
                <h3 className="text-gold text-xl md:text-3xl font-bold">300+</h3>
                <p className="text-white/70 text-xs md:text-sm">Podcast Episodes</p>
              </div>
              <div className="bg-dark p-3 md:p-4 rounded-lg">
                <h3 className="text-gold text-xl md:text-3xl font-bold">10M+</h3>
                <p className="text-white/70 text-xs md:text-sm">Monthly Listeners</p>
              </div>
              <div className="bg-dark p-3 md:p-4 rounded-lg">
                <h3 className="text-gold text-xl md:text-3xl font-bold">25+</h3>
                <p className="text-white/70 text-xs md:text-sm">Global Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
