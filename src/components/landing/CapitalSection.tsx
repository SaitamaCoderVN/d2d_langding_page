import { FeatureRow } from './FeatureRow';

export function CapitalSection() {
  return (
    <FeatureRow
      subtitle="Capital Efficiency"
      title="Subsidized Deployments."
      description="Developers deploy to mainnet for $5 while D2D recycles community liquidity, eliminating the upfront 1–10 SOL rent barrier."
      orientation="left"
      visual={
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 max-w-sm mx-auto">
           <div className="flex items-center justify-between mb-8">
              <span className="text-gray-400 font-medium">Cost Comparison</span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">99% SAVINGS</span>
           </div>
           
           <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-500">
                   <span>Standard Deployment</span>
                   <span className="line-through">$1,200</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-red-400 w-full opacity-30"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 font-bold text-gray-900">
                   <span>D2D Deployment</span>
                   <span className="text-blue-600">$5.00</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[1%]"></div>
                </div>
              </div>
           </div>

           <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <div className="text-3xl font-extrabold text-gray-900">Recycled Liquidity</div>
              <p className="text-sm text-gray-500 mt-1">We handle the SOL, you ship the code.</p>
           </div>
        </div>
      }
    />
  );
}
