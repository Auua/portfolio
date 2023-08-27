'use client';

import '@/app/_styles/common.css';

import React from 'react';
import Icon from '@/app/_components/common/Icon';
import { FullNotificationProps, NotificationProps } from '@/app/_types/types';

const Notification = ({
  title,
  message,
  close,
  icon,
  role,
  classValue,
}: FullNotificationProps) => (
  <div
    className={`notification ${classValue}`}
    role={role}
    onClick={close && close}
  >
    <div><Icon icon={icon}/></div>
    <div>
      <p className={'text-bold padded-vertical'}>{title}</p>
      <p className={'text-small padded-vertical'}>{message}</p>
    </div>
    {close && <button onClick={close}>X</button>}
  </div>
);

export const ErrorNotification = ({
  title,
  message,
  close,
}: NotificationProps) => (
  <Notification
    close={close}
    classValue={'notification__alert'}
    role={'alert'}
    title={title}
    icon={['fas', 'circle-exclamation']}
    message={message}
  />
);

export const SuccessNotification = ({
  title,
  message,
  close,
}: NotificationProps) => (
  <Notification
    close={close}
    classValue={'notification__success'}
    role={'status'}
    title={title}
    icon={['fas', 'circle-info']}
    message={message}
  />
);

export const InfoNotification = ({ title, message }: NotificationProps) => (
  <Notification
    classValue={'notification__info'}
    role={'status'}
    title={title}
    icon={['fas', 'circle-info']}
    message={message}
  />
);
