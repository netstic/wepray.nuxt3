<template>
  <!-- <div class="h-screen">
    <div
      v-if="loading"
      class="fixed left-0 top-0 h-full w-full z-[9999] bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
    >
      <LoaderNavigation />
    </div> -->

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- </div> -->
</template>

<script setup lang="ts">
// const nuxtApp = useNuxtApp();
// const loading = ref(false);
// nuxtApp.hook('page:start', () => {
//   console.log('page:start');
//   loading.value = true;
// });
// nuxtApp.hook('page:finish', () => {
//   loading.value = false;
// });
</script>

<style>
/* .fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */
</style>
