export * from './guitar';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export {};