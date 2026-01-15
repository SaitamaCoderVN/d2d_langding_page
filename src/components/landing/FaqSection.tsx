import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { fadeInUp } from '@/lib/animations';

const FAQS = [
  {
    question: "How does the rent recycling work?",
    answer: "Solana programs require rent exemption (SOL) to stay on-chain. We deposit this SOL for you from our liquidity pool. When you undeploy or we upgrade the program, we manage the rent balance efficiently."
  },
  {
    question: "Do I keep control of my upgrade authority?",
    answer: "Yes! You can choose to maintain full upgrade authority, or delegate it to our managed squad for automated seamless upgrades. We never take ownership of your IP."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. If you cancel, you have a 30-day grace period to either deposit your own rent SOL or close the program. We provide CLI tools to make this transition instant."
  },
  {
    question: "What happens if Solana rent prices change?",
    answer: "We absorb the volatility. Your subscription price remains locked."
  }
];

export function FaqSection() {
  return (
    <section className="py-12 md:py-16 relative bg-transparent">
      <div className="container-main max-w-3xl">
         <div className="text-center mb-10 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
             <FaqItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border border-gray-200 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left"
      >
        <span className="font-bold text-gray-900">{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-500 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
