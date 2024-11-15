<template>
  <div
    class="fixed top-4 left-4 text-gray-600 dark:text-gray-400 text-xl cursor-pointer"
    @click="hasHistory ? $router.go(-1) : navigateTo('/')"
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
        <svg
          class="w-16 h-16 text-blue-600 dark:text-blue-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M17 3V5V7H15V9H17V11V13H19V11V9V7V5V3H17ZM11 9V7V5V3H9V5V7V9V11V13H11V11V9ZM3 13V15V17V19V21H5V19V17V15V13V11H3V13ZM15 21V19V17H13V15H15V13H17V15V17V19V21H15ZM11 21V19V17V15V13H9V15V17V19V21H11ZM7 11V9V7H5V9V11V13H7V11Z"
          />
        </svg>
      </div>
      <h1
        class="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white"
      >
        Create your PrayerConnect account
      </h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label
            for="username"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Username</label
          >
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Choose a username"
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Password</label
          >
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Create a password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility('password')"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            >
              <IconEyeOutline v-if="showPassword" />
              <IconEyeSlashOutline v-else />
            </button>
          </div>
        </div>
        <div class="mb-6">
          <label
            for="password_confirmation"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Confirm Password</label
          >
          <div class="relative">
            <input
              id="password_confirmation"
              v-model="password_confirmation"
              :type="showPasswordConfirmation ? 'text' : 'password'"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility('confirmation')"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            >
              <IconEyeOutline v-if="showPasswordConfirmation" />
              <IconEyeSlashOutline v-else />
            </button>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
        >
          Create Account
        </button>
      </form>
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <NuxtLink
            to="/login"
            class="text-blue-600 dark:text-blue-400 hover:underline"
            >Log in</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  colorMode: 'dark',
});

const hasHistory = ref(false);

import { ref } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const togglePasswordVisibility = (field) => {
  if (field === 'password') {
    showPassword.value = !showPassword.value;
  } else if (field === 'confirmation') {
    showPasswordConfirmation.value = !showPasswordConfirmation.value;
  }
};

const handleRegister = () => {
  // Here you would typically handle the registration logic
  console.log('Registration attempted with:', {
    username: username.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  });
  // You might want to use a store action or make an API call here
};

onMounted(() => {
  if (window.history.length > 1) {
    hasHistory.value = true;
  }
});
</script>
