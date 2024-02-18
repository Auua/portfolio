'use client';
import Form from '@/app/_components/form/LogoutForm';
import LoadingComponent from '@/app/_components/loading/LoadingComponent';
import { Suspense } from 'react';

export default function LogoutPage() {
  const { header, content } = Form();

  return (
    <main>
      <Suspense fallback={<LoadingComponent />}>
        <h1 id={'main'}>{header}</h1>
        {content}
      </Suspense>
    </main>
  );
}
