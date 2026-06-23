'use client';

import React, { useEffect, useState } from 'react';
import { useInterview } from '@/context/InterviewContext';
import StepTracker from '@/components/StepTracker';
import { Question } from '@/types';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface WorkspaceClientProps {
  question: Question;
}

export default function WorkspaceClient({ question }: WorkspaceClientProps) {
  const context = useInterview() as any;

  // 🔬 CRITICAL STATE DIAGNOSTIC LOGGING
  console.log('📊 [DIAGNOSTIC MATRIX] WorkspaceClient Render Cycle State Snapshot:', {
    slug: question?.slug,
    currentStepFromContext: context?.currentStep,
    isLoading: context?.isLoading,
    historyLength: context?.history?.length,
    hasInitializeMethod: !!context?.initializeSession,
    hasSubmitMethod: !!context?.submitStep,
    hasSetStepMethod: !!context?.setStep,
  });

  const currentStep = context?.currentStep ?? 1;
  const history = context?.history ?? [];
  const isLoading = context?.isLoading ?? false;
  const initializeSession = context?.initializeSession;
  const submitStep = context?.submitStep;
  const resetSession = context?.resetSession;
  const setStep = context?.setStep;

  const [inputValue, setInputValue] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    console.log('🚨 [DOM MOUNT] WorkspaceClient mounted successfully.');
    setIsMounted(true);
    if (initializeSession) {
      console.log('⚡ [INIT] Triggering session initialization context hook.');
      initializeSession(question.slug);
    }
  }, [question.slug]);

  useEffect(() => {
    console.log(`📈 [STEP WATCHER] Visual Workflow Step updated to: ${currentStep}`);
    if (currentStep === 4 && !inputValue) {
      setInputValue(question.initialCode || '');
    }
  }, [currentStep, question.initialCode]);

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📬 [EVENT] Submit Answer form button triggered. Input length:', inputValue.length);
    if (!inputValue.trim() || isLoading) return;

    try {
      setStatusMessage('Sending response to AI coach...');
      if (submitStep) {
        await submitStep(inputValue);
        setInputValue('');
        setStatusMessage('Feedback added successfully!');
      }
    } catch (err) {
      console.error('❌ [SUBMIT EXCEPTION]', err);
      setStatusMessage('Submission error.');
    }
  };

  if (!isMounted) {
    return (
      <div className="p-12 bg-slate-950 text-emerald-400 font-mono h-screen flex items-center justify-center">
        <div>INITIALIZING COMPONENT CORE...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden relative">
      {/* Absolute Emergency Action Flag Button */}
      <button
        type="button"
        onClick={() => {
          console.log('💥 [OVERRIDE CLICK] Emergency trigger initiated.');
          if (setStep) setStep(currentStep + 1);
        }}
        className="absolute top-4 right-4 z-[99999] bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-bold py-2 px-4 rounded-xl shadow-2xl cursor-pointer"
      >
        🔴 FORCE NEXT STEP
      </button>

      <StepTracker
        onReset={() => {
          console.log('🛡️ [RESET CLICK] Session clear instruction issued.');
          if (resetSession) resetSession(question.slug);
        }}
      />

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto border-r border-slate-200 bg-white p-8">
          <div className="prose max-w-none">
            <h1 className="text-2xl font-extrabold text-slate-900 border-b pb-3 mb-4">
              {question.title}
            </h1>

            {/* Step Selection Controller Panel */}
            <div className="my-6 p-5 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-xs text-emerald-400">
              <div className="mb-2 text-slate-400 font-bold uppercase tracking-wider">
                🔬 Active Step Override Panel
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      console.log(
                        `🎛️ [MATRIX DISPATCH] User clicked target step selector: S${num}`,
                      );
                      if (setStep) setStep(num);
                    }}
                    className={`h-8 w-10 text-xs font-bold rounded-lg cursor-pointer transition-all border ${
                      currentStep === num
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    S{num}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase text-slate-400 mt-6">Problem Statement</h3>
            <p className="whitespace-pre-wrap text-slate-700 mt-2 bg-slate-50 p-4 rounded-xl">
              {question.problemStatement}
            </p>

            <h3 className="text-sm font-bold uppercase text-slate-400 mt-6">Constraints</h3>
            <div className="whitespace-pre-wrap text-sm text-slate-600 mt-2 bg-indigo-50/30 p-4 rounded-xl font-mono">
              {question.constraints}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
          <form
            onSubmit={handleFormSubmission}
            className="flex-1 flex flex-col p-6 overflow-hidden"
          >
            <div className="flex-1 relative mb-4">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type testing values here..."
                className="w-full h-full bg-slate-950 text-slate-100 font-mono text-sm p-5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">
                {statusMessage || 'Pipeline connected.'}
              </span>
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm cursor-pointer"
              >
                Submit Answer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
