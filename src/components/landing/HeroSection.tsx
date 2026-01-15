import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';
import Image from 'next/image';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-12 md:pt-16 md:pb-16 lg:pt-24 lg:pb-20">

      <div className="container-main relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left Column: Text */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-start gap-6 lg:max-w-2xl"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-100">
            <span className="mr-2 flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
             Live on Solana Mainnet
          </motion.div>

          <motion.h1 variants={fadeInUp} className="hero-heading text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Deploy to Solana for <span className="text-blue-600 relative inline-block">
                $5
                <svg className="absolute w-full h-2 -bottom-1 left-0 text-blue-200" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
            </span>. <br />
            Skip the <span className="text-gray-400 line-through decoration-red-500 decoration-4">rent</span>.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg">
            Stop paying $1,000+ for mainnet deployments. D2D recycles liquidity so you can ship your program for the cost of a coffee.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col gap-4 w-full sm:w-auto">
            <div className="flex flex-wrap gap-4">
              <a href="https://www.app.deployd2d.xyz/" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg">
                Start Deploying
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </a>
              <a href="#problem" className="btn-outline px-8 py-4 text-lg">
                How it works
              </a>
            </div>

            {/* Trust Checkmarks */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 text-sm font-medium text-gray-500">
               <div className="flex items-center gap-2">
                 <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                 No credit card required
               </div>
               <div className="flex items-center gap-2">
                 <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                 Audited Smart Contracts
               </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual */}
        <motion.div 
          className="relative w-full max-w-xl lg:max-w-2xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-blue-500/5">
             <div className="overflow-hidden rounded-xl bg-gray-50 aspect-[4/3] relative">
               <Image 
                 src="/image_1.jpg" 
                 alt="D2D Dashboard Preview" 
                 fill
                 className="object-cover"
                 priority
               />
             </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 hidden md:block rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
             <div className="flex items-center gap-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
               </div>
               <div>
                 <p className="text-xs font-semibold uppercase text-gray-400">Status</p>
                 <p className="font-bold text-gray-900">Verified & Live</p>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
