import TopNav from '@/components/TopNav';
import Link from 'next/link';
import {
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  ArrowPathIcon,
  ClockIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <TopNav />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 ring-1 ring-indigo-600/10 ring-inset">
              Open Access MVP
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              AI-Powered Interview Prep That Thinks Like a FAANG Engineer
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Master technical interviews with a guided, six-step problem-solving system. No
              waitlists. No infinite question banks. Just focused, real-time feedback that trains
              you to understand patterns, not memorize answers.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <Link
                href="/problems"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
              >
                Start Practicing Free →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Legacy Platforms Are Broken Section */}
        <section className="bg-white py-20 sm:py-28 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">The Problem</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Why Technical Interview Prep is Broken
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                <div className="flex flex-col bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <dt className="text-lg font-bold leading-7 text-slate-900">
                    ❌ The LeetCode Trap
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">
                      Candidates waste hundreds of hours trying to memorize specific question
                      algorithms instead of developing an architectural foundation for unexpected
                      problems.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                  <dt className="text-lg font-bold leading-7 text-indigo-600">
                    🎯 Our Pattern Solution
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">
                      Our structured 6-step framework instills core analytical workflows
                      (understanding, clarifying, planning, optimizing) that let you navigate any
                      question confidently during real live technical screens.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Engineered Framework
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                A Complete System for Algorithmic Mastery
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Guided 6-Step Workflow
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-600">
                    Structured system pushing you through Understanding, Clarification, Planning,
                    Implementation, Testing, and Optimization.
                  </dd>
                </div>

                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Interactive Clarification
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-600">
                    Simulate real conversation dynamics. Force yourself to explore scale limits and
                    edge inputs before writing functional lines.
                  </dd>
                </div>

                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <CpuChipIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Complexity Analysis
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-600">
                    Receive precise architectural breakdown evaluations detailing the programmatic
                    efficiency of your Big-O evaluations.
                  </dd>
                </div>

                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <ArrowPathIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Real-Time AI Feedback
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-600">
                    Receive exact correction parameters detailing any comprehension errors or design
                    omissions immediately upon step completion.
                  </dd>
                </div>

                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <ClockIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Timed Practice Sessions
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-600">
                    Track task pacing speeds relative to a central clock layer monitoring your
                    velocity across individual technical tiers.
                  </dd>
                </div>

                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-slate-900">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <DocumentChartBarIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    Performance Insights
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-600">
                    Compile explicit structural execution reports offering concrete vectors
                    regarding where to refine articulation workflows.
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-slate-500">
              &copy; {new Date().getFullYear()} LeetPattern. Built for production engineers.
              Open-source structure framework layout.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
