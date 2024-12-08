<template>
  <div
    class="flex items-center"
    :class="props.align === 'end' ? 'flex-row-reverse' : ''"
  >
    <div
      class="bg-blue-500 text-white relative z-10 rounded-full flex items-center justify-center ring-offset-base-100 ring-offset-2"
      :class="[classAvatarSize, classAvatarPlaceholderSize]"
      :title="props.username"
    >
      <span v-if="!isImg" class="font-bold">
        {{ avatarPlaceholder }}
      </span>
      <img v-else-if="props.src" :src="props.src" :alt="props.username" />
    </div>

    <div
      v-if="props.username && props.chip"
      class="bg-gray-100 dark:bg-gray-900 relative z-0 p-1 text-gray-900 dark:text-white shadow-lg"
      :class="
        props.align === 'end' ? 'rounded-l-full -mr-4' : 'rounded-r-full -ml-4'
      "
    >
      <div :class="props.align === 'end' ? 'ml-8 mr-6' : 'mr-8 ml-6'">
        <p class="text-sm line-clamp-1">{{ props.username }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {{ props.from ?? $t('Unknown Location') }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TAvatarSize } from '~/types/utils/avatar';
import { getAvatarPlaceholderSize } from '~/utils/avatar';

const props = defineProps<{
  src?: string | null;
  username?: string;
  size?: TAvatarSize;
  chip?: boolean;
  from?: string | null;
  align?: 'start' | 'end';
}>();

const classAvatarSize = computed(() => getAvatarSize(props.size!));
const classAvatarPlaceholderSize = computed(() =>
  getAvatarPlaceholderSize(props.size!)
);

const isImg = computed(() => {
  return props.src ? true : false;
});

const username = computed(() => {
  return props.username ?? '';
});

const avatarPlaceholder = computed(() => {
  return username.value.substring(0, 2).toUpperCase();
});
</script>
