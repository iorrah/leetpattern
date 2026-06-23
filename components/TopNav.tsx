'use client';

import Link from 'next/link';
import { CommandLineIcon } from '@heroicons/react/24/solid';

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-slate-900 tracking-tight"
        >
          <CommandLineIcon className="h-6 w-6 text-indigo-600" />
          <span>
            Leet<span className="text-indigo-600">Pattern</span>
          </span>
        </Link>

        {/* Right Side: Primary Call To Action */}
        <Link
          href="/problems"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 transition-colors duration-200"
        >
          Start Now
        </Link>
      </div>
    </header>
  );
}
