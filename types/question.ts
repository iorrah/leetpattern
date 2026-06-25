export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface ProblemExample {
  id: string;

  order: number;

  input: string;

  output: string;

  explanation: string;
}

export interface ProblemConstraint {
  id: string;

  order: number;

  content: string;
}

export interface Question {
  id: string;

  title: string;

  slug: string;

  difficulty: Difficulty;

  problemStatement: string;

  initialCode: string;

  constraints: ProblemConstraint[];

  examples: ProblemExample[];
}
