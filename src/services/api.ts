import axios from 'axios';
import { Platform } from 'react-native';

const LOCAL_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://127.0.0.1:8080';
const BASE_URL = process.env.URL_ENDPOINT ?? LOCAL_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});