'use client';
import Form from '@/app/_components/form/ContactForm';
import LoadingComponent from '@/app/_components/loading/LoadingComponent';
import { Suspense } from 'react';

export default function ContactPage() {
  const { header, content } = Form();

  return (
    <Suspense fallback={<LoadingComponent />}>
      <h1 id={'main'}>{header}</h1>
      {content}
    </Suspense>
  );
}
