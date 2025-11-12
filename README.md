# D2D Documentation Site

Professional landing page and documentation for the D2D (Decentralized Deployment) platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev

# Open http://localhost:3002
```

## 📁 Project Structure

```
docs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── globals.css         # Global styles
│   │   └── docs/
│   │       └── page.tsx        # Documentation page
│   └── components/
│       └── (none)              # Shared UI components
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Features

### Landing Page (`/`)

- **Hero**: “Deploy your Solana program from Devnet to Mainnet — for just $5/month”
- **Key Metrics**: Subscription price, rent coverage, deploy time, ownership proof
- **Problem & Flow**: Highlights $1k rent issue and the 5-step D2D deployment loop
- **Capital Efficiency**: Rent sponsorship, accounting, and 2–5% vault yield policy
- **Reliability & Monitoring**: Verification, explorer-linked ownership, Helius-powered health checks
- **Architecture**: React + Vite front-end, Supabase backend, Solana rent vault integrations
- **SDK & Automation**: TypeScript SDK, REST API, webhook snippet placeholder
- **Economic Model & CTA**: $5/month pricing, vault mechanics, contact links, “Deploy now” CTA

### Documentation Page (`/docs`)

Complete technical documentation with 8 main sections:

1. **Introduction**: Platform overview and key features
2. **Solution**: Detailed 4-step deployment flow with code examples
3. **Program Deployment**: Step-by-step guide for developers
4. **Dump Process**: Technical details of program extraction
5. **Backer Profits**: Revenue model and earning calculations
6. **LP Token Mechanism**: Early bird bonuses and yield farming
7. **Profit Calculations**: Mathematical formulas and real examples
8. **FAQ**: Frequently asked questions

## 🖼️ Image Placeholders

- Hero/feature visuals currently use descriptive placeholders (e.g., “Deployment Capsule” card)
- Replace with production assets when ready (e.g., `@image-programmable.png`, dashboard screenshots)
- Logo uses `public/favicon.svg`

## 🎨 Design System

### Colors

- **Background**: `#020617` (Slate 950)
- **Primary Accent**: `#22d3ee` → `#2563eb` gradient (Cyan to Blue)
- **Secondary Accent**: `#a855f7` (Purple)
- **Text**: `#f8fafc` (Slate 100)
- **Muted Text**: `#94a3b8` (Slate 400)

### Components

- `AnimatedButton` – gradient neon CTA with text-scramble hover animation (variants: `default`, `outline`, `ghost`)
- `Button` – base ShadCN-style button primitive used by `AnimatedButton`
- `card` – glassmorphism dark card surface
- `input-field` – dark input with cyan focus state
- `container-main` – max-width container helper
- `section-header` – uppercase display heading
- `section-subtitle` – supporting copy in muted tone

## 📊 Key Metrics

- **Subscription**: $5 per program per month
- **Rent Sponsored**: Up to ~$1,000 (depends on program size)
- **Deployment Time**: < 2 minutes (wallet + verification + push)
- **Ownership**: Verified mainnet transaction + upgrade authority details

## 🧾 Economic Model

- **Subscription**: $5 per program per month (cancel anytime)
- **Rent Sponsorship**: Shared vault covers the initial rent reserve (up to ~$1k per program, depending on binary size)
- **Revenue Allocation**: 70% of fees refuel rent vaults, 30% maintain infrastructure and ecosystem rewards
- **Yield Policy**: Idle vault reserves target 2–5% APY through low-volatility Solana-native strategies (validator delegation, liquid staking)
- **Roadmap**: $D2D credits for hackathon teams and DAO governance for sponsorship approvals

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

Server runs on `http://localhost:3002`

### Build for Production

```bash
npm run build
npm start
```

## 📱 Routes

- `/` – Landing experience with hero, capital efficiency, security, and programmable money sections
- `/docs` – Full documentation with 8 sections

## 🌐 Navigation

Both pages have a consistent header with navigation:

- **Home**: Landing page
- **Docs**: Documentation page

## ✨ Key Features

- ✅ Dark-mode immersive hero
- ✅ Gradient-powered CTA banners
- ✅ Glassmorphism metric highlights
- ✅ Modular sections for capital, security, and programmable money narratives
- ✅ Responsive layout with Tailwind CSS utilities

## 🚀 Live App

- Production dApp: https://www.app.deployd2d.xyz/
- Landing page CTA opens the app in a new tab
- No more countdown or email collection—the product is live

## 🔗 External Links

- Twitter/X: https://twitter.com/d2d_hq
- Telegram: https://t.me/d2d_hq
- Email: team@d2d.so

## 📄 License

Same as D2D main project.

---

Built with Next.js 14, TypeScript, and Tailwind CSS.

