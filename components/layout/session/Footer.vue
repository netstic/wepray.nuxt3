<template>
  <footer
    :class="[
      'fixed z-[9000] bottom-0 right-0 left-0 bg-gray-100 dark:bg-gray-900 sm:border-t border-gray-300 dark:border-gray-700',
      { 'border-t': !isScrolledUp },
    ]"
  >
    <div
      class="app-layout-width mx-auto app-layout-padding flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between my-4 sm:my-10"
    >
      <slot v-if="!$slots.prepend && !$slots.append"></slot>
      <template v-else>
        <div class="w-full text-start pl-0 sm:pl-4 lg:pl-0">
          <slot name="prepend"> </slot>
        </div>
        <div class="w-full text-end pr-0 sm:pr-4 lg:pr-0">
          <slot name="append"> </slot>
        </div>
      </template>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolledUp = ref(true);

const checkScrollPosition = () => {
  isScrolledUp.value =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
};

onMounted(() => {
  window.addEventListener('scroll', checkScrollPosition);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollPosition);
});
</script>

<style scoped></style>
