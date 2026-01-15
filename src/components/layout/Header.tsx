'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="header-sticky">
      <div className="container-main">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
             <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <Image 
                    className="object-contain" 
                    src="/favicon.svg" 
                    alt="D2D logo" 
                    fill
                    priority 
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">D2D</h1>
                </div>
             </Link>
          </div>
          
          <nav className="hidden items-center space-x-8 text-sm font-medium text-gray-600 md:flex">
            {/* Dropdown 1: Resources */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2">
                Resources
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 4.5 3 3 3-3"/></svg>
              </button>
              {/* Invisible bridge */}
              <div className="absolute left-0 top-full w-full h-[5px]" />
              <div className={`absolute left-0 top-full min-w-[180px] pt-[5px] z-30 transition-all duration-200 ${activeDropdown === 'resources' ? 'opacity-100 visible pointer-events-auto transform translate-y-0' : 'opacity-0 invisible pointer-events-none transform -translate-y-2'}`}>
                <div className="bg-white border border-gray-100 shadow-xl rounded-lg py-1 overflow-hidden">
                  <Link href="" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-blue-600">
                    Whitepaper
                  </Link>
                  <Link href="/blog" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-blue-600">
                    Blog
                  </Link>
                  <Link href="" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-blue-600">
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
              <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2">
                Network
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 4.5 3 3 3-3"/></svg>
              </button>
              {/* Invisible bridge */}
              <div className="absolute left-0 top-full w-full h-[5px]" />
              <div className={`absolute left-0 top-full min-w-[180px] pt-[5px] z-30 transition-all duration-200 ${activeDropdown === 'network' ? 'opacity-100 visible pointer-events-auto transform translate-y-0' : 'opacity-0 invisible pointer-events-none transform -translate-y-2'}`}>
                <div className="bg-white border border-gray-100 shadow-xl rounded-lg py-1 overflow-hidden">
                  <a href="https://github.com/D2dProtocol" target="_blank" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-blue-600">
                    Contributors
                  </a>
                  <a href="https://t.me/d2d_hq" target="_blank" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-blue-600">
                    Telegram
                  </a>
                  <a href="https://x.com/d2d_hq" target="_blank" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-blue-600">
                    X (Twitter)
                  </a>
                </div>
              </div>
            </div>
            
            <a
              href="https://www.app.deployd2d.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2 px-4 text-xs"
            >
              Launch App
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
