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
    <path d="M12 13m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M12 10l0 3l2 0" />
    <path d="M7 4l-2.75 2" />
    <path d="M17 4l2.75 2" />
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
