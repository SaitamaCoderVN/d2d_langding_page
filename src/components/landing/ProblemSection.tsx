import { motion } from 'framer-motion';
import Image from 'next/image';
import { FeatureRow } from './FeatureRow';

export function ProblemSection() {
  return (
    <FeatureRow
      subtitle="The Problem"
      title="Mainnet is blocked."
      description="Deploying a Solana program costs ~$1,000. This rent barrier kills indie projects before they even start."
      orientation="left"
      highlightUnderline={true}
      visual={
        <div className="relative h-[300px] w-full flex items-center justify-center p-8">
            {/* Heat Haze / Glow background */}
            <div className="absolute inset-0 bg-red-500/10 blur-[120px] rounded-full animate-pulse" />
            
            <div className="relative z-10 text-center">
              {/* Money Evaporating Animation */}
              <div className="relative mb-8 h-40 w-40 mx-auto flex items-center justify-center">
                {/* Floating Dollar Signs */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, x: (i - 2.5) * 20, scale: 0.5 }}
                    animate={{ 
                      opacity: [0, 0.8, 0], 
                      y: -120, 
                      x: (i - 2.5) * 25 + Math.sin(i) * 25,
                      scale: [0.5, 1.2, 0.8]
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 2, 
                      repeat: Infinity, 
                      delay: i * 0.4,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 flex items-center justify-center text-red-500 font-bold text-3xl"
                  >
                    $
                  </motion.div>
                ))}

                {/* Central Icon: Web Development Image Replacement */}
                <motion.div 
                  initial={{ scale: 0.95, y: 0 }}
                  animate={{ 
                    scale: [0.95, 1, 0.95],
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative w-36 h-36 z-20"
                >
                  <Image
                    src="/web-development.png"
                    alt="Web Development Icon"
                    fill
                    className="object-contain drop-shadow-[0_15px_35px_rgba(239,68,68,0.25)]"
                  />
                </motion.div>
              </div>

              {/* Text Label with high contrast */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-1"
              >
                <div className="text-2xl font-black text-gray-900 tracking-tight">$1,000+ Rent Cost</div>
                <p className="text-sm font-medium text-gray-500">For a single program deployment</p>
              </motion.div>
            </div>
        </div>
      }
    />
  );
}
