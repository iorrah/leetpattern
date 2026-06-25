export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface ProblemExample {
  input: string;
  output: string;
  explanation: string;
}

export interface Question {
  id: string;

  title: string;

  slug: string;

  difficulty: Difficulty;

  problemStatement: string;

  /**
   * Temporary string representation.
   *
   * In the next step we'll migrate this to a structured array.
   */
  constraints: string;

  /**
   * Temporary placeholder.
   *
   * In the next step this will become structured data
   * coming directly from Prisma.
   */
  examples?: ProblemExample[];

  initialCode: string;
}
