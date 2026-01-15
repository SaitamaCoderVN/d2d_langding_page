import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 bg-white text-sm text-gray-500">
      <div className="container-main flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-semibold text-gray-900">D2D Protocol</p>
          <p>© {new Date().getFullYear()} Decentralize to deployment.</p>
        </div>
        <div className="flex items-center gap-8">
          <Link href="https://twitter.com/d2d_hq" className="hover:text-blue-600 transition-colors" target="_blank">
            Twitter
          </Link>
          <Link href="https://t.me/d2d_hq" className="hover:text-blue-600 transition-colors" target="_blank">
            Telegram
          </Link>
          <Link href="mailto:coderhopham@gmail.com" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
