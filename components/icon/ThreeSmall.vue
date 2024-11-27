<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="props.customClass ?? [classIconSize, 'icon-default']"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M10 8h2.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-2.5"
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
