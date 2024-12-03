<template>
  <button
    class="flex items-center relative focus:outline-none"
    :class="{
      'text-gray-600 dark:text-gray-400': !hasAnimated,
      'text-red-600 dark:text-red-400': hasAnimated,
    }"
  >
    <IconHandsPray class="mr-1" />
    <span>{{ props.prayerCount }}</span>

    <div
      v-if="isAnimating"
      class="absolute top-0 left-0 w-full h-full pointer-events-none"
    >
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="absolute rounded-full bg-red-500"
        :style="{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          opacity: particle.opacity,
          transform: `scale(${particle.scale})`,
          transition: `all ${animationDuration}ms ease-out`,
        }"
      ></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const props = withDefaults(
  defineProps<{
    prayerCount: number;
  }>(),
  {
    prayerCount: 0,
  }
);

const isAnimating = ref(false);
const hasAnimated = ref(false);
const particles = ref<any[]>([]);
const animationDuration = 1700;
let animationFrame: any;

const createParticle = (id: number) => ({
  id,
  x: 50 + (Math.random() - 0.5) * 30,
  y: 50 + (Math.random() - 0.5) * 30,
  size: Math.random() * 4 + 4,
  scale: 0,
  opacity: 1,
});

const startAnimation = () => {
  if (hasAnimated.value) return;

  isAnimating.value = true;
  hasAnimated.value = true;

  particles.value = Array.from({ length: 40 }, (_, i) => createParticle(i));
  requestAnimationFrame(() => {
    particles.value = particles.value.map((p) => ({
      ...p,
      x: p.x + (Math.random() - 0.5) * 170,
      y: p.y + (Math.random() - 0.5) * 300,
      scale: 1,
      opacity: 0,
    }));
  });

  const animationTimer = setTimeout(() => {
    isAnimating.value = false;
    clearTimeout(animationTimer);
  }, animationDuration);
};

defineExpose({
  startAnimation,
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
});
</script>
