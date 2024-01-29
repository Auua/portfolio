import { Session } from 'next-auth';
import { ReactNode } from 'react';

export type SessionProps = {
  session: Session | null;
};

export type TranslationProps = {
  locale: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
};

export type SessionAndTranslationsProps = SessionProps & TranslationProps;

export type ParamProps = {
  params?: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type LocaleParamProps = {
  children?: ReactNode;
  params: { locale: string };
};

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
