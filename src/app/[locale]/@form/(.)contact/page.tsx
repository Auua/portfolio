'use client';

import form from '@/app/_components/form/ContactForm';
import { Modal } from '@/app/_components/modal/Modal';

export default function ContactFormModal() {
  return <Modal {...form()} />;
}
