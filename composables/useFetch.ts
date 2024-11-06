export const useApi = () => {
  const $api = useNuxtApp().$api;
  return $api;
};

interface ErrorResponse {
  response: {
    status: number;
    data: {
      errors: Record<string, string[]>;
    };
  };
}

export const useHandleError = (e: ErrorResponse) => {
  const { status, data } = e.response;

  if (status === 422) {
    return data.errors;
  } else if (status === 404) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
    });
  } else if (status === 500) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  } else {
    throw createError({
      statusCode: status,
      statusMessage: 'Error',
    });
  }
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
