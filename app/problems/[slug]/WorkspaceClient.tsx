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
    difficulty: string;
    problemStatement: string;
    constraints: string;
    initialCode: string;
    slug: string;
  };
  sessionId: string; // Ensure this is passed from your page.tsx
}

export default function WorkspaceClient({ question, sessionId }: WorkspaceClientProps) {
  const context = useInterview() as any;
  const currentStep = context?.currentStep ?? 1;
  const [inputValue, setInputValue] = useState<string>(question.initialCode || '');

  const isDiscoveryPhase = currentStep === 1 || currentStep === 2;

  /**
   * Orchestrates the backend API call.
   * Your route.ts already updates the DB step, so we just trigger a refresh.
   */
  const handleSendMessage = async (msg: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          questionSlug: question.slug,
          currentStep,
          userInput: msg,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh session context so the UI reflects the new step from the DB
        context.refreshSession?.();
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
      <div className="w-80 flex-shrink-0 border-r border-slate-200">
        <StepTracker onReset={() => context?.resetSession(question.slug)} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 gap-8 overflow-y-auto p-8 border-r border-slate-200 bg-slate-50">
          <StepGuidance currentStep={currentStep} />
          <ProblemDescription
            title={question.title}
            difficulty={question.difficulty}
            problemStatement={question.problemStatement}
            constraints={question.constraints}
          />
        </div>

        <div className="w-1/2 flex flex-col bg-white">
          {isDiscoveryPhase ? (
            <div className="flex flex-col h-full">
              <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-[10px] text-amber-800 font-medium uppercase tracking-widest text-center">
                AI Coach evaluating input for next-step approval
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
