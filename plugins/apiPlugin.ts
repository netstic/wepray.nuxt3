import axios from 'axios';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const headers: Record<string, string> = {
    'x-platform': 'wepray',
    'x-version': '1.0.0',
  };

  const token = useCookie('token');
  if (token.value) {
    headers['Authorization'] = `Bearer ${token.value}`;
  }

  const api = axios.create({
    baseURL: runtimeConfig.public.apiBase,
    headers,
  });
  return {
    provide: {
      api,
    },
  };
});
