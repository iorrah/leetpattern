'use client';

import React from 'react';
import type { Question } from '@/types';

interface ProblemDescriptionProps {
  question: Question;
}

export default function ProblemDescription({ question }: ProblemDescriptionProps) {
  const examples = question.examples
    .split('---')
    .map((example) => example.trim())
    .filter(Boolean);

  const constraints = question.constraints
    .split('*')
    .map((constraint) => constraint.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Problem</h1>
      </div>

      {/* Description */}
      <section className="rounded-xl border border-slate-200 bg-white p-8">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-lg font-black text-slate-900">{question.title}</h3>

          <span
            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
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

        <div className="whitespace-pre-line text-base leading-relaxed text-slate-700">
          {question.problemStatement}
        </div>
      </section>

      {/* Examples */}
      <section className="rounded-xl border border-slate-200 bg-white p-8">
        <h3 className="mb-6 text-lg font-black text-slate-900">Examples</h3>

        <div className="space-y-6">
          {examples.map((example, index) => (
            <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="whitespace-pre-line text-sm leading-7 text-slate-700">{example}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Constraints */}
      <section className="rounded-xl border border-slate-200 bg-white p-8">
        <h3 className="mb-4 text-lg font-black text-slate-900">Constraints</h3>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <div className="whitespace-pre-line text-sm leading-7 text-slate-700">
            <ul className="space-y-2">
              {constraints.map((constraint, index) => (
                <li key={index} className="flex items-start text-sm font-mono text-slate-600">
                  - {constraint}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
