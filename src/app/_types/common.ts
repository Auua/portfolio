import { Session } from 'next-auth';
import { ReactNode } from 'react';

export type SessionProps = {
  session: Session | null;
};

type ObjectType = { [k: string]: string };

export type TranslationProps = {
  locale: string;
  t: (key: string, values?: ObjectType) => string;
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
