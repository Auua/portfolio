'use client';

import '@/app/_styles/form.css';

import { Dispatch, SetStateAction, useState } from 'react';
import { ErrorNotification, SuccessNotification } from '@/app/_components/common/Notification';
import { sendForm } from '@/app/_utils/apiUtils';

const closeNotification = (setter: Dispatch<SetStateAction<boolean>>) => {
  setter(false);
};

const ContactForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(event.currentTarget);

    const data = {
      username: 'portfolio',
      avatar_url: '',
      embeds: [
        {
          fields: [
            {
              name: 'Name',
              value: formData.get('name'),
            },
            {
              name: 'Email',
              value: formData.get('email'),
            },
            {
              name: 'Company',
              value: formData.get('company'),
            },
          ],
        },
      ],
      content: formData.get('message'),
    };

    try {
      await sendForm(data);
      setSuccess(true);
      setLoading(false);
      event.target.reset();
    } catch (exception) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div>
      {success && (
        <SuccessNotification
          title={'Thank you!'}
          message={
            "Awesome! Your message has successfully blasted off into cyberspace, and it's currently zooming its way straight to my inbox. "
            + "Thanks for reaching out and I'll get back to you as soon as I can!"
          }
          close={() => closeNotification(setSuccess)}
        />
      )}
      {error && (
        <ErrorNotification
          title={'Sorry, something is failing...'}
          message={
            'Oops, it looks like something went wrong and your message was unable to be sent. '
            + 'Please try again later, or if the problem persists, feel free to contact me through LinkedIn. '
            + 'I apologize for the inconvenience and appreciate your understanding.'
          }
          close={() => closeNotification(setError)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className={'form-control'}>
          <label htmlFor={'name'}>Name</label>
          <input
            type={'text'}
            id={'name'}
            name={'name'}
            placeholder={'Enter Your Name'}
            className={'input-field'}
            required
          />
        </div>
        <div className={'form-control'}>
          <label htmlFor={'email'}>Email</label>
          <input
            type={'email'}
            id={'email'}
            name={'email'}
            placeholder={'Enter Your Email'}
            className={'input-field'}
            required
          />
        </div>
        <div className={'form-control'}>
          <label htmlFor={'company'}>Company</label>
          <input
            type={'text'}
            id={'company'}
            name={'company'}
            placeholder={'Enter Your Company'}
            className={'input-field'}
          />
        </div>

        <div className={'form-control'}>
          <label htmlFor={'message'}>Message</label>
          <textarea
            id={'message'}
            cols={60}
            rows={10}
            placeholder={'Enter Your Message'}
            name={'message'}
            className={'input-field'}
            required
          ></textarea>
        </div>
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
