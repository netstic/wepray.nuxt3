import { authUserMe } from '~/services/auth';
import type { ILoginResponse, ILogin, IUser } from '~/types/user/login';

export const useAuth = () => {
  const user = useState<IUser | null>('user', () => null);

  const token = useCookie('token');

  const resetAuth = () => {
    user.value = null;
    clearToken();
  };

  const clearToken = () => {
    useCookie('token').value = null;
  };

  const setTokenAndAuthMe = (token: string) => {
    useCookie('token').value = token;
    useApi().defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return getAuthMe();
  };

  const getAuthMe = () => {
    const resp = authUserMe();
    resp.then(
      ({ data }) => {
        user.value = data;
      },
      (e) => {
        resetAuth();
      }
    );
    resp;
  };

  const login = (payload: ILogin) => {
    const resp = useApiPost<ILoginResponse>('/api/v1/auth/login', payload);
    resp.then(
      (res) => {
        token.value = res.authorisation.token;
        useApi().defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res.authorisation.token}`;
        getAuthMe();
      },
      (e) => {}
    );
    return resp;
  };

  const logout = () => {
    const resp = useApiPost('/api/v1/auth/logout');

    resp.then((res) => {
      resetAuth();
    });

    return resp;
  };

  const callbackAuth = (provider: string, query: any) => {
    const resp = useApi().get<ILoginResponse>(
      `/api/v1/auth/provider/${provider}/callback`,
      {
        params: query,
      }
    );
    resp.then(({ data }) => {
      token.value = data.authorisation.token as string;
      useApi().defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.authorisation.token}`;
      getAuthMe();
    });
    return resp;
  };

  const isLoggedIn = useState(() => token.value != null && user.value != null);

  return {
    token,
    login,
    user,
    getAuthMe,
    clearToken,
    isLoggedIn: isLoggedIn,
    callbackAuth,
    setTokenAndAuthMe,
    logout,
  };
};
