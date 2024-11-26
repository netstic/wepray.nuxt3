<template>
  <div
    v-if="!someAuthProviderLoading"
    class="fixed top-4 left-4 text-gray-600 dark:text-gray-400 text-xl cursor-pointer"
    @click="hasWindowHistory ? $router.go(-1) : navigateTo('/')"
  >
    <IconCloseSquare size="xl" />
  </div>
  <main
    class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center p-4 transition-colors duration-300"
  >
    <div
      class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors duration-300"
    >
      <div class="flex justify-center mb-8">
        <LogoWp custom-class="w-16 h-16 text-blue-600 dark:text-blue-400" />
      </div>
      <h1
        class="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white"
      >
        {{ $t('Log in to WePray') }}
      </h1>
      <form @submit.prevent="onLogin">
        <WeprayFormInput
          v-model="row.login"
          :label="$t('Email or Username')"
          :placeholder="$t('Enter your email or username')"
          required
          class="mb-4"
          :disabled="someAuthProviderLoading"
        />
        <WeprayFormInput
          v-model="row.password"
          :label="$t('Password')"
          type="password"
          :placeholder="$t('Enter your password')"
          required
          class="mb-6"
          :disabled="someAuthProviderLoading"
        />
        <WeprayButton
          type="submit"
          class="w-full wp-btn-auth"
          :disabled="someAuthProviderLoading"
          :loading="isLoginLoading"
        >
          {{ $t('Log in') }}
        </WeprayButton>
      </form>

      <div class="mt-4 text-center">
        <NuxtLink
          to="/forgot-password"
          class="wp-link text-sm"
          :class="{ 'pointer-events-none': someAuthProviderLoading }"
          >{{ $t('Forgot your password?') }}</NuxtLink
        >
      </div>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ $t("Don't have an account?") }}
          <NuxtLink
            to="/register"
            class="wp-link"
            :class="{ 'pointer-events-none': someAuthProviderLoading }"
            >{{ $t('Sign up') }}</NuxtLink
          >
        </p>
      </div>

      <WeprayNotifyBanner ref="notifyBannerRef" />

      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div
              class="w-full border-t border-gray-300 dark:border-gray-600"
            ></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span
              class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              >{{ $t('Or continue with') }}</span
            >
          </div>
        </div>
        <div class="mt-6 grid grid-cols-2 gap-3">
          <BtnAuthProvider
            :is-loading="isAuthLoading.facebook"
            :text="$t('Facebook')"
            @click="onAuthProvider('facebook')"
            :disabled="someAuthProviderLoading"
          >
            <IconFacebook />
            <span>{{ $t('Facebook') }}</span>
          </BtnAuthProvider>
          <BtnAuthProvider
            :is-loading="isAuthLoading.google"
            :text="$t('Google')"
            @click="onAuthProvider('google')"
            :disabled="someAuthProviderLoading"
          >
            <IconGoogle />
            <span>{{ $t('Google') }}</span>
          </BtnAuthProvider>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { WeprayNotifyBanner } from '#build/components';
import { ref } from 'vue';
import type { TAuthProvider } from '~/types/user/auth';
import type { ILogin } from '~/types/user/login';

definePageMeta({
  colorMode: 'dark',
});

const hasWindowHistory = ref(false);

const { login, isLoggedIn, logout, setTokenAndAuthMe, token } = useAuth();
const { executeRecaptcha } = useGoogleRecaptcha();

const notifyBannerRef = ref<InstanceType<typeof WeprayNotifyBanner>>();
const isLoginLoading = ref(false);
const row = ref<ILogin>({
  login: null,
  password: null,
});

const isAuthProviderOpen = ref(false);
const isAuthLoading = ref<Record<TAuthProvider, boolean>>({
  google: false,
  facebook: false,
});

const someAuthProviderLoading = computed(() =>
  Object.values(isAuthLoading.value).some((value) => value)
);

const onLogin = async () => {
  if (isLoggedIn.value) {
    return handleUnauthorized();
  }

  isLoginLoading.value = true;

  const { token } = await executeRecaptcha(RecaptchaAction.login);

  login({ ...row.value, 'g-recaptcha-response': token })
    .then(() => {
      navigateTo('/pray');
    })
    .catch(() => {
      notifyBannerRef.value?.notifyError(
        'An error occurred while logging in. Please try again.'
      );
    })
    .finally(() => {
      isLoginLoading.value = false;
    });
};

const onAuthProvider = (provider: TAuthProvider) => {
  if (someAuthProviderLoading.value) return;

  let windowHandle: any = null;

  const width = 500;
  const height = 550;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;

  const windowFeatures = `left=${left},top=${top},width=${width},height=${height}`;

  if (!isAuthProviderOpen.value || windowHandle?.closed) {
    windowHandle = window.open(
      `http://localhost:8890/auth/provider/redirect/${provider}`,
      '_blank',
      windowFeatures
    );
    isAuthProviderOpen.value = true;

    const checkWindowClosed = setInterval(() => {
      if (windowHandle?.closed) {
        clearInterval(checkWindowClosed);
        isAuthProviderOpen.value = false;
        windowHandle = null;
      }
    }, 500);
  }
};

const messageListener = (event: any) => {
  if (event.origin !== window.location.origin) return;

  const { responseToken, provider } = event.data;

  isAuthLoading.value[provider as TAuthProvider] = true;

  if (responseToken) {
    token.value = responseToken;
    setTokenAndAuthMe(responseToken).then(() => {
      isAuthLoading.value[provider as TAuthProvider] = false;
      window.removeEventListener('message', messageListener);
      navigateTo('/pray');
    });
  }
};

const handleUnauthorized = () => {
  logout();
  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized',
    fatal: true,
  });
};

onBeforeMount(() => {
  if (isLoggedIn.value) {
    navigateTo('/pray');
  }
});

onMounted(() => {
  if (window.history.length > 1) {
    hasWindowHistory.value = true;
  }
  window.addEventListener('message', messageListener);
});

onUnmounted(() => {
  window.removeEventListener('message', messageListener);
});
</script>
