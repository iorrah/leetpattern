export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  problemStatement: string;
  constraints: string;
  examples: string;
  initialCode: string;
}
