import { prisma } from '@/lib/prisma';
import TopNav from '@/components/TopNav';
import Link from 'next/link';
import { ChevronRightIcon, BoltIcon } from '@heroicons/react/24/solid';

// Forces Next.js to pull fresh database changes dynamically on request
export const dynamic = 'force-dynamic';

export default async function ProblemsPage() {
  // Pull challenges straight from our seeded SQLite db file
  const questions = await prisma.question.findMany({
    orderBy: { title: 'asc' },
  });

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <TopNav />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Block */}
        <div className="md:flex md:items-center md:justify-between border-b border-slate-200 pb-6 mb-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-slate-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Select Your Coding Challenge
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Pick one of our built-in structural core patterns to begin the strict 6-step AI
              sandbox evaluation.
            </p>
          </div>
        </div>

        {/* Dashboard Grid Card Engine */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {questions.map((question) => (
            <div
              key={question.id}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div>
                {/* Meta Row: Badge Tag */}
                <div className="flex items-center justify-between gap-x-4">
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/10 ring-inset">
                    {question.difficulty}
                  </span>
                  <BoltIcon className="h-4 w-4 text-slate-300 group-hover:text-amber-500 transition-colors" />
                </div>

                {/* Question Info Title */}
                <div className="mt-4">
                  <h3 className="text-lg font-bold leading-6 text-slate-900 tracking-tight">
                    {question.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-500 line-clamp-3 leading-relaxed">
                    {question.problemStatement.replace(/[`*#]/g, '')}
                  </p>
                </div>
              </div>

              {/* Interaction Routing Button */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <Link
                  href={`/problems/${question.slug}`}
                  className="flex items-center justify-between text-sm font-semibold text-indigo-600 group-hover:text-indigo-500 transition-colors"
                >
                  <span>Launch Interview Sandbox</span>
                  <ChevronRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic State Footnote Information */}
        {questions.length === 0 && (
          <div className="text-center rounded-2xl border-2 border-dashed border-slate-200 p-12 bg-white">
            <p className="text-sm text-slate-500">
              No core questions detected in database configuration.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Please verify your database seeding scripts successfully ran.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
