import { FeatureRow } from './FeatureRow';

export function SolutionSection() {
  return (
    <FeatureRow
      subtitle="The Solution"
      title="Devnet to Mainnet in one loop."
      description="We bundle wallet connection, verification, borrowing, and monitoring into a single subscription. Stop worrying about rent."
      orientation="right"
      visual={
        <div className="media-frame aspect-[4/3] relative bg-[#0f172a] overflow-hidden rounded-2xl shadow-2xl border border-gray-800">
            {/* Mockup of a terminal or process */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800/50 flex items-center px-4 gap-2 border-b border-gray-700">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="p-8 pt-12 font-mono text-sm leading-relaxed">
              <p className="text-green-400">{`> d2d init`}</p>
              <p className="text-gray-400 mb-4">{`  Initializing project configuration...`}</p>
              
              <p className="text-green-400">{`> d2d deploy --mainnet`}</p>
              <div className="pl-4 border-l-2 border-gray-800 mt-2 space-y-1">
                <p className="text-gray-300">{`Verifying build...`}</p>
                <div className="flex justify-between text-gray-500 text-xs uppercase tracking-wider">
                  <span>Build Hash</span>
                  <span>ae9f...2d1a</span>
                </div>
                <p className="text-gray-300 pt-2">{`Estimating rent...`}</p>
                <p className="text-yellow-500">{`Cost: 8.4 SOL (~$1,200)`}</p>
                <p className="text-blue-400 font-bold">{`D2D Covering Liquidity... OK`}</p>
              </div>
              <p className="text-green-400 font-bold mt-4">{`Build Deployed! Total Cost: $5.00`}</p>
            </div>
        </div>
      }
    />
  );
}
