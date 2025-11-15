'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { AnimatedButton } from '@/components/ui/animated-button'

const FLOW_STEPS = [
  'Connect wallet & submit your devnet program ID',
  'Automated .so extraction, IDL verification & rent estimation',
  'Borrow SOL from the decentralized backer vault & deploy to mainnet',
  'Live monitoring, repayment tracking & automated renewals',
];

const CAPITAL_FEATURES = [
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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function LandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLogoInView, setIsLogoInView] = useState(false);
  const [logoRotation, setLogoRotation] = useState({ x: 0, y: 0 });
  const [isMouseHovering, setIsMouseHovering] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  
  // Refs for scroll animations
  const problemRef = useRef(null);
  const statsRef = useRef(null);
  const flowRef = useRef(null);
  const capitalRef = useRef(null);
  const programmableRef = useRef(null);
  const sdkRef = useRef(null);
  
  // useInView hooks
  const problemInView = useInView(problemRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const flowInView = useInView(flowRef, { once: true, margin: "-100px" });
  const capitalInView = useInView(capitalRef, { once: true, margin: "-100px" });
  const programmableInView = useInView(programmableRef, { once: true, margin: "-100px" });
  const sdkInView = useInView(sdkRef, { once: true, margin: "-100px" });

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

  // Intersection Observer for logo animation
  useEffect(() => {
    if (!logoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLogoInView(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(logoRef.current);

    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, []);

  // Auto 3D animation when logo is in view
  useEffect(() => {
    if (!isLogoInView || isMouseHovering) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      if (isMouseHovering) return;
      
      time += 0.02;
      const rotateX = Math.sin(time) * 15;
      const rotateY = Math.cos(time * 0.7) * 15;
      setLogoRotation({ x: rotateX, y: rotateY });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isLogoInView, isMouseHovering]);

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
              {/* Dropdown 1: Resources */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition duration-300 focus-visible:text-primary focus-visible:outline-none flex items-center gap-1">
                  RESOURCES
                  <svg aria-hidden="true" width="14" height="14" className="inline ml-0.5"><path fill="currentColor" d="M3.5 5l3.5 4 3.5-4z"/></svg>
                </button>
                {/* Invisible bridge to prevent dropdown from closing when moving mouse */}
                <div className="absolute left-0 top-full w-full h-[10px]" />
                <div className={`absolute left-0 top-full min-w-[160px] pt-[10px] z-30 transition-all duration-200 ${activeDropdown === 'resources' ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                  <div className="bg-background border border-primary/20 shadow-xl rounded-lg py-2 backdrop-blur-xl">
                    <Link
                      href=""
                      className="block px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-primary/5 hover:text-primary transition"
                    >
                      Whitepaper
                    </Link>
                    <Link
                      href=""
                      className="block px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-primary/5 hover:text-primary transition"
                    >
                      Journal
                    </Link>
                    <Link
                      href=""
                      className="block px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-primary/5 hover:text-primary transition"
                    >
                      FAQ
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dropdown 2: Network */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('network')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition duration-300 focus-visible:text-primary focus-visible:outline-none flex items-center gap-1">
                  Network
                  <svg aria-hidden="true" width="14" height="14" className="inline ml-0.5"><path fill="currentColor" d="M3.5 5l3.5 4 3.5-4z"/></svg>
                </button>
                {/* Invisible bridge to prevent dropdown from closing when moving mouse */}
                <div className="absolute left-0 top-full w-full h-[10px]" />
                <div className={`absolute left-0 top-full min-w-[160px] pt-[10px] z-30 transition-all duration-200 ${activeDropdown === 'network' ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                  <div className="bg-background border border-primary/20 shadow-xl rounded-lg py-2 backdrop-blur-xl">
                    <Link
                      href="https://github.com/D2dProtocol"
                      className="block px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-primary/5 hover:text-primary transition"
                    >
                      Contributors
                    </Link>
                    <Link
                      href="https://t.me/d2d_hq"
                      className="block px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-primary/5 hover:text-primary transition"
                    >
                      Telegram
                    </Link>
                    <Link
                      href="https://x.com/d2d_hq"
                      className="block px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-primary/5 hover:text-primary transition"
                    >
                      X
                    </Link>
                  </div>
                </div>
              </div>
              
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
          <motion.div 
            className="w-full max-w-2xl space-y-8 cq lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary shadow-[0_0_20px_rgba(59,130,246,0.4)] backdrop-blur-sm transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02]"
            >
               D2D – Decentralize to deployment
            </motion.span>
            <motion.div 
              variants={fadeInUp}
              className="space-y-6"
            >
              <h2 className="hero-heading text-foreground">
                Deploy your Solana program on mainnet.
            <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  With $5/month.
                </span>
              </h2>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <AnimatedButton
                label="Launch app"
                href="https://www.app.deployd2d.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              />
            </motion.div>

          </motion.div>

          <motion.div 
            className="relative w-full max-w-xl rounded-2xl border border-primary/35 p-8 shadow-[0_30px_70px_-45px_rgba(59,130,246,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_35px_80px_-40px_rgba(59,130,246,0.75)] hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.98) 0%, rgba(5, 8, 16, 0.95) 50%, rgba(3, 5, 16, 0.98) 100%)',
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-primary/6 to-transparent opacity-60" />
            <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/35 via-primary/25 to-primary/15 rounded-2xl blur-2xl opacity-40 -z-10 transition-opacity duration-500 hover:opacity-50" />
            <div className="relative z-10">
              <div className="media-frame min-h-[240px] sm:min-h-[300px] lg:min-h-[360px]">
                <Image src="/image_1.jpg" alt="D2D hero visual" width={500} height={500} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={problemRef} id="problem" className="section-divider py-12 sm:py-16 lg:py-20 xl:py-24 2xl:py-28 relative overflow-hidden">
        
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
        
        <motion.div 
          className="container-main relative z-10 cq grid gap-8 sm:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 lg:grid-cols-2 lg:items-center"
          initial="hidden"
          animate={problemInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Solana Logo - Left side */}
          <motion.div 
            className="relative order-2 lg:order-1 flex items-center justify-center py-5 sm:py-9 lg:py-13"
            variants={fadeIn}
          >
            <div className="relative group cursor-pointer" style={{ perspective: '1000px' }}>
              <img
                ref={logoRef}
                src="/solanaLogoMark.png"
                alt="Solana Logo"
                className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] transition-all duration-500 group-hover:scale-110"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 0 50px rgba(148, 241, 149, 0.6)) drop-shadow(0 0 100px rgba(153, 69, 255, 0.5))',
                  transformStyle: 'preserve-3d',
                  transform: `perspective(1000px) rotateX(${logoRotation.x}deg) rotateY(${logoRotation.y}deg)`,
                }}
                onMouseEnter={() => setIsMouseHovering(true)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 8;
                  const rotateY = (centerX - x) / 8;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
                }}
                onMouseLeave={(e) => {
                  setIsMouseHovering(false);
                  // Resume auto animation after mouse leave
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${logoRotation.x}deg) rotateY(${logoRotation.y}deg)`;
                }}
              />
            </div>
          </motion.div>
          
          {/* Content - Right side */}
          <motion.div 
            className="space-y-6 order-1 lg:order-2"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// problem</span>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Why rent blocks mainnet launches.</h2>
              <p className="text-base text-muted-foreground">
              Deploying a Solana program on mainnet costs up to ~$1,000, which blocks most developers from launching real products. Thousands of devnet projects never reach users, never generate liquidity, and never contribute to ecosystem growth because deployment is too costly, slow, and operationally complex.
              </p>
            </motion.div>
            <motion.div 
              className="grid gap-4 sm:grid-cols-2"
              variants={staggerContainer}
            >
              {[
                {
                  title: 'High Cost',
                  copy: 'More $1,000 cost prevents indie builders and students from moving to mainnet.'
                },
                {
                  title: 'Devnet dead-ends',
                  copy: 'Ideas stay on devnet, no users, no liquidity, no traction.'
                },
                {
                  title: 'Time-consuming ops',
                  copy: 'Deployment is manual, slow, and error-prone.'
                },
                {
                  title: 'Ecosystem bottleneck',
                  copy: 'Solana loses potential dApps, transactions, and capital flow.'
                },
              ].map((item) => (
                <motion.div 
                  key={item.title} 
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl border border-primary/25 p-5 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:-translate-y-1 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.90) 0%, rgba(5, 8, 16, 0.85) 50%, rgba(3, 5, 16, 0.90) 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <p className="font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary/90">{item.title}</p>
                    <p className="leading-relaxed">{item.copy}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section ref={flowRef} id="flow" className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32">
        <motion.div 
          className="container-main cq grid gap-8 sm:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 lg:grid-cols-2 lg:items-center"
          initial="hidden"
          animate={flowInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={staggerContainer} className="space-y-8">
            <motion.div variants={fadeInUp} className="space-y-4 text-center lg:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// solution</span>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">One seamless loop from devnet → mainnet deployment</h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
              Wallet connect, verification, borrowing, and monitoring live in a single subscription so you can prove deploy ownership without touching raw rent math.
              </p>
            </motion.div>
            <motion.div 
              className="grid gap-5 sm:grid-cols-2"
              variants={staggerContainer}
            >
              {FLOW_STEPS.slice(0, 4).map((step, idx) => (
                <motion.div
                  key={step}
                  variants={staggerItem}
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
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div 
            variants={fadeIn}
            className="space-y-5"
          >
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
          </motion.div>
        </motion.div>
      </section>

      <section ref={capitalRef} id="capital" className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32">
        <motion.div 
          className="container-main cq"
          initial="hidden"
          animate={capitalInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="space-y-4 text-center mb-12 sm:mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// capital efficiency</span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Subsidized Deployments Without Capital Waste</h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Developers deploy to mainnet for $5 while D2D recycles community liquidity, eliminating the upfront 1–10 SOL rent barrier and removing capital drag for both builders and backers.
            </p>
          </motion.div>
          
          {/* Container with image and items in 2 columns */}
          <motion.div 
            className="grid gap-6 sm:gap-8 lg:gap-10 xl:gap-12 lg:grid-cols-3 lg:items-center max-w-6xl mx-auto"
            variants={staggerContainer}
          >
            {/* Left Column - Items 0 and 2 */}
            <motion.div 
              className="hidden lg:flex flex-col gap-6 space-y-0"
              variants={staggerContainer}
            >
              {[CAPITAL_FEATURES[0], CAPITAL_FEATURES[2]].map((item) => (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
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
                    <h3 className="text-base font-bold uppercase tracking-[0.15em] text-foreground leading-tight">
                      {item.title}
                    </h3>
                    <div className="text-sm leading-relaxed text-muted-foreground">
                      {item.descriptionHtml || item.description}
                    </div>
                    <Link 
                      href="#contact" 
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all duration-200 hover:text-primary/80 hover:gap-3 group/link w-fit"
                    >
                      <span>{item.cta}</span>
                      <span className="text-base transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                    </Link>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              ))}
            </motion.div>

            {/* Center - Image */}
            <motion.div 
              variants={fadeIn}
              className="relative overflow-hidden rounded-2xl border border-primary/35 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:scale-[1.01] w-full aspect-[4/3]"
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
            </motion.div>

            {/* Right Column - Items 1 and 3 */}
            <motion.div 
              className="hidden lg:flex flex-col gap-6 space-y-0"
              variants={staggerContainer}
            >
              {[CAPITAL_FEATURES[1], CAPITAL_FEATURES[3]].map((item) => (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
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
                    <h3 className="text-base font-bold uppercase tracking-[0.15em] text-foreground leading-tight">
                      {item.title}
                    </h3>
                    <div className="text-sm leading-relaxed text-muted-foreground">
                      {item.descriptionHtml || item.description}
                    </div>
                    <Link 
                      href="#contact" 
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all duration-200 hover:text-primary/80 hover:gap-3 group/link w-fit"
                    >
                      <span>{item.cta}</span>
                      <span className="text-base transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                    </Link>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile: Image and feature items */}
          <motion.div 
            className="lg:hidden space-y-8"
            variants={staggerContainer}
          >
            
            {/* Feature items displayed as grid below image */}
            <motion.div 
              className="grid gap-5 grid-cols-1"
              variants={staggerContainer}
            >
            {CAPITAL_FEATURES.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
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
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    {item.descriptionHtml || item.description}
                  </div>
                  
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
              </motion.div>
            ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section ref={programmableRef} id="programmable" className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32 text-foreground">
        <motion.div 
          className="container-main cq grid gap-8 sm:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 lg:grid-cols-2 lg:items-center"
          initial="hidden"
          animate={programmableInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={staggerContainer} className="space-y-8">
            <motion.div variants={fadeInUp} className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">// sdk & automation</span>
              <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Deploy via SDK or API.</h2>
              <p className="text-lg text-muted-foreground">
                TypeScript SDK, REST API, and webhook events enable programmatic deployments and CI/CD integration.
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
                  className="group relative overflow-hidden flex flex-col rounded-2xl border border-primary/25 p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:-translate-y-1 hover:scale-[1.01]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(10, 15, 31, 0.90) 0%, rgba(22, 35, 58, 0.80) 50%, rgba(10, 15, 31, 0.90) 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    {/* <Link href="/docs" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:text-primary/80 hover:gap-3 group/link w-fit">
                      <span>Read docs</span>
                      <span className="text-base transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                    </Link> */}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="group relative overflow-hidden rounded-2xl border border-primary/35 p-8 shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_55px_rgba(59,130,246,0.45)] hover:scale-[1.01]"
            style={{
              background: 'linear-gradient(135deg, rgba(3, 5, 16, 0.98) 0%, rgba(5, 8, 16, 0.95) 50%, rgba(3, 5, 16, 0.98) 100%)',
            }}
          >
            {/* Animated background glow */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/35 via-primary/25 to-primary/15 blur-2xl opacity-40 -z-10 transition-opacity duration-500 group-hover:opacity-55" />
            
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-background/30 z-0" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="media-frame min-h-[240px] sm:min-h-[300px] lg:min-h-[400px]">
                <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 h-full">
                  {/* SDK UI Preview section */}
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <span className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-muted-foreground/90">
                      SDK UI PREVIEW
                    </span>
                  </div>
                  
                  {/* Divider */}
                  <div className="flex items-center gap-3 sm:gap-4 w-full max-w-xs">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <span className="text-muted-foreground/60 text-lg sm:text-xl">/</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  </div>
                  
                  {/* Updating Soon section */}
                  <div className="flex flex-col items-center gap-2">
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
          </motion.div>  
        </motion.div>
      </section>

      <section ref={sdkRef} className="section-divider py-12 sm:py-16 lg:py-24 xl:py-28 2xl:py-32">
        <motion.div 
          className="container-main"
          initial="hidden"
          animate={sdkInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <motion.div 
            className="group relative overflow-hidden rounded-2xl border border-primary/35 p-6 sm:p-8 lg:p-12 text-center shadow-[0_40px_90px_-45px_rgba(59,130,246,0.75)] backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_45px_100px_-45px_rgba(59,130,246,0.85)] hover:scale-[1.01]"
            variants={fadeInUp}
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
          </motion.div>
        </motion.div>
      </section>

      <footer className="border-t border-border/60 py-10 text-sm text-muted-foreground">
        <div className="container-main flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} D2D - Decentralize to deployment.</p>
          <div className="flex items-center gap-6">
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
