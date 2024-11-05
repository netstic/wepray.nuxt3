<template></template>
<script setup>
definePageMeta({
  middleware: (from) => {
    return navigateTo('/terms/en');
  },
});
</script>
