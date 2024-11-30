<template>
  <div v-if="successMessage || errorMessage">
    <!-- Success message -->
    <div
      v-if="successMessage && !errorMessage"
      class="mt-4 text-center text-sm text-green-600 dark:text-green-400"
    >
      {{ $t(successMessage) }}
    </div>
    <!-- Error message -->
    <div
      v-if="errorMessage && !successMessage"
      class="mt-4 text-center text-sm text-red-600 dark:text-red-400"
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
