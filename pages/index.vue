<template>
  <LayoutPublicHeaderNav :show-start-btn="showStartBtn" />

  <main>
    <HomeHeroSection @is-start-btn-showing="showStartBtn = !$event" />

    <HomeQuickPrayerSection />

    <HomeFeaturesSection />

    <HomeTestimonialsSection />

    <HomeMobileAppSection />

    <HomeCTASection />
  </main>

  <LayoutPublicFooterNav />
</template>

<script setup>
import { ref } from 'vue';

const showStartBtn = ref(false);
</script>
