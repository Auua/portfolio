'use client';

import form from '@/app/_components/form/LoginForm';
import { Modal } from '@/app/_components/modal/Modal';

export default function ContactFormModal() {
  return <Modal {...form()} />;
}
