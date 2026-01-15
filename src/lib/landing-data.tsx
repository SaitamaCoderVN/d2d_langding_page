import { ReactNode } from "react";

export const FLOW_STEPS = [
  'Connect wallet & submit your devnet program ID',
  'Automated .so extraction, IDL verification & rent estimation',
  'Borrow SOL from the decentralized backer vault & deploy to mainnet',
  'Live monitoring, repayment tracking & automated renewals',
];

export interface CapitalFeature {
  title: string;
  description: string;
  descriptionHtml?: ReactNode;
  cta: string;
}

export const CAPITAL_FEATURES: CapitalFeature[] = [
  {
    title: 'Community-Powered Deploy Liquidity',
    description: 'Backers deposit SOL into a shared vault that fronts the rent cost for new program deployments. No team needs to lock thousands of dollars to launch; liquidity is borrowed only when a deploy happens.',
    cta: 'Learn more about vault mechanics',
  },
  {
    title: 'Real-Time Usage & Repayment Sync',
    description: 'Every deploy request automatically tracks:',
    descriptionHtml: (
      <>
        Every deploy request automatically tracks:
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>borrowed SOL</li>
          <li>actual rent cost</li>
          <li>repayment status</li>
          <li>expiration windows</li>
        </ul>
        <p className="mt-2">
          Developers repay a small fixed subscription (~$5/month), tightly aligned with real deploy activity.
        </p>
      </>
    ),
    cta: 'View on-chain transparency',
  },
  {
    title: 'High-APY Backer Incentives (10–15% Target)',
    description: 'Rent on Solana is refundable but locks valuable SOL for years. D2D reallocates this burden across the network: the vault fronts rent instantly, developers repay a flat $5/month, and backers earn 10–15% APY from the pooled repayments plus protocol revenue.',
    cta: 'Review backer incentives',
  },
  {
    title: 'Vault Yield Reinforcement (2–4%)',
    description: 'Unused SOL inside the vault is delegated to low-risk Solana yield sources, extending the vault’s runway and ensuring backers earn passive yield while supporting ecosystem growth.',
    cta: 'Review yield policy',
  },
  // Added to fix the array access issues in original file where it expects 4 items but accesses indices 0,1,2,3
];

export const SDK_FEATURES = [
  {
    title: 'TypeScript SDK + REST API',
    description: 'Register programs and trigger deploys with a handful of SDK or REST calls.',
  },
  {
    title: 'Automation Hooks',
    description: 'Webhooks fire on verification, funding, and renewals — perfect for CI/CD or managed services.',
  },
];
