export type { Difficulty, Question } from './question';

export interface StepHistory {
  step: number;
  userInput: string;
  aiFeedback: string;
  timestamp: string;
}

export interface InterviewSession {
  id: string;
  questionSlug: string;
  currentStep: number;
  history: StepHistory[];
  createdAt: string;
  updatedAt: string;
}
