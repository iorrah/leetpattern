'use client';

import React, { useState } from 'react';
import { useInterview } from '@/context/InterviewContext';
import StepTracker from '@/components/StepTracker';
import StepGuidance from '@/components/workspace/StepGuidance';
import ProblemDescription from '@/components/workspace/ProblemDescription';
import CodeEditorPanel from '@/components/workspace/CodeEditorPanel';
import ChatPanel from '@/components/workspace/ChatPanel';
import type { Question } from '@/types';

interface WorkspaceClientProps {
  question: Question;
}

export default function WorkspaceClient({ question }: WorkspaceClientProps) {
  const context = useInterview();

  const currentStep = context?.currentStep ?? 1;

  const [inputValue, setInputValue] = useState(question.initialCode);

  const isDiscoveryPhase = currentStep === 1 || currentStep === 2;

  const handleSendMessage = async (message: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          currentStep,
          userInput: message,
        }),
      });

      if (!response.ok) {
        return 'Something went wrong.';
      }

      const data = await response.json();

      return data.reply ?? 'No response.';
    } catch (error) {
      console.error(error);
      return 'Something went wrong.';
    }
  };

  const handleContinue = () => {
    context?.setStep((step) => Math.min(step + 1, 6));
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white text-slate-900">
      <div className="w-80 flex-shrink-0 border-r border-slate-200">
        <StepTracker onReset={() => context?.resetSession(question.slug)} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto border-r border-slate-200 bg-slate-50 p-8">
          <StepGuidance currentStep={currentStep} />
          <ProblemDescription question={question} />
        </div>

        <div className="flex w-1/2 flex-col bg-white">
          {isDiscoveryPhase ? (
            <>
              <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-[10px] font-medium uppercase tracking-widest text-amber-800">
                AI Coach
              </div>

              <ChatPanel onSendMessage={handleSendMessage} onContinue={handleContinue} />
            </>
          ) : (
            <CodeEditorPanel
              value={inputValue}
              onChange={(value) => setInputValue(value || '')}
              onSubmit={() => context?.submitStep(inputValue)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
