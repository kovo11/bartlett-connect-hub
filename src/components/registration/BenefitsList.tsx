
import React from "react";

type BenefitItemProps = {
  text: string;
};

const BenefitItem = ({ text }: BenefitItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-gold/20 p-2 rounded-full">
        <svg className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <p className="text-white/90">{text}</p>
    </div>
  );
};

const BenefitsList = () => {
  const benefits = [
    "First access to event tickets",
    "Exclusive early bird discounts",
    "Special VIP event invitations"
  ];

  return (
    <div className="space-y-4">
      {benefits.map((benefit, index) => (
        <BenefitItem key={index} text={benefit} />
      ))}
    </div>
  );
};

export default BenefitsList;
