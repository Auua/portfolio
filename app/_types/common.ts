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
