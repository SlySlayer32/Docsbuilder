import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Stats } from '../components/landing/Stats';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CTA } from '../components/landing/CTA';
import { Footer } from '../components/landing/Footer';


interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      <Hero onGetStarted={onGetStarted} />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
};


