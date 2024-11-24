<template>
  <HomeNavHeader :show-start-btn="showStartBtn" />

  <main class="bg-white">
    <HomeSectionHero @is-start-btn-showing="showStartBtn = !$event" />

    <HomeSectionQuickPrayer />

    <HomeSectionFeatures />

    <HomeSectionTestimonials />

    <HomeSectionMobileApp />

    <HomeSectionCTA />
  </main>

  <HomeNavFooter />
</template>

<script setup>
definePageMeta({
  layout: false,
  colorMode: 'light',
  middleware: (from) => {
    if (useCookie('welcome').value) {
      return navigateTo('/pray');
    }
  },
});

import { ref } from 'vue';

const showStartBtn = ref(false);
</script>
