'use client';

import '@/app/_styles/form.css';

import { Dispatch, SetStateAction, useState } from 'react';
import {
  ErrorNotification,
  SuccessNotification,
} from '@/app/_components/common/Notification';
import sendForm from '@/app/_actions/formActions';
import { z } from 'zod';
import FormDataSchema from '@/app/_lib/FormDataSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const closeNotification = (setter: Dispatch<SetStateAction<boolean>>) => {
  setter(false);
};

type Inputs = z.infer<typeof FormDataSchema>;

const ContactForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const result = await sendForm(data);

    if (!result || result.error) {
      setError(true);
      setSuccess(false);
      return;
    }

    reset();
    setLoading(false);
    setSuccess(true);
    setError(false);
  };

  return (
    <div className={'contact-form'}>
      {success && (
        <SuccessNotification
          title={'Thank you!'}
          message={
            "Awesome! Your message has successfully blasted off into cyberspace, and it's currently zooming its way straight to my inbox. " +
            "Thanks for reaching out and I'll get back to you as soon as I can!"
          }
          close={() => closeNotification(setSuccess)}
        />
      )}
      {error && (
        <ErrorNotification
          title={'Sorry, something is failing...'}
          message={
            'Oops, it looks like something went wrong and your message was unable to be sent. ' +
            'Please try again later, or if the problem persists, feel free to contact me through LinkedIn. ' +
            'I apologize for the inconvenience and appreciate your understanding.'
          }
          close={() => closeNotification(setError)}
        />
      )}
      <form onSubmit={handleSubmit(processForm)}>
        <label htmlFor={'name'}>Name</label>
        <input
          type={'text'}
          id={'name'}
          placeholder={'Enter Your Name'}
          className={'input-field'}
          {...register('name')}
        />
        {errors.name && <p className={'form-alert'}>{errors.name.message}</p>}
        <label htmlFor={'email'}>Email</label>
        <input
          type={'email'}
          id={'email'}
          placeholder={'Enter Your Email'}
          className={'input-field'}
          {...register('email')}
        />
        {errors.email && <p className={'form-alert'}>{errors.email.message}</p>}
        <label htmlFor={'company'}>Company</label>
        <input
          type={'text'}
          id={'company'}
          placeholder={'Enter Your Company'}
          className={'input-field'}
          {...register('company')}
        />
        {errors.company && (
          <p className={'form-alert'}>{errors.company.message}</p>
        )}
        <label htmlFor={'message'}>Message</label>
        <textarea
          id={'message'}
          cols={60}
          rows={10}
          placeholder={'Enter Your Message'}
          className={'input-field'}
          {...register('message')}
        ></textarea>
        {errors.message && (
          <p className={'form-alert'}>{errors.message.message}</p>
        )}
        <input
          type={'submit'}
          id={'submit'}
          disabled={isLoading}
          value={isLoading ? 'Sending...' : 'Send'}
        />
      </form>
    </div>
  );
};
export default ContactForm;
