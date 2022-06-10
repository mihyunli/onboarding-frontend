import httpClient from '../utils/axios';
// import { AxiosError } from 'axios';
// import { API_GATEWAY_URL } from 'config';

// ----------------------------------------------------------------------

export const URLS = {
  LOGIN: `/auth/signin`,
  SIGNUP: `/auth/signup`,
};

// API
export async function signIn(input: any): Promise<any> {
  const { data } = await httpClient({
    method: 'POST',
    url: URLS.LOGIN,
    data: { ...input },
  });
  return data;
}

export async function signUp(form: any): Promise<any> {
  const { data } = await httpClient({
    method: 'POST',
    url: URLS.SIGNUP,
    data: { ...form },
  });
  return data;
}

// React Query Hooks
