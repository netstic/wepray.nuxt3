<template>
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
        Forgot Your Password?
      </h1>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-6">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <form @submit.prevent="handleForgotPassword">
        <div class="mb-6">
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
            placeholder="Enter your email address"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
        >
          Send Reset Link
        </button>
      </form>
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Remember your password?
          <NuxtLink
            to="/login"
            class="text-blue-600 dark:text-blue-400 hover:underline"
            >Log in</NuxtLink
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

<script setup>
import { ref } from 'vue';

const email = ref('');
const showSuccessMessage = ref(false);
const errorMessage = ref('');

const handleForgotPassword = async () => {
  try {
    // Reset messages
    showSuccessMessage.value = false;
    errorMessage.value = '';

    // Here you would typically make an API call to request a password reset
    // For demonstration, we'll simulate an API call with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulating a successful response
    console.log('Password reset requested for:', email.value);
    showSuccessMessage.value = true;

    // Clear the email input after successful submission
    email.value = '';

    // In a real application, you would handle the API response here
    // If the API call is successful, show the success message
    // If there's an error, set the error message
  } catch (error) {
    console.error('Error requesting password reset:', error);
    errorMessage.value =
      'An error occurred while requesting the password reset. Please try again.';
  }
};
</script>
