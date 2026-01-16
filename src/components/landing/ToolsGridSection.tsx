import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

const TOOLS = [
  {
    id: 'cli',
    title: 'D2D CLI',
    description: 'Deploy programs and manage keys directly from your terminal. One command to rule them all.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 17L10 11L4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'bg-green-500'
  },
  {
    id: 'sdk',
    title: 'TypeScript SDK',
    description: 'Integrate deployment workflows into your own CI/CD pipelines or internal tools.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16.5 9.4L7.5 4.21C6.0628 3.38 5.34419 2.96501 5.34419 2.96501C5.34419 2.96501 5.34419 2.96501 5.34419 11.265C5.34419 19.565 5.34419 19.565 5.34419 19.565C5.34419 19.565 6.0628 19.15 7.5 18.32L16.5 13.12C17.9372 12.29 18.6558 11.875 18.6558 11.26C18.6558 10.645 17.9372 10.23 16.5 9.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: 'bg-purple-500'
  },
  {
    id: 'dashboard',
    title: 'Web Dashboard',
    description: 'Visual management of your deployments, bills, and team access.',
    icon: (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: 'bg-blue-500'
  }
];

export function ToolsGridSection() {
  return (
    <section className="py-12 md:py-20 bg-transparent relative">
      <div className="container-main space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
             Explore D2D Tools.
          </h2>
           <p className="text-xl text-gray-500">
            Everything you need to ship, from terminal to dashboard.
          </p>
        </div>

        <motion.div 
          className="grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TOOLS.map((tool) => (
            <motion.div 
              key={tool.id}
              variants={staggerItem}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group relative"
            >
              {/* Subtle Gradient Overlay on Hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none ${tool.color}`} />
              

              
              {/* Bottom Half: Content */}
              <div className="p-6 space-y-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-white ${tool.color} shadow-lg shadow-current/20`}>
                     {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.title}</h3>
                </div>
                
                <div>
                   <p className="text-sm text-gray-500 leading-relaxed">
                     {tool.description}
                   </p>
                </div>
                
                <div className="pt-2">
                   <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                      →
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
