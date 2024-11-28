<template>
  <LayoutSessionMainContent title="Prayer of the Week" class="app-layout-width">
    <div v-for="i in 4" :key="i" class="card">Card {{ i }}</div>
  </LayoutSessionMainContent>

  <ClientOnly>
    <Teleport to="#session-layout">
      <LayoutSessionFooter>
        <template #append>
          <button class="wp-btn-session-submit" @click="goNext">
            {{ !isStart ? 'Start' : 'Next' }}
          </button>
        </template>
      </LayoutSessionFooter>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'session',
  colorMode: 'dark',
  middleware: 'session',
});

const { sessionCookie, setSessionCookie } = useSession();

const isStart = ref(false);

const goNext = () => {
  if (isStart.value) {
    return setSessionCookie({
      ...sessionCookie.value,
      prayerCount: sessionCookie.value.prayerCount + 1,
    });
  }

  isStart.value = true;
};
</script>

<style scoped></style>
