<template>
  <WeprayDialog v-model="isOpen">
    <h2
      class="text-lg text-gray-700 dark:text-white font-bold text-center border-b border-b-gray-200 dark:border-b-gray-700"
    >
      {{ $t('Prayers') }}
    </h2>
    <LoaderButtonSubmit v-if="isLoading" />
    <div v-else class="space-y-4 mt-4 max-h-[40vh] overflow-y-auto px-2">
      <div
        v-for="(user, userIndex) in usersPrayed"
        :key="userIndex"
        class="flex items-center gap-2"
      >
        <Avatar size="sm" :username="user.name" :alt="user.name" />
        <p>{{ user.name }}</p>
        <div
          class="flex items-center text-sm bg-gray-100 dark:bg-gray-600 rounded-full px-2 py-1"
        >
          <IconHandsPray size="sm" class="mr-1" />
          <span>{{ user.counter }}</span>
        </div>
      </div>
    </div>
  </WeprayDialog>
</template>

<script setup lang="ts">
import { getUsersPrayedService } from '~/services/post/post';
import type { IPostUserPrayed } from '~/types/post/post';

const isOpen = ref(false);
const isLoading = ref(false);
const usersPrayed = ref<IPostUserPrayed[]>([]);

const openDialog = (postId: number) => {
  isOpen.value = true;
  isLoading.value = true;

  getUsersPrayedService(postId)
    .then(({ data }) => {
      usersPrayed.value = data.data;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const closeDialog = () => {
  isOpen.value = false;
  isLoading.value = false;
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style scoped></style>
