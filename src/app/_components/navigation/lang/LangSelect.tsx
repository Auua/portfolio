'use client';

import { usePathname, useRouter } from '@/i18n';
import { ChangeEvent, ReactNode, useTransition } from 'react';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LangSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <select
      defaultValue={defaultValue}
      disabled={isPending}
      onChange={onSelectChange}
      aria-label={label}
    >
      {children}
    </select>
  );
}
