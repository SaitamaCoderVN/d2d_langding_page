'use client';

import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { SolutionSection } from '@/components/landing/SolutionSection';
import { CapitalSection } from '@/components/landing/CapitalSection';
import { ToolsGridSection } from '@/components/landing/ToolsGridSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { Footer } from '@/components/layout/Footer';
import { VideoSection } from '@/components/landing/VideoSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FaqSection } from '@/components/landing/FaqSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900 relative">
      {/* Global Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.7] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 transform opacity-60">
          <div className="h-[800px] w-[800px] rounded-full bg-blue-100/60 blur-3xl" />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="h-[600px] w-[600px] rounded-full bg-blue-500/15 blur-[120px]" />
        </div>
      </div>
      
      <div className="relative z-20">
        <Header />
        <main className="space-y-0">
          <HeroSection />
          <VideoSection />
          <ProblemSection />
          <SolutionSection />
          <CapitalSection />
          <ToolsGridSection />
          <PricingSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
