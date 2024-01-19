import { captureException } from '@sentry/react';
import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const onError = (error: unknown) => {
  if (axios.isAxiosError(error) && (error.status ?? 0) >= 500) {
    captureException(error);
  }
};
export type ErrorsValidation = {
  param: string;
  message: string;
  type?: string;
};

export type ApiErrorDataType = {
  validationErrors?: Array<ErrorsValidation>;
  errors?: Array<ErrorsValidation>;
  message?: string;
};

export type ApiErrorType = AxiosError<ApiErrorDataType>;

// refetch after 15 seconds
export const REFETCH_INTERVAL_TIME_FOR_LIST = 1000 * 15;

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError,
      retry: false,
    },
    queries: {
      retry: 0,
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retryDelay: 5000,
    },
  },
});

export const mockQueryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError,
      retry: false,
    },
  },
});
