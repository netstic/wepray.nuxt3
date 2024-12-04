import { authGuestMe, authUserMe } from '~/services/auth';
import type { TAuthProvider } from '~/types/user/auth';
import type {
  ILoginResponse,
  ILogin,
  IUser,
  IGuest,
  IGuestLoginResponse,
} from '~/types/user/login';

export const useAuth = () => {
  const user = useState<IUser | null>('user', () => null);
  const guest = useState<IGuest | null>('guest', () => null);

  const token = useCookie('token');
  const guestToken = useCookie('guest_token');

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

  const setGuestTokenAndAuthMe = (token: string) => {
    useCookie('guest_token').value = token;
    useApi().defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return getGuestAuthMe();
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

  const getGuestAuthMe = (headers?: Record<string, string>) => {
    const resp = authGuestMe(headers);
    resp.then(
      ({ data }) => {
        guest.value = data;
      },
      (e) => {
        guest.value = null;
      }
    );
    return resp;
  };

  const refreshGuestToken = () => {
    const resp = useApi().post<IGuestLoginResponse>('/api/v1/guest/refresh');
    resp.then(({ data }) => {
      guestToken.value = data.authorization.token;
      guest.value = data.guest;
      useApi().defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.authorization.token}`;
    });
    return resp;
  };

  const login = (payload: ILogin, headers?: Record<string, string>) => {
    const resp = useApi().post<ILoginResponse>('/api/v1/auth/login', payload, {
      headers,
    });
    resp.then(
      ({ data }) => {
        token.value = data.authorization.token;
        useApi().defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.authorization.token}`;
        getAuthMe();
      },
      (e) => {}
    );
    return resp;
  };

  const logout = (payload: { token: string | null }) => {
    const resp = useApi().post<IGuestLoginResponse>('/api/v1/auth/logout', {
      token: payload.token,
    });

    resp.then(() => {
      resetAuth();
    });

    return resp;
  };

  const callbackAuth = (provider: TAuthProvider, query: any) => {
    const resp = useApi().get<ILoginResponse>(
      `/api/v1/auth/provider/callback/${provider}`,
      {
        params: query,
      }
    );
    return resp;
  };

  const guestLoginOrCreate = () => {
    const resp = useApi().post<IGuestLoginResponse>('/api/v1/guest/login', {
      token: guestToken.value,
    });

    resp.then(
      ({ data }) => {
        guestToken.value = data.authorization.token;
        useApi().defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.authorization.token}`;
        getGuestAuthMe();
      },
      (e) => {}
    );

    return resp;
  };

  const isLoggedIn = computed(() => token.value != null && user.value != null);
  const userName = computed(() => {
    if (user.value) {
      return user.value.username ?? user.value.name;
    }
    return '@';
  });

  const isGuestLoggedIn = computed(
    () => guestToken.value != null && guest.value != null
  );

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
    userName,
    // guest
    guest,
    guestToken,
    isGuestLoggedIn,
    guestLoginOrCreate,
    setGuestTokenAndAuthMe,
    getGuestAuthMe,
    refreshGuestToken,
  };
};
