'use client';
import Form from '@/app/_components/form/LoginForm';
import LoadingComponent from '@/app/_components/loading/LoadingComponent';
import { Suspense } from 'react';

export default function LoginPage() {
  const { header, content } = Form();

  return (
    <Suspense fallback={<LoadingComponent />}>
      <h1 id={'main'}>{header}</h1>
      {content}
    </Suspense>
  );
}
