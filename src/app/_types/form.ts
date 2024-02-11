import { Output } from 'valibot';
import { FormSchema } from '../_utils/schemas/FormSchema';

export type ContactFormData = Output<typeof FormSchema>;

export type FormErrors<T> = {
  [Property in keyof T]: string[];
};

export type FormResponse<T> = {
  success: boolean;
  errors?: {
    nested?: Partial<FormErrors<T>>;
    message?: string;
  };
  message: string;
  data?: unknown;
};
