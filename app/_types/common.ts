import { Prisma } from '@prisma/client';
import { Session } from 'next-auth';
import { getFullPage } from '../_lib/pages';

export type ErrorProps = {
  error: Error;
  reset: () => void;
};

export type SessionProps = {
  session: Session | null;
};

export type ParamProps = {
  params?: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type FullPageProps = Prisma.PromiseReturnType<typeof getFullPage>;

export type ProjectProps = Prisma.ProjectGetPayload<{
  include: { page: false };
}>;

export type SectionProps = Prisma.SectionGetPayload<{
  include: { skills: true; timeline: true; others: true };
}>;
