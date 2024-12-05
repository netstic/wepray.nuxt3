<template>
  <div class="relative inline-block">
    <div
      ref="triggerRef"
      class="relative z-50"
      @mouseenter="show"
      @mouseleave="hide"
    >
      <slot />
    </div>

    <Transition name="tooltip">
      <div
        v-if="isVisible"
        ref="tooltipRef"
        class="absolute z-40 px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap"
        :class="positionClasses"
      >
        {{ text }}
        <div
          class="absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45"
          :class="arrowClasses"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
  delay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  offset: 8,
});

const isVisible = ref(false);
const triggerRef = ref<HTMLElement>();
const tooltipRef = ref<HTMLElement>();
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

const positionClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return `-top-2 left-1/2 -translate-x-1/2 -translate-y-full`;
    case 'right':
      return `top-1/2 -right-2 translate-x-full -translate-y-1/2`;
    case 'bottom':
      return `-bottom-2 left-1/2 -translate-x-1/2 translate-y-full`;
    case 'left':
      return `top-1/2 -left-2 -translate-x-full -translate-y-1/2`;
    default:
      return '';
  }
});

const arrowClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2';
    case 'right':
      return 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2';
    case 'bottom':
      return 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2';
    case 'left':
      return 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2';
    default:
      return '';
  }
});

const show = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
  isVisible.value = true;
};

const hide = () => {
  closeTimeout = setTimeout(() => {
    if (closeTimeout) {
      isVisible.value = false;
    }
  }, props.delay ?? 100);
};
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
