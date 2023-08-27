import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type PageItem = {
  title: string;
  icon: IconProp
  slug: string;
  order: number;
};

export type NotificationProps = {
  title: string;
  message: string;
  close?: () => void;
};

export type CommonNotificationProps = {
  icon: IconProp;
  role: string;
  classValue: string;
};

export type FullNotificationProps = NotificationProps & CommonNotificationProps;

export type ParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
};
