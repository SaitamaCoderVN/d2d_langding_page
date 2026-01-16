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
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/yGkn7lJbHik?si=D2D_Demo"
            title="D2D Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
