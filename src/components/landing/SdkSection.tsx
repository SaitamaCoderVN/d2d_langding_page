import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, fadeInUp, staggerItem, fadeIn } from '@/lib/animations';
import { SDK_FEATURES } from '@/lib/landing-data';

export function SdkSection() {
  const programmableRef = useRef(null);
  const programmableInView = useInView(programmableRef, { once: true, margin: "-100px" });

  return (
    <section ref={programmableRef} id="programmable" className="py-12 bg-transparent relative">
      <motion.div 
        className="container-main cq grid gap-12 lg:grid-cols-2 lg:items-center"
        initial="hidden"
        animate={programmableInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div variants={staggerContainer} className="space-y-8">
          <motion.div variants={fadeInUp} className="space-y-4">
             <span className="text-sm font-semibold text-blue-600">Developer Experience</span>
            <h2 className="section-heading">Deploy via SDK or API.</h2>
            <p className="text-lg text-gray-500">
              Integrate directly into your CI/CD pipeline with our TypeScript SDK and REST API.
            </p>
          </motion.div>
          <motion.div 
            className="grid gap-6 sm:grid-cols-2"
            variants={staggerContainer}
          >
            {SDK_FEATURES.map((item) => (
              <motion.div 
                key={item.title} 
                variants={staggerItem}
                className="rounded-xl border border-gray-100 p-6 bg-gray-50 hover:bg-white hover:shadow-md transition-all"
              >
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="relative rounded-2xl bg-[#1e1e1e] p-6 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
             <div className="h-3 w-3 rounded-full bg-red-500/80" />
             <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
             <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="font-mono text-sm leading-relaxed overflow-x-auto">
             <div className="text-purple-400">import <span className="text-white">{`{ D2DClient }`}</span> from <span className="text-green-400">'@d2d/sdk'</span>;</div>
             <div className="text-gray-500 mt-2">// Initialize client</div>
             <div className="text-white"><span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> D2DClient(apiKey);</div>
             <div className="text-gray-500 mt-4">// Deploy program</div>
             <div className="text-white"><span className="text-purple-400">const</span> deployment = <span className="text-purple-400">await</span> client.deploy({`{`}</div>
             <div className="text-white pl-4">network: <span className="text-green-400">'mainnet'</span>,</div>
             <div className="text-white pl-4">programId: <span className="text-green-400">'...'</span>,</div>
             <div className="text-white pl-4">artifacts: <span className="text-green-400">'./target/deploy'</span>,</div>
             <div className="text-white">{`}`});</div>
             <div className="text-gray-500 mt-4">// Monitor status</div>
             <div className="text-blue-400">console<span className="text-white">.log(deployment.status);</span></div>
             <div className="text-gray-500">{`> 'verified'`}</div>
          </div>
        </motion.div>  
      </motion.div>
    </section>
  );
}
