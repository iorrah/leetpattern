'use client';

import React, { createContext, useContext, useState } from 'react';

interface LogEntry {
  step: number;
  userInput: string;
  aiFeedback: string;
}

interface InterviewContextType {
  currentStep: number;
  history: LogEntry[];
  isLoading: boolean;
  startTime: number; // 💡 Added explicitly to fix NaN runtime timer math errors
  initializeSession: (slug: string) => void;
  submitStep: (input: string) => Promise<void>;
  resetSession: (slug: string) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

const currentTime = Date.now();

export function InterviewProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setStep] = useState<number>(1);
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(currentTime);

  const initializeSession = (slug: string) => {
    console.log('⚙️ [CONTEXT WORK] initializeSession requested for question slug:', slug);
    if (typeof window !== 'undefined') {
      const savedStep = localStorage.getItem(`interview_step_${slug}`);
      const savedTime = localStorage.getItem(`interview_time_${slug}`);

      if (savedStep) {
        const parsedStep = Number(savedStep);
        console.log(`⚙️ [CONTEXT WORK] Found cached step index: ${parsedStep}`);
        setStep(isNaN(parsedStep) ? 1 : parsedStep);
      }

      if (savedTime) {
        const parsedTime = Number(savedTime);
        console.log(`⚙️ [CONTEXT WORK] Found cached tracking timestamp: ${parsedTime}`);
        setStartTime(isNaN(parsedTime) ? Date.now() : parsedTime);
      } else {
        const now = Date.now();
        localStorage.setItem(`interview_time_${slug}`, String(now));
        setStartTime(now);
      }
    }
  };

  const submitStep = async (input: string) => {
    console.log(
      `⚙️ [CONTEXT WORK] submitStep received data payload entry for step: ${currentStep}`,
    );
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setHistory((prev) => [
        ...prev,
        {
          step: currentStep,
          userInput: input,
          aiFeedback: 'System Trace: Input verified successfully.',
        },
      ]);

      const nextStep = currentStep + 1;
      setStep(nextStep);
    } catch (e) {
      console.error(
        '⚙️ [CONTEXT WORK] Critical tracking failure during data submission execution:',
        e,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = (slug: string) => {
    console.log('⚙️ [CONTEXT WORK] Reset request received. Purging local storage session keys.');
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`interview_step_${slug}`);
      localStorage.removeItem(`interview_time_${slug}`);
    }
    setStep(1);
    setHistory([]);
    setStartTime(Date.now());
  };

  return (
    <InterviewContext.Provider
      value={{
        currentStep,
        history,
        isLoading,
        startTime, // 💡 Exposed down to StepTracker to resolve layout timer issues
        initializeSession,
        submitStep,
        resetSession,
        setStep,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  return context;
}
