'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import ProblemSection from '@/components/landing/ProblemSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorks from '@/components/landing/HowItWorks';
import AIAssistantSection from '@/components/landing/AIAssistantSection';
import CollaborationSection from '@/components/landing/CollaborationSection';
import SecuritySection from '@/components/landing/SecuritySection';
import ProductShowcase from '@/components/landing/ProductShowcase';
import SocialProof from '@/components/landing/SocialProof';
import FAQ from '@/components/landing/FAQ';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative selection:bg-purple-500/30 selection:text-white">
      <Navbar />
      
      <main className="flex-1 w-full relative z-10 pt-10">
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <AIAssistantSection />
        <CollaborationSection />
        <ProductShowcase />
        <SecuritySection />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
