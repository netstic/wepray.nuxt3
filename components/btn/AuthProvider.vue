<template>
  <button
    class="w-full inline-flex items-center gap-1 justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <template v-if="!props.isLoading">
      <slot></slot>
    </template>
    <LoaderSubmit v-else />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean;
}>();
</script>

<style scoped></style>
