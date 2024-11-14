<template>
  <section class="py-24">
    <div class="public-layout-width mx-auto public-layout-padding">
      <h2
        class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16"
      >
        {{ $t('Why Join WePray?') }}
      </h2>
      <div class="grid md:grid-cols-3 gap-12">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="text-center space-y-4"
        >
          <div
            class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
          >
            <svg
              class="w-8 h-8 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path :d="feature.icon" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

const features = [
  {
    icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    title: t('Share Your Heart'),
    description: t(
      'Submit prayer requests and receive support from a caring community'
    ),
  },
  {
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    title: t('Connect with Others'),
    description: t(
      'Join a global community of believers supporting each other'
    ),
  },
  {
    icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    title: t('Track Your Journey'),
    description: t('See how God works through prayers and testimonies'),
  },
];
</script>

<style scoped></style>
