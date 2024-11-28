<template>
  <header
    :class="[
      'fixed z-[8888] top-0 left-0 right-0 dark:bg-gray-900 bg-gray-100',
      { 'border-b border-gray-300 dark:border-gray-700': isScrolled },
    ]"
  >
    <div
      class="app-layout-width mx-auto app-layout-padding h-16 flex items-center justify-between"
    >
      <button
        @click="emit('back')"
        class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <IconX class="h-6 w-6" />
      </button>
      <template v-if="props.progress">
        <div
          class="mx-4 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
        >
          <div
            class="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            :style="{
              width: barWidth + '%',
            }"
          ></div>
        </div>
        <div class="flex items-center">
          <IconHandsPray class="text-blue-600 dark:text-blue-400 mr-2" />
          <span class="font-semibold"
            >{{ props.progress.current }} / {{ props.progress.total }}</span
          >
        </div>
      </template>
      <slot v-else></slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

export interface ILayoutSessionHeaderProgress {
  current: number;
  total: number;
}

const props = defineProps<{
  progress?: ILayoutSessionHeaderProgress;
}>();

const emit = defineEmits<{
  back: [value: void];
}>();

const isScrolled = ref(false);

const barWidth = computed(() => {
  if (
    props.progress?.current !== undefined &&
    props.progress?.total !== undefined
  ) {
    const progressPercentage =
      (props.progress.current / props.progress.total) * 100;
    return Math.min(Math.max(progressPercentage, 0), 100);
  }
  return 0;
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Add any additional styles for the border if needed */
</style>
