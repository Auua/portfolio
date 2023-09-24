import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type NotificationProps = {
  title: string;
  message: string;
  close?: () => void;
  classValue?: string;
};

export type CommonNotificationProps = {
  icon: IconProp;
  role: string;
  classValue: string;
};

export type FullNotificationProps = NotificationProps & CommonNotificationProps;
