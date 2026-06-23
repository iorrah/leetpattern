'use client';

import React from 'react';

interface ProblemDescriptionProps {
  title: string;
  difficulty: string;
  problemStatement: string;
  constraints: string;
}

export default function ProblemDescription({
  title,
  difficulty,
  problemStatement,
  constraints,
}: ProblemDescriptionProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Title Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            difficulty === 'Easy'
              ? 'bg-emerald-100 text-emerald-700'
              : difficulty === 'Medium'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-rose-100 text-rose-700'
          }`}
        >
          {difficulty}
        </span>
      </div>

      {/* Primary: Description Section */}
      <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-2">Description</h3>
        <div className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
          {problemStatement}
        </div>
      </section>

      {/* Secondary: Constraints Section */}
      <section className="bg-slate-100 p-6 rounded-xl border border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Constraints
        </h3>
        <ul className="space-y-2">
          {constraints
            .split('*')
            .filter(Boolean)
            .map((constraint, i) => (
              <li key={i} className="text-sm font-mono text-slate-600 flex items-start">
                <span className="mr-2 text-slate-400">•</span>
                {constraint.trim()}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
