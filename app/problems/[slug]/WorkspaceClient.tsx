'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useInterview } from '@/context/InterviewContext';
import StepTracker from '@/components/StepTracker';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

export default function WorkspaceClient({ question }: { question: any }) {
  const context = useInterview() as any;
  const [inputValue, setInputValue] = useState<string>(question.initialCode || '');

  return (
    <div className="flex h-full w-full bg-white text-slate-900 overflow-hidden">
      {/* Sidebar - Stays on the far left */}
      <div className="w-80 flex-shrink-0 border-r border-slate-200">
        <StepTracker onReset={() => context?.resetSession(question.slug)} />
      </div>

      {/* 
         LAYOUT SWAP:
         We now use a horizontal flex container. 
         Left: Problem Statement (flex-1)
         Right: Monaco Editor (flex-1)
      */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Problem Statement */}
        <div className="flex-1 overflow-y-auto p-8 border-r border-slate-200 bg-slate-50">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">{question.title}</h1>
          <div className="prose prose-slate max-w-none text-slate-700">
            <div className="leading-relaxed bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              {question.problemStatement}
            </div>
          </div>
        </div>

        {/* Right: Monaco Editor */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="px-6 py-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Console Input Editor
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              theme="light"
              language="javascript"
              value={inputValue}
              onChange={(value) => setInputValue(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
          <div className="p-4 border-t border-slate-200 flex justify-end bg-white">
            <button
              onClick={() => context?.submitStep(inputValue)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-500 transition-colors shadow-sm"
            >
              Submit Answer <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
