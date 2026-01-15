import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function PricingSection() {
  return (
    <section id="pricing" className="py-8 md:py-16 relative bg-transparent">
      <div className="container-main max-w-6xl">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Simple, Transparent Pricing.
          </h2>
          <p className="text-xl text-gray-500">
            Stop overpaying for rent. Start shipping.
          </p>
        </div>

        <motion.div 
          className="grid gap-8 lg:grid-cols-2 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* LEFT: The Old Way */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-gray-200 hover:scale-[1.02] transition-all duration-300 opacity-75 hover:opacity-100">
            <h3 className="text-xl font-bold text-gray-500 mb-2">Standard Mainnet</h3>
            <div className="text-4xl font-extrabold text-gray-900 mb-6">$1,000<span className="text-lg font-medium text-gray-400">/deploy</span></div>
            
            <ul className="space-y-4 mb-8 text-gray-500">
               <li className="flex items-center gap-3">
                 <span className="text-red-500">✕</span> High upfront rent cost
               </li>
               <li className="flex items-center gap-3">
                 <span className="text-red-500">✕</span> Manual key management
               </li>
               <li className="flex items-center gap-3">
                 <span className="text-red-500">✕</span> No verified build badge
               </li>
               <li className="flex items-center gap-3">
                 <span className="text-red-500">✕</span> Zero analytics
               </li>
            </ul>
            
            <div className="w-full py-4 text-center text-gray-400 font-medium">
               Hard & Expensive
            </div>
          </motion.div>

          {/* RIGHT: D2D Pro (Highlighted) */}
          <motion.div variants={fadeInUp} className="relative bg-[#0f172a] rounded-3xl border-2 border-blue-500 p-8 md:p-10 shadow-2xl shadow-blue-500/20 scale-105 hover:scale-[1.07] hover:shadow-blue-500/30 transition-all duration-300 z-10">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">
               Recommended
            </div>
            
            <h3 className="text-xl font-bold text-blue-400 mb-2">Pro Subscription</h3>
            <div className="text-5xl font-extrabold text-white mb-2">$5<span className="text-lg font-medium text-gray-400">/mo</span></div>
            <p className="text-sm text-gray-400 mb-8">Billed annually, or $9 monthly.</p>
            
            <ul className="space-y-4 mb-10 text-white font-medium">
               <li className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">✓</div>
                 <span>Rent-free deployments</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">✓</div>
                 <span>Verified Builds</span>
               </li>
               <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">✓</div>
                 <span>CLI & SDK Access</span>
               </li>
               <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">✓</div>
                 <span>Real-time Dashboard</span>
               </li>
            </ul>
            
            <a href="https://www.app.deployd2d.xyz/" className="block w-full text-center bg-blue-600 hover:bg-white hover:text-blue-600 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25">
               Start Free Trial
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
