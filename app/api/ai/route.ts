import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { sessionId, questionSlug, currentStep, userInput } = await request.json();

    if (!sessionId || !questionSlug || !currentStep || userInput === undefined) {
      return NextResponse.json(
        { error: 'Missing evaluation criteria data inputs.' },
        { status: 400 },
      );
    }

    // 1. Fetch Question details and historical session logs from SQLite
    const [question, session] = await Promise.all([
      prisma.question.findUnique({ where: { slug: questionSlug } }),
      prisma.interviewSession.findUnique({ where: { id: sessionId } }),
    ]);

    if (!question || !session) {
      return NextResponse.json(
        { error: 'Associated active tracking index targets not found.' },
        { status: 404 },
      );
    }

    const existingHistory = JSON.parse(session.history);

    // 2. Define the strict system prompt framework
    const systemPrompt = `You are the core AI Interview Coach for "LeetPattern". You evaluate software engineers using a strict 6-step problem-solving framework. 
Your goal is to act like a practical, direct, yet supportive technical interviewer. Do not write full code or solve the problem for the user. Highlight minor omissions directly.

Current Step to evaluate: Step ${currentStep}
Problem Statement: ${question.problemStatement}
Problem Constraints: ${question.constraints}

Evaluation criteria per step:
- Step 1 (Understand): Grade accuracy out of 100%. Output explicitly: "### Feedback\\n**Comprehension Score:** X%". Detail if they missed variable details.
- Step 2 (Clarify): Answer their structural questions as an interviewer would based on constraints. 
- Step 3 (Plan): Evaluate their architectural approach or pseudocode strategy. Point out any fundamental flaws.
- Step 4 (Implement): Analyze code syntax, readability, edge-case safety, and basic correctness.
- Step 5 (Test): Evaluate if their manual execution dry-run matches logic outputs.
- Step 6 (Optimize): Score their Big-O Time and Space Complexity estimates. Use standard $O(N)$ notation.`;

    let aiFeedback = '';

    // 3. Request completion payload from your LLM Provider endpoint via standard fetch
    // Replace the URL and Key below with your explicit API endpoints (e.g., OpenAI, Gemini, or an internal cluster)
    if (process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY) {
      try {
        const targetUrl = process.env.OPENAI_API_KEY
          ? 'https://api.openai.com/v1/chat/completions'
          : `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (process.env.OPENAI_API_KEY)
          headers['Authorization'] = `Bearer ${process.env.OPENAI_API_KEY}`;

        const bodyPayload = process.env.OPENAI_API_KEY
          ? {
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `User submitted for Step ${currentStep}: ${userInput}` },
              ],
              temperature: 0.2,
            }
          : {
              contents: [
                {
                  parts: [
                    { text: `${systemPrompt}\n\nUser input for Step ${currentStep}: ${userInput}` },
                  ],
                },
              ],
            };

        const response = await fetch(targetUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(bodyPayload),
        });
        const resData = await response.json();

        aiFeedback = process.env.OPENAI_API_KEY
          ? resData.choices[0].message.content
          : resData.candidates[0].content.parts[0].text;
      } catch (apiError) {
        console.error('Upstream API Connection Error, falling back to mock provider:', apiError);
        aiFeedback = generateMockFeedback(currentStep, userInput);
      }
    } else {
      // Fallback fallback generator to guarantee operational integrity out of the box without keys configured
      aiFeedback = generateMockFeedback(currentStep, userInput);
    }

    // 4. Update the step records and historical array
    const newHistoryEntry = {
      step: currentStep,
      userInput,
      aiFeedback,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [...existingHistory, newHistoryEntry];
    const nextStep = currentStep < 6 ? currentStep + 1 : 6;

    await prisma.interviewSession.update({
      where: { id: sessionId },
      data: {
        currentStep: nextStep,
        history: JSON.stringify(updatedHistory),
      },
    });

    return NextResponse.json({
      success: true,
      nextStep,
      aiFeedback,
    });
  } catch (error) {
    console.error('System Evaluation Brain Error:', error);
    return NextResponse.json({ error: 'Internal AI sandbox evaluation error' }, { status: 500 });
  }
}

// Deterministic mock generation backup ensuring smooth local developer workflows
function generateMockFeedback(step: number, input: string): string {
  if (step === 1) {
    return `### Feedback\n**Comprehension Score:** 90%\n\nYour paraphrase captures the core parameters accurately. You identified the data targets. Ensure you keep performance constraints in mind as we pivot into step 2. Let's move forward!`;
  }
  return `### Feedback\n\nYour inputs for Step ${step} have been processed. Your tactical layout details look solid. Proceeding to the next structural stage of the workspace.`;
}
