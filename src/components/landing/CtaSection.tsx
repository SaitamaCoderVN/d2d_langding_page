import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp } from '@/lib/animations';

export function CtaSection() {
  const sdkRef = useRef(null);
  const sdkInView = useInView(sdkRef, { once: true, margin: "-100px" });

  return (
    <section ref={sdkRef} className="py-8 md:py-16 bg-transparent relative">
      <motion.div 
        className="container-main relative z-10"
        initial="hidden"
        animate={sdkInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="mx-auto rounded-2xl md:rounded-3xl bg-blue-600/90 backdrop-blur-xl p-8 md:p-16 text-center text-white shadow-2xl shadow-blue-500/20 border border-white/20 overflow-hidden relative">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">Ready to ship on mainnet?</h2>
            <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto mt-4">
              One wallet connection, one verified build, and you’re live.
            </p>
            <div className="flex flex-col items-stretch sm:items-center justify-center gap-4 sm:flex-row pt-8">
              <a
                href="https://www.app.deployd2d.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-bold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:-translate-y-1 active:scale-[0.98]"
              >
                Launch App
              </a>
              <a 
                href="/docs" 
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
              >
                Read Documentation
              </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
