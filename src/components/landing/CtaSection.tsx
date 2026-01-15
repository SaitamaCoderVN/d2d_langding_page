import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp } from '@/lib/animations';

export function CtaSection() {
  const sdkRef = useRef(null);
  const sdkInView = useInView(sdkRef, { once: true, margin: "-100px" });

  return (
    <section ref={sdkRef} className="py-12 bg-transparent relative">
      <motion.div 
        className="container-main relative z-10"
        initial="hidden"
        animate={sdkInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="mx-auto rounded-3xl bg-blue-600/90 backdrop-blur-xl p-8 md:p-16 text-center text-white shadow-2xl shadow-blue-500/20 border border-white/20">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Ready to ship on mainnet?</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              One wallet connection, one verified build, and you’re live.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
              <a
                href="https://www.app.deployd2d.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:-translate-y-1"
              >
                Launch App
              </a>
              <a 
                href="/docs" 
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
              >
                Read Documentation
              </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
