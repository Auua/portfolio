import { Output } from 'valibot';
import { FormSchema } from '../_utils/schemas/FormSchema';
import { LoginSchema } from '../_utils/schemas/LoginSchema';

export type ContactFormData = Output<typeof FormSchema>;
export type LoginFormData = Output<typeof LoginSchema>;

export type FormErrors<T> = {
  [Property in keyof T]: string[];
};

export type FormResponse<T> = {
  success: boolean;
  errors?: Partial<FormErrors<T>>;
  message: string;
  data?: unknown;
};
