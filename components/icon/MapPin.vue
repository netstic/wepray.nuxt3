<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    :class="props.customClass ?? [classIconSize, 'icon-default']"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
    />
  </svg>
</template>

<script setup lang="ts">
import type { TCustomClass, TIconSize } from '~/types/utils/icon';

const props = defineProps<{
  customClass?: TCustomClass;
  size?: TIconSize;
}>();

const classIconSize = computed(() => getIconSize(props.size!));
</script>

<style scoped></style>
