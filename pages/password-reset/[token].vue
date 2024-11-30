<template>
  <div
    class="fixed top-4 left-4 text-gray-600 dark:text-gray-400 text-xl cursor-pointer"
    @click="hasWindowHistory ? $router.go(-1) : navigateTo('/')"
  >
    <IconCloseSquare size="xl" />
  </div>
  <div
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
        {{ $t('Reset your password') }}
      </h1>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-6">
        {{ $t('Enter your new password below') }}
      </p>
      <form @submit.prevent="onSubmit">
        <WeprayFormInput
          v-model="row.password"
          :label="$t('Password')"
          :placeholder="$t('Create a password')"
          :type="isShowPassword ? 'text' : 'password'"
          required
          class="mb-4"
        >
          <template #append>
            <button type="button" @click="togglePasswordVisibility('password')">
              <IconEyeSlashOutline v-if="isShowPassword" />
              <IconEyeOutline v-else />
            </button>
          </template>
        </WeprayFormInput>

        <WeprayFormInput
          v-model="row.password_confirmation"
          :label="$t('Confirm Password')"
          :placeholder="$t('Confirm your password')"
          :type="isShowPasswordConfirmation ? 'text' : 'password'"
          required
          class="mb-6"
        >
          <template #append>
            <button
              type="button"
              @click="togglePasswordVisibility('passwordConfirmation')"
            >
              <IconEyeSlashOutline v-if="isShowPasswordConfirmation" />
              <IconEyeOutline v-else />
            </button>
          </template>
        </WeprayFormInput>

        <WeprayButton
          type="submit"
          class="w-full wp-btn-auth"
          :loading="isSubmitLoading"
        >
          {{ $t('Reset Password') }}
        </WeprayButton>
      </form>

      <WeprayNotifyMessage ref="notifyMessageRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeprayNotifyMessage } from '#build/components';
import { ref } from 'vue';
import { resetPasswordService } from '~/services/user';
import type { IResetPasswordForm } from '~/types/user/login';

definePageMeta({
  layout: false,
  colorMode: 'dark',
});

const hasWindowHistory = ref(false);

const route = useRoute();

const row = ref<IResetPasswordForm>({
  email: route.query?.email as string,
  password: null,
  password_confirmation: null,
  token: route.params.token as string,
});

const isSubmitLoading = ref(false);
const isShowPassword = ref(false);
const isShowPasswordConfirmation = ref(false);
const notifyMessageRef = ref<InstanceType<typeof WeprayNotifyMessage>>();

const togglePasswordVisibility = (
  passwordTipo: 'password' | 'passwordConfirmation'
) => {
  if (passwordTipo === 'password') {
    isShowPassword.value = !isShowPassword.value;
  } else if (passwordTipo === 'passwordConfirmation') {
    isShowPasswordConfirmation.value = !isShowPasswordConfirmation.value;
  }
};

const onSubmit = () => {
  if (row.value.password !== row.value.password_confirmation) {
    notifyMessageRef.value?.notifyError('Passwords do not match.');
    return;
  }

  isSubmitLoading.value = true;

  resetPasswordService(row.value)
    .then((res) => {
      notifyMessageRef.value?.notifySuccess(
        'Password reset successful. Redirecting to login...'
      );

      setTimeout(() => {
        navigateTo('/login');
      }, 2000);
    })
    .catch(() => {
      notifyMessageRef.value?.notifyError(
        'An error occurred. Please try again.'
      );
    })
    .finally(() => {
      isSubmitLoading.value = false;
    });
};

onMounted(() => {
  if (window.history.length > 1) {
    hasWindowHistory.value = true;
  }
});
</script>
