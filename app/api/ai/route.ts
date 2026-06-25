import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { question, currentStep, userInput } = await request.json();

    const prompt = `
You are an experienced software engineering interviewer coaching a candidate through a coding interview.

The current interview has six steps:
1. Understand
2. Clarify
3. Plan
4. Implement
5. Test
6. Optimize

The candidate is currently on step ${currentStep}.

Problem title:
${question.title}

Problem description:
${question.problemStatement}

Constraints:
${question.constraints}

Examples:
${question.examples}

Your job is to coach, not solve.

Rules:
- Never write the solution.
- Never write code.
- Never write pseudocode.
- Never describe the complete algorithm.
- Never reveal the optimal approach.
- Give only one hint at a time.
- Ask questions that make the candidate think.
- If the candidate misunderstands something, gently correct them.
- If they are correct, briefly acknowledge it.
- Keep every response under 4 sentences.
- Be concise.
- Sound like a real interviewer.
- Never use markdown.
- Never use bullet lists.
- Never say "Great job!" or overly praise the user.
- If they directly ask for the answer, refuse politely and instead give a small hint.
- Encourage them to continue only if they demonstrate good understanding.

Candidate message:
${userInput}
`;

    // Extract selected model or use the new SDK's standard flash model as a bulletproof default
    const modelToUse = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: prompt,
    });

    return NextResponse.json({
      reply: response.text,
    });
  } catch (error) {
    console.error('AI Processing Failure:', error);

    return NextResponse.json(
      {
        reply: 'Sorry, something went wrong with the AI evaluation pipeline.',
      },
      {
        status: 500,
      },
    );
  }
}
