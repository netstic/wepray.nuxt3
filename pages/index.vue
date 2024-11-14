<template>
  <HomeNavHeader :show-start-btn="showStartBtn" />

  <main>
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
});

import { ref } from 'vue';

const showStartBtn = ref(false);
</script>
