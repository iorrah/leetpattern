'use client';

import React, { useState } from 'react';
import { useInterview } from '@/context/InterviewContext';
import StepTracker from '@/components/StepTracker';
import StepGuidance from '@/components/workspace/StepGuidance';
import ProblemDescription from '@/components/workspace/ProblemDescription';
import CodeEditorPanel from '@/components/workspace/CodeEditorPanel';

export default function WorkspaceClient({ question }: { question: any }) {
  const context = useInterview() as any;
  const currentStep = context?.currentStep ?? 1;
  const [inputValue, setInputValue] = useState<string>(question.initialCode || '');

  return (
    <div className="flex h-full w-full bg-white text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0 border-r border-slate-200">
        <StepTracker onReset={() => context?.resetSession(question.slug)} />
      </div>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Problem Statement & Guidance */}
        <div className="flex-1 overflow-y-auto p-8 border-r border-slate-200 bg-slate-50">
          <StepGuidance currentStep={currentStep} />
          <ProblemDescription title={question.title} problemStatement={question.problemStatement} />
        </div>

        {/* Right: Monaco Editor */}
        <CodeEditorPanel
          value={inputValue}
          onChange={setInputValue}
          onSubmit={() => context?.submitStep(inputValue)}
        />
      </div>
    </div>
  );
}
