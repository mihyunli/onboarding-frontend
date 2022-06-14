import httpClient from '../utils/axios';
// import { AxiosError } from 'axios';
// import { API_GATEWAY_URL } from 'config';

// ----------------------------------------------------------------------

export const URLS = {
  LOGIN: `/auth/signin`,
  SIGNUP: `/auth/signup`,
  PROFILE: `/auth/me`,
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

export async function getProfile(): Promise<any> {
  const { data } = await httpClient({
    method: 'GET',
    url: URLS.PROFILE,
  });
  return data;
}

// React Query Hooks
