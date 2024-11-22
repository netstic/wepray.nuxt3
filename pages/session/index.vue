<template>
  <LayoutSessionMainContent title="Prayer Session" class="app-layout-width">
    <p class="text-xl font-semibold mb-4">What are you praying for today?</p>
    <!-- <button
      class="wp-btn-session-item-lg text-2xl justify-center"
      @click="navigateTo('/session/suggestions')"
    >
      Weekly Prayer
    </button> -->

    <div class="flex flex-col gap-4 sm:grid sm:grid-cols-2">
      <!-- <p class="text-xl font-semibold mb-4">What are you praying for today?</p> -->
      <button
        class="wp-btn-session-item text-2xl gap-2 justify-between"
        @click.self="navigateTo('/session/suggestions')"
      >
        Weekly Prayer
        <!-- select options 3, 5, 10, 20, custom -->
        <div class="flex flex-col">
          <label for="selectedOption" class="wp-input-label"
            >Number of Prayers</label
          >
          <select v-model="selectedOption" class="wp-input-sm">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </button>
      <button
        class="wp-btn-session-item text-2xl gap-2 justify-between"
        @click.self="navigateTo('/session/community')"
      >
        Community Prayers
        <div class="flex flex-col">
          <label for="selectedOption" class="wp-input-label"
            >Number of Prayers</label
          >
          <select v-model="selectedOption" class="wp-input-sm">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </button>
      <button class="wp-btn-session-item text-2xl justify-center">
        World Missions
      </button>
      <button class="wp-btn-session-item text-2xl justify-center">
        Family Intercessions
      </button>
      <button class="wp-btn-session-item text-2xl justify-center">
        Friends Intercessions
      </button>
    </div>
  </LayoutSessionMainContent>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'session',
  colorMode: 'dark',
  middleware: 'session',
});

const selectedOption = ref('3');
</script>
