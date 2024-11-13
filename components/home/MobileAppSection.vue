<template>
  <section class="py-24 relative z-40 bg-blue-600" ref="mobileAppSection">
    <div class="public-layout-padding public-layout-width mx-auto">
      <div
        class="flex flex-col lg:flex-row items-center relative text-center lg:text-start"
      >
        <div class="lg:w-1/2 mb-8 lg:mb-0">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            {{ $t('Take WePray Everywhere') }}
          </h2>
          <p class="text-xl text-blue-100 mb-8">
            {{
              $t(
                'Download our mobile app and stay connected with your prayer community anytime, anywhere.'
              )
            }}
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 items-center lg:justify-start justify-center"
          >
            <button
              class="bg-white w-full sm:w-auto text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
            >
              <svg
                class="w-6 h-6 inline-block mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.08-.46-2.07-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                />
              </svg>
              {{ $t('App Store') }}
            </button>
            <button
              class="bg-white w-full sm:w-auto text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
            >
              <svg
                class="w-6 h-6 inline-block mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.609-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.799-3.8l-2.301-2.301 8.634-8.634L13.696 3.4 2.76 9.733l-.001.001L0 11.196l2.76 1.464v.001l10.935 6.332 10.935-6.332 2.76-1.464-2.76-1.462-.008-.005-6.323-3.662z"
                />
              </svg>
              {{ $t('Google Play') }}
            </button>
          </div>
        </div>
        <div class="md:w-1/2 relative">
          <img
            src="https://via.placeholder.com/300x600/4299e1/ffffff?text=WePray+App"
            alt="PrayerConnect Mobile App"
            class="w-64 mx-auto"
            :style="{ transform: `translateY(${mobileAppOffset}px)` }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const mobileAppSection = ref();
const mobileAppOffset = ref(0);

const checkScroll = () => {
  if (mobileAppSection.value) {
    const rect = mobileAppSection.value.getBoundingClientRect();
    const offset = Math.max(
      0,
      Math.min(185, (window.innerHeight - rect.top) / 2)
    );
    mobileAppOffset.value = offset - 90;
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<style scoped></style>
