
import React from "react";
import RegistrationForm from "@/components/registration/RegistrationForm";
import BenefitsList from "@/components/registration/BenefitsList";

const Registration = () => {
  return (
    <section id="register" className="section-padding relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Register Your <span className="gold-gradient">Interest</span>
              </h2>
              <p className="text-white/80 mb-6">
                Limited spots are available for our exclusive events. Register your interest now to be 
                notified when new events are announced or when spots become available.
              </p>
              
              <BenefitsList />
            </div>
            
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
