export const useApi = () => {
  const $api = useNuxtApp().$api;
  return $api;
};

export const useApiPost = <T = any>(
  url: string,
  data?: any,
  config: any = {}
) => {
  const $fetchApi = useNuxtApp().$apiFetch;
  return $fetchApi<T>(url, { method: 'POST', body: data, ...config });
};

export const useApiGet = (url: string, config: any = {}) => {
  const $fetchApi = useNuxtApp().$apiFetch;
  return $fetchApi(url, { method: 'GET', ...config });
};

export const useApiPut = (url: string, data?: any, config: any = {}) => {
  const $fetchApi = useNuxtApp().$apiFetch;
  return $fetchApi(url, { method: 'PUT', body: data, ...config });
};

export const useApiDelete = (
  url: string,
  params: any = {},
  config: any = {}
) => {
  const $fetchApi = useNuxtApp().$apiFetch;
  return $fetchApi(url, { method: 'DELETE', params, ...config });
};
