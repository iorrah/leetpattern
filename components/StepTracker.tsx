'use client';

import React, { useEffect, useState } from 'react';
import { useInterview } from '@/context/InterviewContext';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface StepTrackerProps {
  onReset?: () => void;
}

export default function StepTracker({ onReset }: StepTrackerProps) {
  const context = useInterview() as any;
  const currentStep = context?.currentStep ?? 1;
  const startTime = context?.startTime;

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    if (!startTime || isNaN(Number(startTime))) {
      setElapsedSeconds(0);
      return;
    }

    const calculateTime = () => {
      const now = Date.now();
      const diffInMs = now - Number(startTime);
      setElapsedSeconds(Math.max(0, Math.floor(diffInMs / 1000)));
    };

    calculateTime();
    const intervalId = setInterval(calculateTime, 1000);
    return () => clearInterval(intervalId);
  }, [startTime]);

  const formatTimeDisplay = (totalSeconds: number): string => {
    if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const steps = [
    { id: 1, label: 'Understand', desc: 'Restate core params' },
    { id: 2, label: 'Clarify', desc: 'Ask edge case inputs' },
    { id: 3, label: 'Plan', desc: 'Pseudocode & logic' },
    { id: 4, label: 'Implement', desc: 'Write functional lines' },
    { id: 5, label: 'Test', desc: 'Dry-run manual cases' },
    { id: 6, label: 'Optimize', desc: 'Big-O complexity review' },
  ];

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full text-slate-700 select-none">
      {/* Light Theme Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            SESSION TIMER
          </span>
          <span className="text-2xl font-mono font-bold text-indigo-600 tracking-wider">
            {formatTimeDisplay(elapsedSeconds)}
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <ArrowPathIcon className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`flex items-start gap-4 p-3.5 rounded-xl border transition-all ${
                isActive
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  : isCompleted
                    ? 'bg-emerald-50/50 border-emerald-100'
                    : 'bg-white border-transparent'
              }`}
            >
              <div
                className={`h-6 w-6 rounded-md font-mono text-xs font-bold flex items-center justify-center border ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : isCompleted
                      ? 'bg-emerald-100 border-emerald-200 text-emerald-700'
                      : 'bg-slate-100 border-slate-200 text-slate-400'
                }`}
              >
                {step.id}
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-bold tracking-wide ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}
                >
                  {step.label}
                </div>
                <div className="text-xs text-slate-500 truncate font-medium mt-0.5">
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
