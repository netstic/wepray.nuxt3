<template>
  <LayoutSessionHeader
    @click="hasWindowHistory ? $router.go(-1) : navigateTo('/session')"
  />
  <LayoutSessionMain>
    <LayoutSessionMainContent title="Prayer Session" class="app-layout-width">
      <div class="text-xl text-center font-semibold mb-2">
        <p>Let's pray together!</p>

        <p class="text-lg font-normal">Choose your path:</p>
      </div>

      <div class="flex flex-col gap-4">
        <button
          v-for="(item, itemId) in session"
          :key="itemId"
          class="wp-btn-session-item text-xl sm:text-2xl justify-center relative"
          @click="onSessionItemClick(itemId)"
        >
          <span>{{ $t(item.title) }}</span>
          <div
            v-if="item.count !== undefined"
            class="absolute bottom-0 right-2 flex items-center gap-1 justify-between"
          >
            <span
              @click="sessionStore.decrementSessionCount(itemId)"
              class="p-1 hover:text-red-500"
            >
              <IconMinusSquareRoundedOutline size="sm" />
            </span>
            <span>{{ item.count }}</span>
            <span
              @click="sessionStore.incrementSessionCount(itemId)"
              class="p-1 hover:text-green-500"
            >
              <IconPlusSquareRoundedOutline size="sm" />
            </span>
          </div>
        </button>
      </div>
    </LayoutSessionMainContent>
  </LayoutSessionMain>
</template>

<script setup lang="ts">
import { useSessionStore } from '~/store/session.store';

definePageMeta({
  layout: 'session',
  colorMode: 'dark',
  middleware: 'session',
});

const sessionStore = useSessionStore();
const { session } = storeToRefs(sessionStore);

const hasWindowHistory = ref(false);

const onSessionItemClick = (sessionItemId: number) => {
  sessionStore.setCurrentSessionItemId(sessionItemId);
  navigateTo(`/session/${sessionItemId}`);
};

onMounted(() => {
  if (window.history.length > 1) {
    hasWindowHistory.value = true;
  }
});
</script>
