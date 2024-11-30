<template>
  <div v-if="successMessage || errorMessage">
    <!-- Success message -->
    <div
      v-if="successMessage && !errorMessage"
      class="mt-4 p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-md"
    >
      {{ $t(successMessage) }}
    </div>
    <!-- Error message -->
    <div
      v-if="errorMessage && !successMessage"
      class="mt-4 p-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md"
    >
      {{ $t(errorMessage) }}
    </div>
  </div>
</template>

<script setup lang="ts">
const successMessage = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

const notifySuccess = (message: string) => {
  successMessage.value = message;
  errorMessage.value = null;
};

const notifyError = (message: string) => {
  errorMessage.value = message;
  successMessage.value = null;
};

defineExpose({
  notifySuccess,
  notifyError,
});
</script>

<style scoped></style>
