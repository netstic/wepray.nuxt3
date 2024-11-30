<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div>
    <h2>{{ props.error?.statusCode }}</h2>
    <h3>{{ props.error?.statusMessage }}</h3>
    <button @click="handleError">{{ $t('Go back home') }}</button>
  </div>
</template>
