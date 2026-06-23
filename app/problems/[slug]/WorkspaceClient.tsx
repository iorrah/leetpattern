'use client';

import React, { useState } from 'react';
import { useInterview } from '@/context/InterviewContext';
import StepTracker from '@/components/StepTracker';
import StepGuidance from '@/components/workspace/StepGuidance';
import ProblemDescription from '@/components/workspace/ProblemDescription';
import CodeEditorPanel from '@/components/workspace/CodeEditorPanel';
import ChatPanel from '@/components/workspace/ChatPanel';

interface WorkspaceClientProps {
  question: {
    title: string;
    problemStatement: string;
    initialCode: string;
    slug: string;
  };
}

export default function WorkspaceClient({ question }: WorkspaceClientProps) {
  const context = useInterview() as any;
  const currentStep = context?.currentStep ?? 1;
  const [inputValue, setInputValue] = useState<string>(question.initialCode || '');

  // Define logic for UI switching
  const isDiscoveryPhase = currentStep === 1 || currentStep === 2;

  /**
   * Orchestrates the transition logic.
   * Informs the user that the AI Coach is evaluating their input for progression.
   */
  const handleSendMessage = async (msg: string): Promise<boolean> => {
    try {
      // Logic: Send message to your backend/AI validator
      // The AI evaluates the input and returns { next_step: boolean }
      /* 
      const response = await fetch('/api/interview/validate', {
        method: 'POST',
        body: JSON.stringify({ message: msg, step: currentStep }),
      });
      const { next_step } = await response.json();
      */

      const next_step = true; // Placeholder: Replace with actual API response

      if (next_step) {
        context.advanceStep();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  return (
    <div className="flex h-full w-full bg-white text-slate-900 overflow-hidden">
      {/* Sidebar: Navigation for the 6-step flow */}
      <div className="w-80 flex-shrink-0 border-r border-slate-200">
        <StepTracker onReset={() => context?.resetSession(question.slug)} />
      </div>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Guidance and Problem Details */}
        <div className="flex-1 overflow-y-auto p-8 border-r border-slate-200 bg-slate-50">
          <StepGuidance currentStep={currentStep} />
          <ProblemDescription
            title={question.title}
            difficulty={question.difficulty}
            problemStatement={question.problemStatement}
            constraints={question.constraints}
          />
        </div>

        {/* Right Panel: Conditional Interface */}
        <div className="w-1/2 flex flex-col bg-white">
          {isDiscoveryPhase ? (
            <div className="flex flex-col h-full">
              {/* Informational Header for the user */}
              <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-[10px] text-amber-800 font-medium uppercase tracking-widest text-center">
                The AI Coach will allow you to move to the next step once you have understood the
                problem
              </div>
              <ChatPanel onSendMessage={handleSendMessage} />
            </div>
          ) : (
            <CodeEditorPanel
              value={inputValue}
              onChange={setInputValue}
              onSubmit={() => context?.submitStep(inputValue)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
