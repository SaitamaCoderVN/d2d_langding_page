import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export function VideoSection() {
  return (
    <section className="py-10 md:py-16 relative bg-transparent">
      <div className="container-main">
        <motion.div
           variants={fadeInUp}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video border border-gray-800 group cursor-pointer"
        >
          {/* Background Placeholder Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-gray-900/40" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
               <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/50">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M8 5v14l11-7z" />
                  </svg>
               </div>
            </div>
          </div>
          
          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900/90 to-transparent">
             <p className="text-white text-lg font-medium">See how it works in 60 seconds</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
