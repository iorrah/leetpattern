import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import TopNav from '@/components/TopNav';
import WorkspaceClient from './WorkspaceClient';
import { InterviewProvider } from '@/context/InterviewContext';

interface WorkspacePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ProblemWorkspacePage({ params }: WorkspacePageProps) {
  const { slug } = await params;
  const question = await prisma.question.findUnique({ where: { slug } });

  if (!question) notFound();

  return (
    <InterviewProvider>
      <div className="flex h-screen flex-col bg-slate-50">
        <TopNav />
        {/* Removed max-width constraint to allow full expansion */}
        <main className="flex-1 w-full overflow-hidden">
          <WorkspaceClient question={question} />
        </main>
      </div>
    </InterviewProvider>
  );
}
