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
        {{ $t('Create your WePray account') }}
      </h1>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-6">
        {{
          $t("Enter your email address and we'll sign you up in a few seconds.")
        }}
      </p>
      <form @submit.prevent="onRegister">
        <template v-if="!isEmailChecked">
          <WeprayFormInput
            v-model="row.email"
            :label="$t('Email')"
            :placeholder="$t('Enter your email')"
            required
            class="mb-4"
            @keyup.enter="checkEmail"
          />

          <button
            type="button"
            @click="checkEmail"
            :disabled="!row.email"
            class="w-full wp-btn-auth"
          >
            {{ $t('Check') }}
          </button>
        </template>

        <template v-if="isEmailChecked">
          <div>{{ row.email }}</div>
          <WeprayFormInput
            v-model="row.age"
            :label="$t('Age')"
            :placeholder="$t('Enter your age')"
            required
            class="mb-4"
          />
          <WeprayFormInput
            v-model="row.username"
            :label="$t('Username')"
            :placeholder="$t('Choose a username')"
            required
            class="mb-4"
          />

          <WeprayFormInput
            v-model="row.password"
            :label="$t('Password')"
            :placeholder="$t('Create a password')"
            :type="isShowPassword ? 'text' : 'password'"
            required
            class="mb-4"
          >
            <template #append>
              <button
                type="button"
                @click="togglePasswordVisibility('password')"
              >
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

          <button type="submit" class="w-full wp-btn-auth">
            {{ $t('Create Account') }}
          </button>
        </template>
      </form>
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ $t('Already have an account?') }}
          <NuxtLink
            to="/login"
            class="text-blue-600 dark:text-blue-400 hover:underline"
            >{{ $t('Log in') }}</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { checkEmailUserService, createUserService } from '~/services/user';
import type { IRegisterForm } from '~/types/user/login';

definePageMeta({
  layout: false,
  colorMode: 'dark',
});

const hasWindowHistory = ref(false);

const { login } = useAuth();

const row = ref<IRegisterForm>({
  email: null,
  age: null,
  username: null,
  password: null,
  password_confirmation: null,
});

const isEmailChecked = ref(false);
const isShowPassword = ref(false);
const isShowPasswordConfirmation = ref(false);

const checkEmail = () => {
  if (!row.value.email) return;

  checkEmailUserService(row.value.email)
    .then(() => {
      isEmailChecked.value = true;
    })
    .catch((err) => useHandleError(err));
};

const togglePasswordVisibility = (
  passwordTipo: 'password' | 'passwordConfirmation'
) => {
  if (passwordTipo === 'password') {
    isShowPassword.value = !isShowPassword.value;
  } else if (passwordTipo === 'passwordConfirmation') {
    isShowPasswordConfirmation.value = !isShowPasswordConfirmation.value;
  }
};

const onRegister = () => {
  const resCreate = createUserService(row.value);

  resCreate
    .then(() => {
      const resLogin = login({
        username: row.value.email!,
        password: row.value.password!,
      });

      resLogin
        .then(() => {
          navigateTo('/pray');
        })
        .catch((err) => useHandleError(err));
    })
    .catch((err) => useHandleError(err));
};

onMounted(() => {
  if (window.history.length > 1) {
    hasWindowHistory.value = true;
  }
});
</script>
