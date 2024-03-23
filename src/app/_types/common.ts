import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { SUPPORTED_LANGUAGES } from '../../../i18n';

export type SupportedLocale = (typeof SUPPORTED_LANGUAGES)[number];

export type SessionProps = {
  session: Session | null;
};

type ObjectType = { [k: string]: string };

export type TranslatorProps = {
  t: (key: string, values?: ObjectType) => string;
};

export type TranslationProps = TranslatorProps & {
  locale: string;
};

export type SessionAndTranslationsProps = SessionProps & TranslationProps;

export type PageParamProps = {
  params: { id?: string; locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type LayoutParamProps = PageParamProps & {
  children?: ReactNode;
  form?: ReactNode;
  tabs?: ReactNode;
  home?: ReactNode;
};

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
