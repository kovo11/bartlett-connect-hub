
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What happens at a Steven Bartlett meet & greet?",
      answer: "Each event is unique, but typically includes a moderated Q&A session, personal interaction time with Steven, professional photo opportunities, and often includes food and refreshments. VIP events may also include a signed copy of Steven's book and additional networking time."
    },
    {
      question: "How long are the meet & greet events?",
      answer: "Most events last between 2-3 hours, with VIP dinners extending to approximately 3-4 hours. The exact schedule will be provided in your confirmation email after booking."
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer: "Refunds are available up to 14 days before the event. After that, while we can't offer refunds, you can transfer your ticket to someone else by notifying us via email."
    },
    {
      question: "Will I be able to take photos with Steven?",
      answer: "Yes, all events include dedicated time for professional photos with Steven, which will be made available to you digitally after the event. Personal photos are also generally allowed during designated times."
    },
    {
      question: "Are there any COVID-19 protocols in place?",
      answer: "We follow local health guidelines for all our events. Specific requirements, if any, will be communicated to ticket holders before each event."
    },
    {
      question: "What should I wear to the event?",
      answer: "Most events have a smart-casual dress code. For VIP dinners, business attire is recommended. Specific dress code information will be included in your event confirmation."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-dark py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16 reveal">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Frequently <span className="gold-gradient">Asked Questions</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            Everything you need to know about our exclusive meet & greet events with Steven.
          </p>
        </div>

        <div className="max-w-3xl mx-auto reveal">
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-dark-light border border-dark-lighter rounded-lg px-3 md:px-6"
              >
                <AccordionTrigger className="text-base md:text-lg font-medium py-3 md:py-4 hover:text-gold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/80 pb-3 md:pb-4 text-sm md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 md:mt-12 text-center">
            <p className="text-white/70 text-sm md:text-base">
              Still have questions? Contact us at{" "}
              <a 
                href="mailto:support@stevenbartlett.com" 
                className="text-gold hover:underline"
              >
                support@stevenbartlett.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
