import axios from 'axios';
import { createClient } from './supabase';

// Validate API URL is set
const API_URL = 'https://examalert-telangana.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach Supabase JWT to every request
api.interceptors.request.use(async (config) => {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  // Add request ID for tracing
  config.headers['X-Request-ID'] = crypto.randomUUID();
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Never expose raw server errors to UI
    const status = err.response?.status;
    const serverMessage = err.response?.data?.error;

    if (status === 401) return Promise.reject(new Error('Please log in to continue'));
    if (status === 403) return Promise.reject(new Error('You do not have permission to do this'));
    if (status === 429) return Promise.reject(new Error('Too many requests. Please slow down.'));
    if (status === 404) return Promise.reject(new Error(serverMessage || 'Not found'));
    if (status >= 500) return Promise.reject(new Error('Server error. Please try again later.'));

    return Promise.reject(new Error(serverMessage || err.message || 'Something went wrong'));
  }
);

export default api;
