import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'LeetPattern | 6-Step DSA Mastery',
  description: 'Train your brain to think like a FAANG engineer with algorithmic workflow cycles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900 h-full`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
