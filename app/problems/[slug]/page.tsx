import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import TopNav from '@/components/TopNav';
import WorkspaceClient from './WorkspaceClient';
import { InterviewProvider } from '@/context/InterviewContext';

interface WorkspacePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function ProblemWorkspacePage({ params }: WorkspacePageProps) {
  const resolvedParams = await params;

  // Fetch specific question details matching the routing parameters
  const question = await prisma.question.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!question) {
    notFound();
  }

  return (
    <InterviewProvider>
      <div className="flex h-full min-h-screen flex-col bg-slate-50 overflow-hidden">
        <TopNav />

        {/* Pass down database records into client state engine container */}
        <WorkspaceClient question={question} />
      </div>
    </InterviewProvider>
  );
}
