import { FormResponse, FormErrors } from '@/app/_types/form';

export function successResponse<T, R>(
  data: R | undefined,
  message: string,
): FormResponse<T> {
  return {
    success: true,
    data,
    message: message,
  };
}

export function errorResponse<T>(
  errors: string | undefined,
  nested: Partial<FormErrors<T>> | undefined,
): FormResponse<T> {
  return {
    success: false,
    errors: {
      nested: nested,
      message: errors,
    },
    message: 'error',
  };
}
