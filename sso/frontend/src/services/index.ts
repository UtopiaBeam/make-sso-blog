import { Credentials } from '../types';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function login(appid: string, credentials: Credentials) {
  return axios.post(`${apiUrl}/login`, credentials, { headers: { appid } });
}

export function loginWithToken(appid: string, token: string) {
  return axios.post(
    `${apiUrl}/login`,
    {},
    { headers: { authorization: `Bearer ${token}`, appid } },
  );
}
