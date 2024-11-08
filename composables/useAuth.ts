import { authUserMe } from '~/services/auth';
import type { IAuthProvider } from '~/types/user/auth';
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
    return resp;
  };

  const login = (payload: ILogin) => {
    const resp = useApi().post<ILoginResponse>('/api/v1/auth/login', payload);
    resp.then(
      ({ data }) => {
        token.value = data.authorisation.token;
        useApi().defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.authorisation.token}`;
        getAuthMe();
      },
      (e) => {}
    );
    return resp;
  };

  const logout = () => {
    const resp = useApi().post('/api/v1/auth/logout');

    resp.then(() => {
      resetAuth();
    });

    return resp;
  };

  const callbackAuth = (provider: IAuthProvider, query: any) => {
    const resp = useApi().get<ILoginResponse>(
      `/api/v1/auth/provider/callback/${provider}`,
      {
        params: query,
      }
    );
    // resp.then(({ data }) => {
    //   token.value = data.authorisation.token as string;
    //   setTokenAndAuthMe(data.authorisation.token);
    // });
    return resp;
  };

  const isLoggedIn = computed(() => token.value != null && user.value != null);

  return {
    token,
    login,
    user,
    getAuthMe,
    clearToken,
    isLoggedIn,
    callbackAuth,
    setTokenAndAuthMe,
    logout,
  };
};
