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
        <IconArrowLeft class="h-6 w-6" />
      </button>
      <template v-if="props.progress">
        <div
          class="mx-4 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"
        >
          <div
            class="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            :style="{
              width: `${Math.min(Math.max(props.progress.barWidth, 0), 100)}%`,
            }"
          ></div>
        </div>
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="font-semibold"
            >{{ props.progress.todayGoalCount }} /
            {{ props.progress.dailyGoalCount }}</span
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
  barWidth: number;
  todayGoalCount: number;
  dailyGoalCount: number;
}

const props = defineProps<{
  progress?: ILayoutSessionHeaderProgress;
}>();

const emit = defineEmits<{
  back: [value: void];
}>();

const isScrolled = ref(false);

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
