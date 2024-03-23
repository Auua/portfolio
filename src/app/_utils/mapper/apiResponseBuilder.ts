import { FormResponse, FormErrors } from '@/app/_types/form';

export function successResponse<T, R>(
  data: R | undefined,
  message: string,
): FormResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function errorResponse<T>(
  message: string | '',
  errors: Partial<FormErrors<T>> | undefined,
): FormResponse<T> {
  return {
    success: false,
    errors,
    message,
  };
}
