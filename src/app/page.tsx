import Image from 'next/image';
import Link from 'next/link';

import { AnimatedButton } from '@/components/ui/animated-button'

const HERO_STATS = [
  { label: 'Monthly Fee', value: '~0.5% of rent (avg ≈ $5)' },
  { label: 'Rent Access', value: 'Borrow up to 10+ SOL' },
  { label: 'Backer Yield', value: '10 – 15% target APY' },
  { label: 'Ownership Proof', value: 'Mainnet tx & upgrade keys' },
];

const FLOW_STEPS = [
  'Connect wallet & deployed devnet program',
  'Enter Program ID on devnet',
  'D2D will calculate rent & fee transaction',
  'Pay ≈ $5 for the first month & D2D deploys using backer SOL',
  'Wait & check your program on mainnet',
];

const CAPITAL_FEATURES = [
  {
    title: 'Shared Rent Sponsorship',
    description:
      'Backers deposit SOL into lending pools so devs can borrow the rent required for mainnet deployments without tying up their own capital.',
    cta: 'See pool mechanics',
  },
  {
    title: 'Usage-based Accounting',
    description:
      'Every program records borrowed SOL, rent burn, and renewal windows so repayments (≈0.5% monthly) stay aligned with actual usage.',
    cta: 'View transparency report',
  },
  {
    title: '2–5% Yield Extension',
    description:
      'Idle SOL in the pool is delegated to conservative Solana-native strategies (validators, liquid staking) to extend runway before repayments arrive.',
    cta: 'Review yield policy',
  },
];

const RELIABILITY_FEATURES = [
  {
    title: 'Program Verification',
    description:
      'We compare your devnet ID, binary hash, and IDL before releasing borrowed SOL. Only verified builds make it to mainnet.',
    cta: 'Verification checklist',
  },
  {
    title: 'Explorer-linked Ownership',
    description:
      'Receive the transaction signature, rent account, and upgrade authority so you retain full control immediately after deploy.',
    cta: 'Sample explorer link',
  },
  {
    title: 'Continuous Monitoring',
    description:
      'Helius APIs and custom RPCs monitor rent balances, health checks, and renewal windows. Alerts fire before deposits dip.',
    cta: 'Monitoring overview',
  },
];

const ARCHITECTURE = [
  {
    title: 'Frontend',
    description:
      'React + Vite + TailwindCSS power a wallet-native dashboard that mirrors Solana builder tooling expectations.',
  },
  {
    title: 'Backend',
    description:
      'Supabase (PostgreSQL + Edge Functions) stores deployment metadata, upgrade authorities, and audit logs. Edge functions issue webhooks post-deploy.',
  },
  {
    title: 'Blockchain Layer',
    description:
      'Solana mainnet programs, RPC endpoints (Helius + dedicated nodes), and a rent vault program coordinate SOL lending, repayments, and renewals.',
  },
  {
    title: 'Integrations',
    description:
      'Solana Wallet Adapter, Helius API for confirmations, optional auto-renew smart contract, and deployment history dashboards.',
  },
];

const SDK_FEATURES = [
  {
    title: 'TypeScript SDK + REST API',
    description:
      'Register programs, upload reviewed binaries, and trigger mainnet deployments with a few lines of code.',
  },
  {
    title: 'Automation Hooks',
    description:
      'Webhook events notify you when verification completes, rent is reserved, or renewals are due—ideal for CI/CD pipelines.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="header-sticky">
        <div className="container-main">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/60 ring-1 ring-primary/30">
                <Image src="/favicon.svg" alt="D2D logo" width={28} height={28} priority />
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-wide text-foreground">D2D</h1>
                <p className="text-xs text-muted-foreground">Devnet to Deployment</p>
              </div>
            </div>
            <nav className="hidden items-center space-x-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:flex">
              <Link href="#problem" className="transition duration-300 focus-visible:text-primary focus-visible:outline-none">
                Problem
              </Link>
              <Link href="#flow" className="transition duration-300 focus-visible:text-primary focus-visible:outline-none">
                Solution
              </Link>
              <Link href="#architecture" className="transition duration-300 focus-visible:text-primary focus-visible:outline-none">
                Architecture
              </Link>
              <Link href="#economics" className="transition duration-300 focus-visible:text-primary focus-visible:outline-none">
                Economics
              </Link>
              <AnimatedButton
                label="Launch App"
                href="https://www.app.deployd2d.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.65rem]"
              />
            </nav>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0">
          <div className="absolute -left-1/3 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl motion-safe:animate-[glow_12s_linear_infinite]" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent/30 blur-3xl motion-safe:animate-[glow_10s_linear_infinite_reverse]" />
          </div>
        <div className="container-main relative z-10 flex flex-col gap-16 py-24 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-2xl space-y-8 cq lg:max-w-3xl xl:max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary shadow-[0_0_20px_rgba(0,191,255,0.35)]">
              🧱 D2D – Devnet to Deployment
            </span>
            <div className="space-y-6">
              <h2 className="hero-heading text-foreground">
                Borrow SOL to deploy your Solana program on mainnet.
            <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Average cost ≈ $5/month.
                </span>
              </h2>
              <p className="cq-subheading text-muted-foreground">
                D2D connects Solana developers who need rent with backers willing to stake their SOL long term. Borrow the rent you need, pay a monthly maintenance fee, and keep shipping.
              </p>
          </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <AnimatedButton
                label="Launch app"
                href="https://www.app.deployd2d.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              />
              <AnimatedButton label="View Documentation" variant="outline" href="/docs" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 cq-grid-stats">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-primary/20 bg-card/90 px-4 py-5 text-center shadow-[0_20px_45px_-30px_rgba(0,191,255,0.35)] backdrop-blur cq"
                >
                  <div className="text-lg font-semibold text-foreground">{stat.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-xl rounded-3xl border border-primary/30 bg-card p-8 shadow-[0_30px_70px_-45px_rgba(0,191,255,0.55)] backdrop-blur">
            <div className="absolute -top-4 right-6 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Sponsored Rent
            </div>
            <h3 className="text-lg font-semibold text-foreground">Deployment Capsule</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Confirm your devnet build, let D2D match you with available backer liquidity, and borrow the SOL required for rent. We track repayments and renewal dates for you.
            </p>
            <div className="mt-6 space-y-4">
              {[
                'Wallet connection & devnet program check',
                'Rent calculation + repayment schedule',
                'Borrow SOL from backer pool & deploy to mainnet',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-border/80 bg-muted/50 px-6 py-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Next milestone</p>
              <p className="mt-1 text-muted-foreground">Launch $D2D credits for hackathons and ecosystem partners.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="bg-background py-16">
        <div className="container-main cq grid gap-10 lg:grid-cols-2 cq">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// problem</span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Solana rent is refundable, but the upfront deposit can still exceed $1,000.
            </h2>
            <p className="text-muted-foreground">
              Deploying a program typically requires reserving rent based on binary size (0.00089 SOL per byte). For large
              programs that reserve hundreds of kilobytes, builders routinely tie up hundreds of SOL just to ship.
            </p>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card p-6 text-sm text-muted-foreground">
            <ul className="space-y-3">
              <li>
                <strong className="text-foreground">Capital lockup:</strong> Upgrades remain blocked if rent accounts are
                underfunded.
              </li>
              <li>
                <strong className="text-foreground">Operational drag:</strong> Batching deposits, monitoring rent, and
                renewing accounts distract from shipping product.
              </li>
              <li>
                <strong className="text-foreground">Beginner friction:</strong> Teams new to Solana often stay on devnet because
                rent math and CLI flows are intimidating.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="flow" className="bg-background py-24">
        <div className="container-main cq space-y-12 cq">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// Solution</span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">One subscription covers the entire deployment loop.</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              D2D fuses wallet-native onboarding, verification, SOL lending, and monitoring into a single flow. You retain upgrade authority while we keep programs funded.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {FLOW_STEPS.map((step, idx) => (
              <div
                key={step}
                className="rounded-3xl border border-primary/30 bg-card p-6 text-sm text-muted-foreground shadow-[0_20px_40px_-25px_rgba(0,191,255,0.4)] backdrop-blur"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-base font-semibold text-primary shadow-[0_0_15px_rgba(0,191,255,0.4)]">
                  {idx + 1}
                </div>
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="capital" className="bg-background py-24">
        <div className="container-main cq space-y-12">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// capital efficiency</span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">SOL lending that stays solvent.</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Your $5/month subscription feeds a shared rent vault. We top it up, renew it, and extend it with yield so deployments stay live.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {CAPITAL_FEATURES.map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 shadow-xl shadow-cyan-500/5 transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <div className="absolute right-8 top-8 h-12 w-12 rounded-full bg-cyan-500/20 blur-xl transition group-hover:bg-cyan-400/30" />
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <Link href="#contact" className="mt-6 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary">
                  {item.cta}
                  <span className="ml-2 text-base">↗</span>
                </Link>
                  </div>
            ))}
                  </div>
        </div>
      </section>

      <section id="reliability" className="bg-background py-24">
        <div className="container-main cq space-y-12">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">// reliability & transparency</span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Verified programs, explorer-ready ownership, ongoing monitoring.</h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              You keep the upgrade authority, we handle everything else. Every step is linked to on-chain proofs.
            </p>
                </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {RELIABILITY_FEATURES.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-border/60 bg-card p-8 shadow-[0_20px_45px_-20px_rgba(124,58,237,0.5)] transition hover:-translate-y-1 hover:border-purple-400/40"
              >
                <div className="h-12 w-12 rounded-full bg-purple-500/20 text-purple-200 ring-1 ring-purple-500/40" />
                <h3 className="mt-6 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <Link href="/docs" className="mt-6 inline-flex items-center text-sm font-semibold text-purple-200 transition hover:text-purple-100">
                  {item.cta}
                  <span className="ml-2 text-base">↗</span>
                </Link>
                  </div>
            ))}
                  </div>
                </div>
      </section>

      <section id="architecture" className="bg-background py-24">
        <div className="container-main cq grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// architecture</span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Under the hood</h2>
            <p className="text-lg text-muted-foreground">
              D2D pairs a fast React + Vite interface with Supabase automation and Solana rent-vault smart contracts. Wallet Adapter, Helius APIs, and custom RPC endpoints keep the flow fast and observable.
            </p>
            <div className="rounded-3xl border border-border/60 bg-muted/40 p-6 text-sm text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">Optional modules</h3>
              <ul className="mt-3 space-y-2 list-disc list-inside text-muted-foreground">
                <li>Auto-renew rent vault via smart contract</li>
                <li>Deployment history dashboard</li>
                <li>Developer identification & verification module</li>
              </ul>
                  </div>
                </div>
          <div className="space-y-6">
            {ARCHITECTURE.map((item) => (
              <div key={item.title} className="rounded-3xl border border-border/60 bg-muted/40 p-6 text-sm text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programmable" className="bg-background py-24 text-foreground">
        <div className="container-main cq grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// sdk & automation</span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Integrate deployments into CI/CD or managed services.</h2>
            <p className="text-lg text-muted-foreground">
              SDK and automation tooling are in active development. We’re partnering with staking and restaking providers across Solana to offer TypeScript SDKs, REST APIs, and webhook events for end-to-end automation.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {SDK_FEATURES.map((item) => (
                <div key={item.title} className="flex flex-col rounded-3xl border border-border/60 bg-muted/40 p-6 backdrop-blur">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{item.description}</p>
                  <Link href="/docs" className="mt-4 inline-flex items-center text-sm font-semibold text-primary transition hover:text-cyan-100">
                    Read docs
                    <span className="ml-2 text-base">↗</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/10 blur-3xl" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">SDK snippet</span>
                <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary">
                  copy
                </span>
              </div>
              <pre className="relative overflow-hidden rounded-2xl bg-card p-6 text-sm text-cyan-100 shadow-inner">
                <code>
                  {`import { D2D } from '@d2d/sdk';

const client = await D2D.init({ wallet });
await client.deploy({
  devnetProgramId,
  reviewedBinaryCid,
  upgradeAuthority: wallet.publicKey,
});`}
                </code>
              </pre>
              <p className="text-xs text-muted-foreground">
                Replace this placeholder with a production-ready screenshot (e.g. @image-programmable.png) when available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="economics" className="bg-background py-24">
        <div className="container-main cq grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// economic model</span>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Simple pricing, transparent vaults.</h2>
            <p className="text-lg text-muted-foreground">
              Rent on Solana is refundable, but tying up SOL hurts. D2D spreads the cost across the network and keeps vaults topped up.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Monthly rent:</strong> $5 per program.
              </li>
              <li>
                <strong className="text-foreground">Sponsorship pool:</strong> Covers the initial rent reserve (up to ~$1,000) and schedules renewals automatically.
              </li>
              <li>
                <strong className="text-foreground">Revenue sharing:</strong> 70% of fees refuel rent vaults, 30% fund maintenance & ecosystem rewards.
              </li>
              <li>
                <strong className="text-foreground">Backer incentives:</strong> 10–15% target APY on lent SOL plus platform points redeemable for launchpad access and partner ICO slots.
              </li>
              <li>
                <strong className="text-foreground">Future plans:</strong> Launch $D2D credit system and add DAO governance for sponsorship decisions.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-border/60 bg-muted/40 p-8">
            <h3 className="text-lg font-semibold text-foreground">Vault yield policy</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Idle rent reserves are delegated to conservative Solana-native strategies to produce 2–5% APY. Yield is recycled into the vault after validator fees to extend sponsorship runway.
            </p>
            <div className="mt-6 rounded-2xl border border-border/60 bg-background/70 p-6 text-xs text-muted-foreground">
              * Actual rent varies by program size. Typical deployments range from 200–800 KB, requiring tens to hundreds of SOL. D2D absorbs that upfront cost so you can ship for $5/month.
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-background py-16">
        <div className="container-main rounded-3xl border border-primary/30 bg-card p-10 text-center text-sm text-muted-foreground shadow-[0_30px_60px_-40px_rgba(0,191,255,0.45)]">
          <h2 className="text-2xl font-semibold text-foreground">Questions or partnerships?</h2>
          <p className="mt-3 text-muted-foreground">
            Reach out through your preferred channel. We’re actively onboarding builders, auditors, and rent sponsors.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 text-sm sm:flex-row">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <span role="img" aria-label="email">
                📧
              </span>
              <a href="mailto:coderhopham@gmail.com" className="hover:text-foreground">
                coderhopham@gmail.com
              </a>
            </span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <span role="img" aria-label="telegram">
                📬
              </span>
              <a href="https://t.me/d2d_hq" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
                t.me/d2d_hq
              </a>
            </span>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <span role="img" aria-label="twitter">
                🐦
              </span>
              <a href="https://twitter.com/d2d_hq" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
                @d2d_hq
              </a>
            </span>
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-12 text-center shadow-[0_40px_90px_-45px_rgba(0,191,255,0.7)]">
            <div className="absolute inset-0 bg-radial-primary opacity-70 blur-3xl" />
            <div className="relative space-y-6">
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Ready to ship on Solana mainnet?</h2>
              <p className="mx-auto max-w-2xl text-lg text-foreground">
                One wallet connection, one verified build, and you’re live. D2D handles rent, renewals, and monitoring so you can stay focused on product.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <AnimatedButton
                  label="Launch app"
                  href="https://www.app.deployd2d.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <AnimatedButton label="Read Docs" variant="outline" href="/docs" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 bg-background py-10 text-sm text-muted-foreground">
        <div className="container-main flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} D2D. Devnet to Deployment.</p>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-foreground">
              Documentation
            </Link>
            <Link href="https://twitter.com/d2d_hq" className="hover:text-foreground" target="_blank">
              Twitter / X
            </Link>
            <Link href="https://t.me/d2d_hq" className="hover:text-foreground" target="_blank">
              Telegram
            </Link>
            <Link href="mailto:coderhopham@gmail.com" className="hover:text-foreground">
              coderhopham@gmail.com
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
