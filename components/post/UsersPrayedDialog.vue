<template>
  <WeprayDialog v-model="isOpen">
    <h2 class="text-lg font-bold">Users Prayed</h2>
    <LoaderButtonSubmit v-if="isLoading" />
    <div v-else class="space-y-4 mt-4 max-h-[40vh] overflow-y-auto">
      <div
        v-for="(user, userIndex) in usersPrayed"
        :key="userIndex"
        class="flex items-center gap-2"
      >
        <Avatar size="sm" :username="user.name" :alt="user.name" />
        <p>{{ user.name }}</p>
      </div>
    </div>
  </WeprayDialog>
</template>

<script setup lang="ts">
import { getUsersPrayedService } from '~/services/post/post';

const isOpen = ref(false);
const isLoading = ref(false);
const usersPrayed = ref<{ id: number; name: string }[]>([]);

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
