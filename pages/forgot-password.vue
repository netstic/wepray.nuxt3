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
        {{ $t('Forgot your password?') }}
      </h1>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-6">
        {{
          $t(
            "Enter your email address and we'll send you a link to reset your password."
          )
        }}
      </p>
      <form @submit.prevent="onSubmit">
        <WeprayFormInput
          v-model="row.email"
          type="email"
          :label="$t('Email')"
          :placeholder="$t('Enter your email')"
          class="mb-6"
          required
        />
        <button type="submit" class="w-full wp-btn-auth">
          {{ $t('Send Reset Link') }}
        </button>
      </form>
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ $t('Remember your password?') }}
          <NuxtLink
            to="/login"
            class="text-blue-600 dark:text-blue-400 hover:underline"
            >{{ $t('Log in') }}</NuxtLink
          >
        </p>
      </div>
      <!-- Success message -->
      <div
        v-if="showSuccessMessage"
        class="mt-4 p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-md"
      >
        Password reset link sent successfully. Please check your email.
      </div>
      <!-- Error message -->
      <div
        v-if="errorMessage"
        class="mt-4 p-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md"
      >
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: false,
  colorMode: 'dark',
});

const hasWindowHistory = ref(false);

const defaultRow = (): { email: string | null } => ({
  email: null,
});

const row = ref(defaultRow());

const showSuccessMessage = ref(false);
const errorMessage = ref('');

const onSubmit = async () => {
  try {
    // Reset messages
    showSuccessMessage.value = false;
    errorMessage.value = '';

    // Here you would typically make an API call to request a password reset
    // For demonstration, we'll simulate an API call with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulating a successful response
    console.log('Password reset requested for:', row.value.email);
    showSuccessMessage.value = true;

    // Clear the email input after successful submission
    row.value.email = '';

    // In a real application, you would handle the API response here
    // If the API call is successful, show the success message
    // If there's an error, set the error message
  } catch (error) {
    console.error('Error requesting password reset:', error);
    errorMessage.value =
      'An error occurred while requesting the password reset. Please try again.';
  }
};

onMounted(() => {
  if (window.history.length > 1) {
    hasWindowHistory.value = true;
  }
});
</script>
