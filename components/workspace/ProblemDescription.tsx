'use client';

import React from 'react';
import type { Question } from '@/types';

interface ProblemDescriptionProps {
  question: Question;
}

export default function ProblemDescription({ question }: ProblemDescriptionProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Title Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Problem</h1>
      </div>

      {/* Primary: Description Section */}
      <section className="bg-white p-8 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-black text-slate-900">{question.title}</h3>

          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              question.difficulty === 'Easy'
                ? 'bg-emerald-100 text-emerald-700'
                : question.difficulty === 'Medium'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-rose-100 text-rose-700'
            }`}
          >
            {question.difficulty}
          </span>
        </div>

        <div className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
          {question.problemStatement}
        </div>
      </section>

      {/* Secondary: Constraints Section */}
      <section className="bg-white p-8 rounded-xl border border-slate-200">
        <h3 className="text-lg font-black text-slate-900 mb-4">Constraints</h3>

        <ul className="space-y-2">
          {question.constraints
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
