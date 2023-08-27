import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type PageItem = {
  title: string;
  icon: IconProp
  slug: string;
  order: number;
};

export type ParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
};
