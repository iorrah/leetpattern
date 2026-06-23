import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. GET Request: Fetches or creates an ongoing interview progress record
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  const questionSlug = searchParams.get('questionSlug');

  if (!sessionId || !questionSlug) {
    return NextResponse.json(
      { error: 'Missing sessionId or questionSlug Parameters' },
      { status: 400 },
    );
  }

  try {
    // Attempt to locate an existing history block for this user and question
    let session = await prisma.interviewSession.findUnique({
      where: { id: sessionId },
    });

    // If no record exists, initialize a brand new empty step-1 slate in SQLite
    if (!session) {
      session = await prisma.interviewSession.create({
        data: {
          id: sessionId,
          questionSlug,
          currentStep: 1,
          history: JSON.stringify([]),
        },
      });
    }

    return NextResponse.json({
      success: true,
      currentStep: session.currentStep,
      history: JSON.parse(session.history),
    });
  } catch (error) {
    console.error('Session Engine Fetch Error:', error);
    return NextResponse.json({ error: 'Database internal processing error' }, { status: 500 });
  }
}

// 2. POST Request: Explicitly Resets a Session back to Step 1
export async function POST(request: Request) {
  try {
    const { sessionId, questionSlug } = await request.json();

    if (!sessionId || !questionSlug) {
      return NextResponse.json(
        { error: 'Missing required initialization options' },
        { status: 400 },
      );
    }

    // Force overwrite or upsert state metrics back to basic values
    const updatedSession = await prisma.interviewSession.upsert({
      where: { id: sessionId },
      update: {
        currentStep: 1,
        history: JSON.stringify([]),
      },
      create: {
        id: sessionId,
        questionSlug,
        currentStep: 1,
        history: JSON.stringify([]),
      },
    });

    return NextResponse.json({
      success: true,
      currentStep: updatedSession.currentStep,
      history: [],
    });
  } catch (error) {
    console.error('Session Engine Reset Error:', error);
    return NextResponse.json({ error: 'Database verification failure' }, { status: 500 });
  }
}
