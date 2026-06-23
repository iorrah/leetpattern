'use client';

import React from 'react';

interface ProblemDescriptionProps {
  title: string;
  problemStatement: string;
}

export default function ProblemDescription({ title, problemStatement }: ProblemDescriptionProps) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{title}</h1>
      <div className="prose prose-slate max-w-none text-slate-700">
        <div className="leading-relaxed bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          {problemStatement}
        </div>
      </div>
    </div>
  );
}
