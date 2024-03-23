'use client';

import form from '@/app/_components/form/LogoutForm';
import { Modal } from '@/app/_components/modal/Modal';

export default function LogoutFormModal() {
  return <Modal {...form()} />;
}
