<template>
  <section class="py-16 bg-gray-50">
    <div class="public-layout-padding public-layout-width mx-auto text-center">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        {{ $t('Ready to Start Your Prayer Journey?') }}
      </h2>
      <button
        @click="navigateTo('/register')"
        class="px-8 py-4 bg-blue-600 text-white font-bold rounded-full text-lg hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
      >
        {{ $t('Join WePray Now') }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
