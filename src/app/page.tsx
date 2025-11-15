'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { AnimatedButton } from '@/components/ui/animated-button'

const HERO_STATS = [
  { label: 'Monthly Fee', value: '~0.5% of rent (avg ≈ $5)' },
  { label: 'Rent Access', value: 'Borrow up to 10+ SOL' },
  { label: 'Backer Yield', value: '10 – 15% target APY' },
  { label: 'Ownership Proof', value: 'Mainnet tx & upgrade keys' },
];

const FLOW_STEPS = [
  'Connect wallet and share your devnet program ID',
  'Automatic binary + IDL verification and rent sizing',
  'Borrow SOL from the backer vault and ship to mainnet',
  'Stay live with automated monitoring and renewal pings',
];

const CAPITAL_FEATURES = [
  {
    title: 'Shared Rent Sponsorship',
    description: 'Backers park SOL in a pooled vault so programs can reserve rent instantly without teams locking up their own capital.',
    cta: 'See pool mechanics',
  },
  {
    title: 'Usage-based Accounting',
    description: 'Borrowed SOL, rent burn, and renewal windows auto-sync so repayments (≈0.5% monthly) track real usage.',
    cta: 'View transparency report',
  },
  {
    title: '2–5% Yield Extension',
    description: 'Idle vault balances delegate to conservative Solana yield so sponsorship runway extends before repayments arrive.',
    cta: 'Review yield policy',
  },
];

const RELIABILITY_FEATURES = [
  {
    title: 'Program Verification',
    description: 'Devnet IDs, binary hashes, and IDLs align before any SOL leaves the vault, so only verified builds deploy.',
    cta: 'Verification checklist',
  },
  {
    title: 'Explorer-linked Ownership',
    description: 'Deployment signatures, rent accounts, and upgrade keys arrive together so teams retain control instantly.',
    cta: 'Sample explorer link',
  },
  {
    title: 'Continuous Monitoring',
    description: 'Helius feeds and custom RPCs watch rent health 24/7 and alert you long before balances dip.',
    cta: 'Monitoring overview',
  },
];

const ARCHITECTURE = [
  {
    title: 'Frontend',
    description: 'Wallet-native dashboard for connecting wallets and managing deployments.',
  },
  {
    title: 'Backend',
    description: 'Stores deployment metadata, upgrade authorities, and handles automation.',
  },
  {
    title: 'Blockchain Layer',
    description: 'Solana programs and RPC endpoints coordinate SOL lending and rent management.',
  },
  {
    title: 'Integrations',
    description: 'Wallet Adapter, RPC APIs, and monitoring tools keep deployments live.',
  },
];

const SDK_FEATURES = [
  {
    title: 'TypeScript SDK + REST API',
    description: 'Register programs and trigger deploys with a handful of SDK or REST calls.',
  },
  {
    title: 'Automation Hooks',
    description: 'Webhooks fire on verification, funding, and renewals — perfect for CI/CD or managed services.',
  },
];

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = Math.max(documentHeight - windowHeight, 1);
      const progress = scrollTop / maxScroll;
      
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(clampedProgress);
    };

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        updateScrollProgress();
        rafId = null;
      });
    };

    // Initial calculation
    updateScrollProgress();

    // Use window scroll event
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Calculate position for the light effect
  // Start: top-left (-10%, -10%)
  // End: bottom-right (90%, 90%)
  const lightX = -10 + scrollProgress * 100; // -10% to 90%
  const lightY = -10 + scrollProgress * 100; // -10% to 90%

  // Debug: log scroll progress (remove in production)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Scroll progress:', (scrollProgress * 100).toFixed(1) + '%', 'Light X:', lightX.toFixed(1) + '%', 'Light Y:', lightY.toFixed(1) + '%');
    }
  }, [scrollProgress, lightX, lightY]);

  return (
    <div className="min-h-screen text-foreground transition-colors duration-300 relative isolate">
      {/* Dark gradient background with higher contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #030510 0%, #0a0f1f 50%, #050810 100%)',
        }}
      />
      
      {/* Animated diagonal light effect - above background images and overlays but below content */}
      <div 
        className="fixed pointer-events-none"
        style={{
          width: '1500px',
          height: '1500px',
          left: `${lightX}%`,
          top: `${lightY}%`,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.225) 0%, rgba(59, 130, 246, 0.175) 10%, rgba(59, 130, 246, 0.125) 25%, rgba(59, 130, 246, 0.075) 45%, transparent 75%)',
          filter: 'blur(150px)',
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
          zIndex: 5,
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Subtle grid pattern overlay - very faint white lines */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px,
              transparent 60px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px,
              transparent 60px
            )
          `,
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-20">
      <header className="header-sticky">
        <div className="container-main">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                {/* Neon glow effect */}
                <div className="absolute -inset-1 rounded-[25%] bg-primary/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Logo container with neon border */}
                <div className="relative rounded-[25%] border-2 border-primary/60 bg-gradient-to-br from-primary/10 to-primary/5 p-0.5 shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:border-primary/90 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] transition-all duration-300">
                  <Image 
                    className="rounded-[25%] brightness-110 contrast-110" 
                    src="/favicon.svg" 
                    alt="D2D logo" 
                    width={40} 
                    height={40} 
                    priority 
                  />
                </div>
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-wide text-foreground">D2D</h1>
                <p className="text-xs text-muted-foreground">Decentralize to deployment</p>
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

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-1/3 top-0 h-96 w-96 rounded-full bg-primary/25 blur-3xl motion-safe:animate-[glow_12s_linear_infinite]" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-primary/20 blur-3xl motion-safe:animate-[glow_10s_linear_infinite_reverse]" />
          </div>
        <div className="container-main relative z-10 flex flex-col gap-8 py-12 sm:gap-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-24 xl:gap-20 xl:py-28 2xl:gap-24 2xl:py-32">
          <div className="w-full max-w-2xl space-y-8 cq lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary shadow-[0_0_20px_rgba(59,130,246,0.4)] backdrop-blur-sm transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02]">
               D2D – Decentralize to deployment
            </span>
            <div className="space-y-6">
              <h2 className="hero-heading text-foreground">
                Deploy your Solana program on mainnet.
            <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  With $5/month.
                </span>
              </h2>
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

          </div>

          <div className="relative w-full max-w-xl rounded-2xl border border-primary/35 p-8 shadow-[0_30px_70px_-45px_rgba(59,130,246,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_35px_80px_-40px_rgba(59,130,246,0.75)] hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.98) 0%, rgba(5, 8, 16, 0.95) 50%, rgba(3, 5, 16, 0.98) 100%)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-primary/6 to-transparent opacity-60" />
            <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/35 via-primary/25 to-primary/15 rounded-2xl blur-2xl opacity-40 -z-10 transition-opacity duration-500 hover:opacity-50" />
            <div className="relative z-10">
              <div className="media-frame min-h-[240px] sm:min-h-[300px] lg:min-h-[360px]">
                <Image src="/image_1.jpg" alt="D2D hero visual" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="section-divider py-12 sm:py-16 lg:py-20 xl:py-24 2xl:py-28 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/image_2.jpg" 
            alt="D2D problem visual background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#030510]/90 via-[#050810]/85 to-[#030510]/90" />
        
        {/* Light effect overlay for this section - above dark overlay */}
        <div 
          className="fixed pointer-events-none"
          style={{
            width: '1500px',
            height: '1500px',
            left: `${lightX}%`,
            top: `${lightY}%`,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.225) 0%, rgba(59, 130, 246, 0.175) 10%, rgba(59, 130, 246, 0.125) 25%, rgba(59, 130, 246, 0.075) 45%, transparent 75%)',
            filter: 'blur(150px)',
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top',
            zIndex: 1,
            mixBlendMode: 'screen',
          }}
        />
        
        <div className="container-main relative z-10 cq">
          <div className="max-w-4xl space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// problem</span>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Why rent blocks mainnet launches.</h2>
              <p className="text-base text-muted-foreground">
                Programs larger than a few hundred kilobytes can require triple-digit SOL just to reserve space. Teams delay or cancel mainnet deploys because capital gets trapped and verification spans too many manual steps.
              </p>
          </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Capital lockup',
                  copy: 'Binary size driven rent pulls hundreds of SOL off your balance sheet before the first user ships.'
                },
                {
                  title: 'Operational drag',
                  copy: 'Monitoring rent, renewing vaults, and coordinating upgrades steal engineering cycles.'
                },
                {
                  title: 'Verification gaps',
                  copy: 'Matching devnet IDs to binaries manually introduces risk and slows compliance reviews.'
                },
                {
                  title: 'Newcomer friction',
                  copy: 'Builders fresh to Solana stall on devnet because CLI flows and rent math feel brittle.'
                },
              ].map((item) => (
                <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-primary/25 p-5 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:-translate-y-1 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.90) 0%, rgba(5, 8, 16, 0.85) 50%, rgba(3, 5, 16, 0.90) 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <p className="font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary/90">{item.title}</p>
                    <p className="leading-relaxed">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
              </div>
        </div>
      </section>

      <section id="flow" className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32">
        <div className="container-main cq grid gap-8 sm:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// solution</span>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">One loop from devnet build to mainnet rent.</h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Wallet connect, verification, borrowing, and monitoring live in a single subscription so you can prove deploy ownership without touching raw rent math.
              </p>
          </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {FLOW_STEPS.slice(0, 4).map((step, idx) => (
                <div
                  key={step}
                  className="group relative overflow-hidden rounded-2xl border border-primary/35 p-6 text-sm text-muted-foreground shadow-[0_20px_40px_-25px_rgba(59,130,246,0.45)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_25px_50px_-20px_rgba(59,130,246,0.6)] hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.95) 0%, rgba(5, 8, 16, 0.90) 50%, rgba(3, 5, 16, 0.95) 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/50 bg-gradient-to-br from-primary/25 to-primary/15 text-xs font-bold uppercase tracking-[0.3em] text-primary shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                      0{idx + 1}
                    </div>
                    <p className="text-base leading-relaxed text-foreground transition-colors duration-300 group-hover:text-primary/90">{step}</p>
                  </div>
                </div>
              ))}
            </div>
                </div>
          <div className="space-y-5">
            <div 
              className="media-frame min-h-[240px] sm:min-h-[300px] lg:min-h-[400px] relative"
              style={{
                backgroundImage: 'url(/image_3.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Subtle overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/30 z-0" />
              
              {/* DEVNET label - top left */}
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
                <span className="inline-block rounded-lg border border-primary/50 bg-background/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  //DEVNET
                </span>
              </div>
              
              {/* MAINNET label - top right */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10">
                <span className="inline-block rounded-lg border border-primary/50 bg-background/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  //MAINNET
                </span>
              </div>
            </div>
                  </div>
                </div>
      </section>

      <section id="capital" className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32">
        <div className="container-main cq grid gap-8 sm:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// capital efficiency</span>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">SOL lending without capital drag.</h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Backers supply rent liquidity, D2D handles renewals, and teams repay a light subscription so programs stay live with minimal treasury impact.
              </p>
              </div>
            <div className="grid gap-5 grid-cols-1">
              {CAPITAL_FEATURES.map((item, idx) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-primary/25 p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.4)] hover:-translate-y-1 hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.95) 0%, rgba(5, 8, 16, 0.90) 50%, rgba(3, 5, 16, 0.95) 100%)',
                  }}
                >
                  {/* Blue glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -inset-[2px] bg-gradient-to-br from-primary/25 via-primary/15 to-transparent rounded-2xl blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-60 -z-10" />
                  
                  {/* Vertical Stacked Content */}
                  <div className="relative z-10 flex flex-col gap-5">
                    {/* Title - Top, Left Aligned */}
                    <h3 className="text-base font-bold uppercase tracking-[0.15em] text-foreground leading-tight">
                      {item.title}
                    </h3>
                    
                    {/* Body Text - Below Title, Vertical Block */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    
                    {/* Action Label - Below Body Text, Left Aligned */}
                    <Link 
                      href="#contact" 
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all duration-200 hover:text-primary/80 hover:gap-3 group/link w-fit"
                    >
                      <span>{item.cta}</span>
                      <span className="text-base transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                    </Link>
                  </div>
                  
                    {/* Accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              ))}
            </div>
              </div>
          <div className="relative">
            <div 
              className="relative overflow-hidden rounded-2xl border border-primary/35 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:scale-[1.01] min-h-[240px] sm:min-h-[300px] lg:min-h-[400px]"
              style={{
                backgroundImage: 'url(/image_4.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Subtle overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/30 z-0" />
              
              {/* Animated background glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/35 via-primary/25 to-primary/15 rounded-2xl blur-2xl opacity-40 -z-10 transition-opacity duration-500 hover:opacity-50" />
            </div>
          </div>
        </div>
      </section>

      <section 
        id="reliability" 
        className="section-divider py-12 sm:py-16 lg:py-20 xl:py-24 2xl:py-28 relative"
      >
        {/* Background image with 80% opacity */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/image_5.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.8,
          }}
        />
        
        {/* Dark overlay for content readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/70 to-background/80 z-0" />
        
        {/* Light effect overlay for this section - above dark overlay */}
        <div 
          className="fixed pointer-events-none"
          style={{
            width: '1500px',
            height: '1500px',
            left: `${lightX}%`,
            top: `${lightY}%`,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.225) 0%, rgba(59, 130, 246, 0.175) 10%, rgba(59, 130, 246, 0.125) 25%, rgba(59, 130, 246, 0.075) 45%, transparent 75%)',
            filter: 'blur(150px)',
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top',
            zIndex: 1,
            mixBlendMode: 'screen',
          }}
        />
        
        <div className="container-main relative z-10 cq">
          <div className="max-w-4xl space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// reliability & transparency</span>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Proof-backed deployments, monitored forever.
              </h2>
              <p className="text-base text-muted-foreground">
                D2D verifies binaries before deploy, hands you ownership receipts, and keeps rent monitored so audits stay simple.
              </p>
            </div>
            
            {/* Features Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {RELIABILITY_FEATURES.map((item, idx) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-primary/25 p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.4)] hover:-translate-y-1 hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.95) 0%, rgba(5, 8, 16, 0.90) 50%, rgba(3, 5, 16, 0.95) 100%)',
                  }}
                >
                  {/* Blue glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -inset-[2px] bg-gradient-to-br from-primary/25 via-primary/15 to-transparent rounded-2xl blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-60 -z-10" />
                  
                  {/* Vertical Stacked Content */}
                  <div className="relative z-10 flex flex-col gap-5">
                    {/* Icon + Title - Top, Left Aligned */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-gradient-to-br from-primary/25 to-primary/15 ring-1 ring-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                        <div className="h-5 w-5 rounded-full bg-primary/70 transition-all duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="text-base font-bold uppercase tracking-[0.15em] text-foreground leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Body Text - Below Title, Vertical Block */}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    
                    {/* Action Label - Below Body Text, Left Aligned */}
                    <Link 
                      href="/docs" 
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all duration-200 hover:text-primary/80 hover:gap-3 group/link w-fit"
                    >
                      <span>{item.cta}</span>
                      <span className="text-base transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                    </Link>
                  </div>
                  
                  {/* Accent line - Blue */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32">
        <div className="container-main cq grid gap-8 sm:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 lg:grid-cols-2 lg:items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// architecture</span>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">What powers the deploy loop.</h2>
              <p className="text-lg text-muted-foreground">
                Frontend, backend, Solana programs, and integrations sync to push verified binaries on-chain and keep rent funded.
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-primary/25 p-6 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:-translate-y-1 hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.90) 0%, rgba(5, 8, 16, 0.85) 50%, rgba(3, 5, 16, 0.90) 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-foreground mb-3">Optional modules</h3>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Auto-renew rent vault via smart contract</li>
                  <li>Deployment history dashboard</li>
                  <li>Developer verification workflows</li>
                </ul>
              </div>
            </div>
            <div className="media-frame min-h-[240px] sm:min-h-[300px] lg:min-h-[400px]">
              <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 h-full">
                {/* Left section - Architecture Diagram */}
                <div className="flex flex-col items-start sm:items-center text-center sm:text-left">
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-muted-foreground/90">
                      ARCHITECTURE DIAGRAM
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="flex items-center gap-3 sm:gap-4 w-full max-w-xs">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <span className="text-muted-foreground/60 text-lg sm:text-xl">/</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </div>
                
                {/* Right section - Updating Soon */}
                <div className="flex flex-col items-start sm:items-center gap-2">
                  <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-primary">
                  UPDATING SOON
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-5 flex flex-col justify-center">
            {ARCHITECTURE.map((item) => (
              <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-primary/25 p-6 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:-translate-y-1 hover:scale-[1.01]"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 15, 31, 0.85) 0%, rgba(22, 35, 58, 0.75) 50%, rgba(10, 15, 31, 0.85) 100%)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programmable" className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32 text-foreground">
        <div className="container-main cq grid gap-8 sm:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// sdk & automation</span>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Deploy via SDK or API.</h2>
              <p className="text-lg text-muted-foreground">
                TypeScript SDK, REST API, and webhook events enable programmatic deployments and CI/CD integration.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {SDK_FEATURES.map((item) => (
                <div key={item.title} className="group relative overflow-hidden flex flex-col rounded-2xl border border-primary/25 p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:-translate-y-1 hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(10, 15, 31, 0.90) 0%, rgba(22, 35, 58, 0.80) 50%, rgba(10, 15, 31, 0.90) 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <Link href="/docs" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:text-primary/80 hover:gap-3 group/link w-fit">
                      <span>Read docs</span>
                      <span className="text-base transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="media-frame min-h-[240px] sm:min-h-[300px] lg:min-h-[400px]">
              <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 h-full">
                {/* Left section - SDK UI Preview */}
                <div className="flex flex-col items-start sm:items-center text-center sm:text-left">
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-muted-foreground/90">
                      SDK UI PREVIEW
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="flex items-center gap-3 sm:gap-4 w-full max-w-xs">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <span className="text-muted-foreground/60 text-lg sm:text-xl">/</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </div>
                
                {/* Right section - Updating Soon */}
                <div className="flex flex-col items-start sm:items-center gap-2">
                  <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-primary">
                    UPDATING SOON
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-primary/35 p-8 shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_55px_rgba(59,130,246,0.45)] hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.98) 0%, rgba(5, 8, 16, 0.95) 50%, rgba(3, 5, 16, 0.98) 100%)',
            }}
          >
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/35 via-primary/25 to-primary/15 blur-2xl opacity-40 -z-10 transition-opacity duration-500 group-hover:opacity-55" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-60" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">SDK snippet</span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary transition-all duration-300 hover:bg-primary/20 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  copy
                </span>
              </div>
              <pre className="relative overflow-hidden rounded-xl border border-primary/30 p-6 text-sm text-primary/90 shadow-inner backdrop-blur transition-all duration-300 group-hover:border-primary/40"
                style={{
                  background: 'rgba(3, 5, 16, 0.85)',
                }}
              >
                <code className="font-mono">
                  {`import { D2D } from '@d2d/sdk';

const client = await D2D.init({ wallet });
await client.deploy({
  devnetProgramId,
  reviewedBinaryCid,
  upgradeAuthority: wallet.publicKey,
});`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section id="economics" className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32">
        <div className="container-main cq grid gap-8 sm:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// economic model</span>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Simple pricing, transparent vaults.</h2>
              <p className="text-lg text-muted-foreground">
                Rent on Solana is refundable, but tying up SOL hurts. D2D spreads the cost across the network and keeps vaults topped up.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Monthly fee:</strong> $5 per program.
              </li>
              <li>
                <strong className="text-foreground">Sponsorship pool:</strong> Covers initial rent (up to ~$1,000) and auto-renews.
              </li>
              <li>
                <strong className="text-foreground">Backer yield:</strong> 10–15% target APY on lent SOL.
              </li>
              <li>
                <strong className="text-foreground">Revenue split:</strong> 70% to vaults, 30% to operations.
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="group relative overflow-hidden rounded-2xl border border-primary/25 p-8 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:-translate-y-1 hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.95) 0%, rgba(5, 8, 16, 0.90) 50%, rgba(3, 5, 16, 0.95) 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-foreground mb-3">Vault yield policy</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Idle rent reserves delegate to conservative Solana strategies, feeding 2–5% APY back into the sponsorship pool.
                </p>
                <div className="mt-6 rounded-xl border border-primary/20 p-5 text-xs leading-relaxed text-muted-foreground backdrop-blur-sm"
                  style={{
                    background: 'rgba(3, 5, 16, 0.70)',
                  }}
                >
                  * Actual rent varies by program size. Typical deployments range from 200–800 KB, requiring tens to hundreds of SOL. D2D absorbs that upfront cost so you can ship for $5/month.
                </div>
              </div>
            </div>
            <div className="media-frame min-h-[240px] sm:min-h-[300px] lg:min-h-[400px]">
              <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 h-full">
                {/* Left section - Economics Chart */}
                <div className="flex flex-col items-start sm:items-center text-center sm:text-left">
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-muted-foreground/90">
                      ECONOMICS CHART
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="flex items-center gap-3 sm:gap-4 w-full max-w-xs">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <span className="text-muted-foreground/60 text-lg sm:text-xl">/</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </div>
                
                {/* Right section - Updating Soon */}
                <div className="flex flex-col items-start sm:items-center gap-2">
                  <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-primary">
                  UPDATING SOON
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32">
        <div className="container-main">
          <div className="group relative overflow-hidden rounded-2xl border border-primary/35 p-6 sm:p-8 lg:p-12 text-center shadow-[0_40px_90px_-45px_rgba(59,130,246,0.75)] backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_45px_100px_-45px_rgba(59,130,246,0.85)] hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.98) 0%, rgba(5, 8, 16, 0.95) 50%, rgba(3, 5, 16, 0.98) 100%)',
            }}
          >
            <div className="absolute inset-0 bg-radial-primary opacity-75 blur-3xl" />
            <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/35 via-primary/25 to-primary/15 rounded-2xl blur-2xl opacity-45 -z-10 transition-opacity duration-500 group-hover:opacity-55" />
            <div className="relative z-10 space-y-6">
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

      <footer className="border-t border-border/60 py-10 text-sm text-muted-foreground">
        <div className="container-main flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} D2D. Decentralize to deployment.</p>
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
    </div>
  );
}
