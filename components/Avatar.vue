<template>
  <div
    class="flex items-center"
    :class="props.align === 'end' ? 'flex-row-reverse' : ''"
  >
    <div
      class="bg-white dark:bg-gray-800 relative z-10 rounded-full flex items-center justify-center ring-offset-base-100 ring-offset-2"
      :class="classAvatarSize"
      :title="props.username"
    >
      <span v-if="!isImg" class="text-3xl">
        {{ letter }}
      </span>
      <img v-else :src="props.src" :alt="props.username" />
    </div>

    <div
      v-if="props.username && props.chip"
      class="bg-gray-100 dark:bg-gray-900 relative z-0 p-1 text-gray-900 dark:text-white shadow-lg"
      :class="
        props.align === 'end' ? 'rounded-l-full -mr-4' : 'rounded-r-full -ml-4'
      "
    >
      <div :class="props.align === 'end' ? 'ml-8 mr-6' : 'mr-8 ml-6'">
        <p class="text-sm">{{ props.username }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400" v-if="props.from">
          {{ props.from }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TAvatarSize } from '~/types/utils/avatar';

const props = defineProps<{
  src?: string;
  username?: string;
  size?: TAvatarSize;
  chip?: boolean;
  from?: string;
  align?: 'start' | 'end';
}>();

const classAvatarSize = computed(() => getAvatarSize(props.size!));

const isImg = computed(() => {
  return props.src ? true : false;
});

const username = computed(() => {
  return props.username ?? '';
});

const letter = computed(() => {
  return username.value.substring(0, 2).toUpperCase();
});
</script>
