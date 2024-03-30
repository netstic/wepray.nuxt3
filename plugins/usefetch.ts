export default defineNuxtPlugin(() => {
  const headers: Record<string, string> = {
    'x-platform': 'wepray',
    'x-version': '1.0.0',
  };

  const token = useCookie('token');
  if (token.value) {
    headers['Authorization'] = `Bearer ${token.value}`;
  }

  const $apiFetch = $fetch.create({
    baseURL: 'http://localhost:8000',
    headers: headers,
    onRequest(config) {
      console.log('onRequest', config);
    },
    onResponse(response) {
      console.log('onResponse', response);
    },
  });
  return {
    provide: {
      apiFetch: $apiFetch,
    },
  };
});
