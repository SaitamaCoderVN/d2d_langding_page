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
            <div className="absolute inset-0 bg-red-500/5 blur-[100px] rounded-full" />
            <div className="relative z-10 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-4 border-4 border-white shadow-xl">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </div>
              <div className="text-xl font-bold text-gray-900">$1,000+ Rent Cost</div>
              <p className="text-sm text-gray-500">For a single program deployment</p>
            </div>
        </div>
      }
    />
  );
}
