import httpClient from '../utils/axios';
// import { AxiosError } from 'axios';
// import { API_GATEWAY_URL } from 'config';

// ----------------------------------------------------------------------

export const URLS = {
  LOGIN: `.../auth/signin`,
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

// React Query Hooks
