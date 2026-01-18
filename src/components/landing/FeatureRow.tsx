import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, fadeIn } from '@/lib/animations';

interface FeatureRowProps {
  title: string;
  subtitle?: string;
  description: string;
  visual: ReactNode;
  orientation?: 'left' | 'right';
  ctaText?: string;
  ctaLink?: string;
  highlightUnderline?: boolean;
}

export function FeatureRow({ 
  title, 
  subtitle, 
  description, 
  visual, 
  orientation = 'left',
  ctaText,
  ctaLink,
  highlightUnderline = false
}: FeatureRowProps) {
  
  const isLeft = orientation === 'left';

  return (
    <section className="py-12 md:py-16 relative bg-transparent overflow-hidden">
      <div className="container-main grid gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div 
          className={`space-y-4 md:space-y-6 ${isLeft ? 'order-1' : 'order-1 lg:order-2'}`}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {subtitle && (
            <span className="text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase text-blue-600">
              {subtitle}
            </span>
          )}
          
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15] md:leading-[1.1]">
              {title}
              {highlightUnderline && (
                <span className="relative inline-block ml-1 sm:ml-2 md:ml-0 md:block w-full">
                   {/* Squiggle SVG */}
                   <svg 
                    className="absolute -bottom-1 sm:-bottom-2 md:-bottom-4 left-0 w-full h-2 md:h-4 text-blue-500" 
                    viewBox="0 0 200 9" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                   >
                    <path d="M2.00025 6.99997C2.00025 6.99997 23.3664 2.87102 46.2081 2.37527C67.6591 1.90971 85.0878 5.41902 105.748 5.62677C134.406 5.91497 170.5 2.00004 170.5 2.00004C170.5 2.00004 186.275 0.5 198 2.00004" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              )}
            </h2>
          </div>

          <p className="text-base md:text-xl text-gray-500 leading-relaxed max-w-lg">
            {description}
          </p>

          {ctaText && ctaLink && (
            <div className="pt-2">
              <a 
                href={ctaLink} 
                className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors group text-sm md:text-base"
              >
                {ctaText} 
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          )}
        </motion.div>

        {/* Visual Content */}
        <motion.div 
          className={`relative ${isLeft ? 'order-2' : 'order-2 lg:order-1'}`}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {visual}
        </motion.div>
      </div>
    </section>
  );
}
