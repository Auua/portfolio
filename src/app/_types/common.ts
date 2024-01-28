import { Session } from 'next-auth';
import { ReactNode } from 'react';

export type SessionProps = {
  session: Session | null;
};

export type ParamProps = {
  params?: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type LocaleParamProps = {
  children?: ReactNode;
  params: { locale: string };
};
