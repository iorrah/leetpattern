'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CommandLineIcon } from '@heroicons/react/24/solid';

export default function TopNav() {
  const pathname = usePathname();
  const isProblemPage = pathname.includes('/problems');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      {/* Expanded container to match the full width of the workspace */}
      <div className="flex h-16 w-full items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <CommandLineIcon className="h-6 w-6 text-indigo-600" />
          <span>
            Leet<span className="text-indigo-600">Pattern</span>
          </span>
        </Link>

        {!isProblemPage && (
          <Link
            href="/problems"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Start Now
          </Link>
        )}
      </div>
    </header>
  );
}
