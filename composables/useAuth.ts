import { authUserMe } from '~/services/auth';
import type { ILogin, IUser } from '~/types/user/login';

export const useAuth = () => {
  const user = useState<IUser | null>('user', () => null);

  const token = useCookie('token');

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
        clearToken();
      }
    );
    resp;
  };

  const login = async (email?: string, password?: string) => {
    const resp = useApiPost<ILogin>('/api/v1/auth/login', {
      email,
      password,
    });
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
  };

  const callbackAuth = (provider: string, query: any) => {
    const resp = useApi().get<ILogin>(
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
  };
};
