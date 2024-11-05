<template>
  <div>
    <div class="w-full">
      <h2
        class="w-full text-3xl font-semibold text-gray-800 md:text-4xl aos-init aos-animate"
      >
        {{ $t('Sign Up') }}
      </h2>
      <div
        class="w-full mt-6 px-2 py-2 bg-white shadow-md overflow-hidden sm:rounded-lg"
      >
        <form-input-error :errors="errors"></form-input-error>

        <div class="m-0 md:m-3 flex justify-between">
          <t-input
            v-model="row.email"
            class="w-full rounded-l-lg p-1 md:p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            :placeholder="$t('E-mail')"
            name="email"
            type="email"
            :variant="isCheckError('email') ? 'error' : undefined"
          />

          <button
            v-if="!showForm"
            type="button"
            class="px-8 rounded-r-lg bg-gray-800 text-gray-200 font-bold p-4 uppercase border-gray-500 border-t border-b border-r"
            @click="checkEmail"
          >
            {{ $t('Check') }}
          </button>
        </div>

        <template v-if="showForm">
          <div class="flex items-center justify-between mt-4 mx-2">
            <div class="w-full px-1 mb-6">
              <label
                name="name"
                class="block font-medium text-sm text-gray-700"
              >
                {{ $t('Name') }}
              </label>
              <t-input
                id="name"
                v-model="row.name"
                type="name"
                name="name"
                :variant="isCheckError('name') ? 'error' : undefined"
              ></t-input>
            </div>
          </div>
          <div class="flex items-center justify-between mt-4 mx-2">
            <div class="w-full px-1 mb-0">
              <label
                name="username"
                class="block font-medium text-sm text-gray-700"
              >
                {{ $t('Username') }}
              </label>
              <t-input
                id="username"
                v-model="row.username"
                type="username"
                name="username"
                :variant="isCheckError('username') ? 'error' : undefined"
                @blur="checkUsername"
              ></t-input>
            </div>
          </div>
          <div
            v-if="!isCheckError('username')"
            class="flex items-center mt-1 mb-6 mx-3 font-light text-sm"
          >
            <i class="mdi mdi-information mr-1"></i>
            {{ $t('Examples: Name, Name.Lastname, Name_1, nickname') }}
          </div>
          <div
            v-if="isCheckError('username')"
            class="flex items-center mt-1 mb-6 mx-3 font-light text-sm text-red-500"
          >
            <i class="mdi mdi-information mr-1"></i>
            {{ $t('Only letters, numbers and dot (.) are allowed.') }}
          </div>
          <div
            class="flex flex-col md:flex-row items-center justify-between mt-4 mx-2"
          >
            <div class="w-full px-1 mb-6">
              <label
                name="password"
                class="block font-medium text-sm text-gray-700"
              >
                {{ $t('Password') }}
              </label>
              <div class="relative">
                <t-input
                  id="password"
                  v-model="row.password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  :variant="isCheckError('password') ? 'error' : undefined"
                  :placeholder="$t('at least 8 characters')"
                ></t-input>
                <div
                  class="absolute inset-y-1 right-1 pr-3 flex items-center text-lg"
                >
                  <button @click="onShowPassword()">
                    <i v-if="!showPassword" class="mdi mdi-eye-outline"></i>
                    <i
                      v-if="showPassword"
                      class="mdi mdi-eye-remove text-red-500"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full px-1 mb-6">
              <label
                name="password_confirmation"
                class="block font-medium text-sm text-gray-700"
              >
                {{ $t('Confirm password') }}
              </label>
              <div class="relative">
                <t-input
                  id="password_confirmation"
                  v-model="row.password_confirmation"
                  :type="showPassword ? 'text' : 'password'"
                  name="password_confirmation"
                  :variant="
                    isCheckError('password_confirmation') ? 'error' : undefined
                  "
                ></t-input>
                <div
                  class="absolute inset-y-1 right-1 pr-3 flex items-center text-lg"
                >
                  <button @click="onShowPassword()">
                    <i v-if="!showPassword" class="mdi mdi-eye-outline"></i>
                    <i
                      v-if="showPassword"
                      class="mdi mdi-eye-remove text-red-500"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="md:flex items-center justify-between flex-col">
          <recaptcha
            id="g-recaptcha-2"
            class="inline-flex items-center px-4 py-2"
            @error="onError"
            @success="onSuccess"
            @expired="onExpired"
          />
        </div>
        <div
          v-if="showForm"
          class="md:flex items-center justify-between mt-4 px-3 flex-col"
        >
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4 request"
            @click="onSubmit"
          >
            {{ $t('Send') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useNuxtApp, useRuntimeConfig } from 'nuxt/app';

// Types
interface SignupForm {
  username: string;
  email: string | null;
  password: string | null;
  password_confirmation: string | null;
  'g-recaptcha-response'?: string | null;
  name?: string;
}

interface ErrorResponse {
  response: {
    status: number;
    data: {
      errors: Record<string, string[]>;
    };
  };
}

// State
const showForm = ref(false);
const showPassword = ref(false);
const row = reactive<SignupForm>({
  username: '',
  email: null,
  password: null,
  password_confirmation: null,
});
const errors = reactive<Record<string, string[] | {}>>({});

// Composables
const nuxtApp = useNuxtApp();
const config = useRuntimeConfig();

// Page metadata
useHead({
  title: 'SignUp - WePray',
});

// Methods
const isCheckError = (field: string): boolean => {
  return Object.prototype.hasOwnProperty.call(errors, field);
};

const onShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const handleError = (e: ErrorResponse) => {
  const { status, data } = e.response;

  if (status === 422) {
    errors.value = data.errors;
  } else if (status === 404) {
    nuxtApp.$router.push({
      name: 'error',
      query: { statusCode: 404, message: 'not found' },
    });
  } else if (status === 500) {
    nuxtApp.$router.push({
      name: 'error',
      query: { statusCode: 500, message: 'Internal Server Error' },
    });
  } else {
    nuxtApp.$router.push({
      name: 'error',
      query: { statusCode: status, message: 'Error' },
    });
  }
};

const checkUsername = async () => {
  const { username } = row;
  try {
    await nuxtApp.$axios.post(
      `${config.public.baseApi}/api/v1/pub/user/check`,
      { username }
    );
    errors.value = {};
    showForm.value = true;
  } catch (e) {
    handleError(e as ErrorResponse);
  }
};

const checkEmail = async () => {
  const { email } = row;
  try {
    await nuxtApp.$axios.post(
      `${config.public.baseApi}/api/v1/pub/user/check`,
      { email }
    );
    errors.value = {};
    showForm.value = true;
  } catch (e) {
    handleError(e as ErrorResponse);
  }
};

const onSubmit = async () => {
  try {
    await nuxtApp.$axios.post(
      `${config.public.baseApi}/api/v1/pub/user/register`,
      row
    );

    try {
      await nuxtApp.$auth.loginWith('laravelSanctum', {
        data: row,
      });

      const layout = nuxtApp.$store.state.auth.loggedIn ? 'private' : 'public';
      nuxtApp.setLayout(layout);
    } catch (e) {
      handleError(e as ErrorResponse);
    }
  } catch (e) {
    handleError(e as ErrorResponse);
  }
};

const onError = (_e: unknown) => {
  // Handle recaptcha error if needed
};

const onSuccess = (token: string) => {
  row['g-recaptcha-response'] = token;
};

const onExpired = () => {
  row['g-recaptcha-response'] = null;
};
</script>
