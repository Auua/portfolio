'use client';

import formAction from '@/actions/formActions';
import { useTranslations } from 'next-intl';
import { BsEnvelopeArrowUp } from 'react-icons/bs';
import { SubmitButton } from './components/SubmitButton';
import Form from './components/ActionForm';
import { ContactFormData } from '@/app/_types/form';

export default function ContactForm() {
  const t = useTranslations('Footer.form');

  const fields = {
    name: { required: true, autoComplete: 'name', type: 'text' },
    email: { required: true, autoComplete: 'email', type: 'email' },
    company: { required: true, autoComplete: 'organization', type: 'text' },
    message: { required: true, autoComplete: 'none', type: 'textarea' },
  };

  const id = 'contactForm';

  const header = t('title');
  const buttons = [
    <SubmitButton formId={id} key={'submit'}>
      <BsEnvelopeArrowUp /> {t('submit')}
    </SubmitButton>,
  ];
  const form = (
    <Form<ContactFormData>
      t={t}
      action={formAction}
      fields={fields}
      id={id}
      buttons={buttons}
    />
  );

  return {
    header,
    content: form,
    isForm: true,
  };
}
