'use client';

import React from 'react';

const STEP_INSTRUCTIONS: Record<
  number,
  { title: string; goal: string; action: string; success: string }
> = {
  1: {
    title: 'Understand (Core Parameter Restatement)',
    goal: 'Prove you have parsed the problem requirements before writing a single line of logic.',
    action:
      'Rewrite the problem in your own words. Identify the input types, expected output types, and core constraints.',
    success:
      "You can clearly state what the edge cases are (e.g., 'The array could be empty,' 'The numbers could be at the maximum bound of 10^4').",
  },
  2: {
    title: 'Clarify (Edge Case/Input Querying)',
    goal: 'Eliminate all ambiguity before committing to a technical approach.',
    action:
      'Ask critical questions about edge cases, data types, and performance boundaries. Challenge assumptions about the input.',
    success:
      'You have defined the boundaries of the problem so that no hidden assumptions can break your implementation.',
  },
  3: {
    title: 'Plan (Pseudocode & Logic)',
    goal: "Define the algorithm's skeleton without worrying about language syntax.",
    action:
      'Write down the step-by-step logic flow. Focus on how data is transformed, sorted, or filtered.',
    success: "You can explain the 'Happy Path' and the 'Error Path' without looking at code.",
  },
  4: {
    title: 'Implement (Functional Lines)',
    goal: 'Translate your refined plan into syntactically correct, clean code.',
    action: 'Write the actual solution. Focus on readability, variable naming, and modularity.',
    success:
      'The code compiles, follows your planned logic, and handles the scenarios identified in the Understand phase.',
  },
  5: {
    title: 'Test (Dry-Run Manual Cases)',
    goal: 'Verify your logic using mental execution before letting the machine run it.',
    action:
      'Pick 2-3 specific inputs. Walk through your code line-by-line, tracking variable states on paper.',
    success: 'You have verified that your logic processes standard and edge cases correctly.',
  },
  6: {
    title: 'Optimize (Big-O Complexity Review)',
    goal: 'Refine your solution for production-grade performance.',
    action:
      'Identify the Time and Space complexity. Determine if data structures can be used to improve performance.',
    success:
      'You can justify your approach by explaining the trade-offs between time, space, and maintainability.',
  },
};

export default function StepGuidance({ currentStep }: { currentStep: number }) {
  const step = STEP_INSTRUCTIONS[currentStep];

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-extrabold text-slate-900">Current Step</h1>

      <section className="bg-white p-8 rounded-xl border border-slate-200">
        <h3 className="text-lg font-black text-slate-900 mb-2">{step.title}</h3>
        <div className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-bold">Goal:</span> {step.goal}
            </p>
            <p>
              <span className="font-bold">Action:</span> {step.action}
            </p>
            <p>
              <span className="font-bold">Success Indicator:</span> {step.success}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
