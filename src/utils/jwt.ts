import jwtDecode from 'jwt-decode';
// import { verify, sign } from 'jsonwebtoken';
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (accessToken?: string): void => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    // TODO: 아래 코드는 새로고침 시 헤더 날아감.
    // axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
