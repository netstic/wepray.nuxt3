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
import { ref } from 'vue';

definePageMeta({
  layout: false,
  colorMode: 'light',
  middleware: () => {
    const { isGuestLoggedIn, isLoggedIn } = useAuth();
    if (isGuestLoggedIn.value || isLoggedIn.value) {
      return navigateTo('/pray');
    }
  },
});

const showStartBtn = ref(false);
</script>
