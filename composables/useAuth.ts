import { authUserMe } from '~/services/auth';
import type { ILogin, IUser } from '~/types/user/login';

export const useAuth = () => {
  const user = useState<IUser | null>('user', () => null);

  const token = useCookie('token');

  const clearToken = () => {
    useCookie('token').value = null;
  };

  const getAuthMe = () => {
    const resp = authUserMe();
    resp.then(
      ({ data }) => {
        user.value = data;
      },
      (e) => {
        console.log(e);
        clearToken();
      }
    );
    resp;
  };

  const login = async (email?: string, password?: string) => {
    const resp = useApiPost<ILogin>('/api/v1/auth/login', { email, password });
    resp.then(
      (res) => {
        token.value = res.authorisation.token;
        useApi().defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res.authorisation.token}`;
        getAuthMe();
      },
      (e) => {
        console.log(e);
      }
    );

    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await response.json();
    // token.value = 'asdasdas';
    // token.value = 'asdasdas';
    // useApi('/api/login', {});
  };

  return {
    token,
    login,
    user,
    getAuthMe,
  };
};
