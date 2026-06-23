export interface Question {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  problemStatement: string;
  initialCode: string;
  constraints: string;
}

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
