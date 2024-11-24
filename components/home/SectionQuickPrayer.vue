<template>
  <section class="py-24 bg-gray-50">
    <div class="public-layout-width mx-auto public-layout-padding">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        {{ $t('Share a Quick Prayer') }}
      </h2>
      <div class="max-w-2xl mx-auto">
        <div class="flex flex-col gap-2">
          <WeprayFormTextarea
            v-model="quickPrayer"
            :placeholder="$t('Type your prayer here') + '...'"
            rows="2"
            textarea-class="w-full flex-grow wp-input resize-none overflow-hidden"
          />
          <button class="wp-btn wp-btn-blue" @click="submitQuickPrayer">
            {{ $t('Send') }}
          </button>
        </div>
      </div>
      <div class="mt-8 text-center">
        <p class="text-gray-600">
          {{ $t('Your prayer will be shared with our community') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const quickPrayer = ref('');

const submitQuickPrayer = () => {
  console.log('Prayer submitted:', quickPrayer.value);
  quickPrayer.value = '';
};
</script>
