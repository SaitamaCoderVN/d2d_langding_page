import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 md:py-12 bg-white text-sm text-gray-500">
      <div className="container-main flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <p className="font-semibold text-gray-900 text-base md:text-sm">D2D Protocol</p>
          <p>© {new Date().getFullYear()} Decentralize to deployment.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href="https://twitter.com/d2d_hq" className="hover:text-blue-600 transition-colors font-medium" target="_blank">
            Twitter
          </Link>
          <Link href="https://t.me/d2d_hq" className="hover:text-blue-600 transition-colors font-medium" target="_blank">
            Telegram
          </Link>
          <Link href="mailto:coderhopham@gmail.com" className="hover:text-blue-600 transition-colors font-medium">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
