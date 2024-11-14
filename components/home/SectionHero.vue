<template>
  <section
    class="mt-20 mx-auto public-layout-padding bg-white dark:bg-gray-900 sm:pt-10 pb-12 md:py-32 public-layout-width"
  >
    <div
      class="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center lg:text-start text-center"
    >
      <div
        class="gap-4 flex flex-col items-center lg:items-start relative z-10"
      >
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight"
        >
          {{ $t('Connect Through Prayer Every Day') }}
        </h1>
        <p class="text-xl text-gray-600 max-w-[620px]">
          {{
            $t(
              'Join millions of people sharing prayers, supporting each other, and growing in faith together.'
            )
          }}
        </p>
        <div class="space-y-4 mt-4">
          <div class="space-x-2">
            <button
              ref="startBtn"
              @click="navigateTo('/register')"
              class="py-6 px-2 rounded-full wp-btn-lg wp-btn-blue font-bold text-lg hover:scale-105 transition-all"
            >
              {{ $t('Get Started') }}
            </button>

            <button
              ref="startBtn"
              @click="navigateTo('/login')"
              class="wp-btn-full wp-btn-lg wp-btn-plain text-lg hover:scale-105 transition-all"
            >
              {{ $t('Login') }}
            </button>
          </div>
          <p class="text-gray-500 text-sm">
            {{ $t('100% free • No ads • Spread love through prayer') }}
          </p>
        </div>
      </div>
      <div class="relative mt-12">
        <div
          ref="smallCircle"
          :style="{
            transform: `translate(${circlePosition.x}px, ${circlePosition.y}px)`,
          }"
          class="absolute w-32 h-32 md:w-60 md:h-60 bg-blue-100 rounded-full opacity-50"
        ></div>
        <div class="relative z-10 flex justify-end items-center">
          <div
            class="w-48 h-48 md:w-80 md:h-80 bg-blue-600 rounded-full flex items-center justify-center"
          >
            <LogoWp
              custom-class="w-24 h-24 md:w-48 md:h-48 text-white animate-pulse"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  isStartBtnShowing: [value: boolean];
}>();

const startBtn = ref(null);
const smallCircle = ref(null);
const circlePosition = ref({ x: 10, y: -50 });
let animationFrameId: number | null = null;
let timeoutId: NodeJS.Timeout | null = null;

const isStartBtnVisible = ref(true);

const moveCircle = () => {
  if (!smallCircle.value) return;

  const angle = Math.random() * Math.PI * 2;
  const distance = 500;
  const newX = Math.cos(angle) * distance;
  const newY = Math.sin(angle) * distance;

  circlePosition.value = {
    x: circlePosition.value.x + newX / 10,
    y: circlePosition.value.y + newY / 10,
  };

  const maxDistance = 100;
  const currentDistance = Math.sqrt(
    circlePosition.value.x ** 2 + circlePosition.value.y ** 2
  );
  if (currentDistance > maxDistance) {
    const scale = maxDistance / currentDistance;
    circlePosition.value.x *= scale;
    circlePosition.value.y *= scale;
  }

  timeoutId = setTimeout(() => {
    animationFrameId = requestAnimationFrame(moveCircle);
  }, 3000);
};

const startAnimation = () => {
  animationFrameId = requestAnimationFrame(moveCircle);
};

const stopAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
};

useIntersectionObserver(
  startBtn,
  ([{ isIntersecting }]) => {
    isStartBtnVisible.value = isIntersecting;
    emit('isStartBtnShowing', isIntersecting);
  },
  { rootMargin: '-60px 0px 0px 0px' }
);

useIntersectionObserver(
  smallCircle,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      startAnimation();
    } else {
      stopAnimation();
    }
  },
  { rootMargin: '-60px 0px 0px 0px' }
);
</script>

<style scoped>
.absolute {
  transition: transform 2s ease-out;
}
</style>
