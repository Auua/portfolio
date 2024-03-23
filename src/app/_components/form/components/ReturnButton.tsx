'use client';
import { useRouter } from '@/i18n';
import React from 'react';

const ReturnButton = ({
  buttonType,
  children,
}: {
  buttonType: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const returnBack = () => {
    router.back();
  };

  return (
    <button className={buttonType} onClick={returnBack}>
      {children}
    </button>
  );
};

export default ReturnButton;
