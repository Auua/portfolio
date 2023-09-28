import { Session } from 'next-auth';

export type ErrorProps = {
  error: Error;
  reset: () => void;
};

export type SessionProps = {
  session: Session | null;
};

export type ParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export type EducationProps = {
  major: string
  minor: string
  thesis: string
  gpa: string
};

export type WorkProps = {
  main: string[]
  skills: string[]
};

export type ExtraProps = WorkProps | EducationProps;
