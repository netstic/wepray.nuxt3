<template>
  <div>
    <slot></slot>

    <ApplicationDailyGoalModal ref="dailyGoalModalRef" />
  </div>
</template>

<script setup lang="ts">
import type { ApplicationDailyGoalModal } from '#build/components';

const dailyGoalModalRef = ref<InstanceType<typeof ApplicationDailyGoalModal>>();

onMounted(() => {
  const { guest } = useAuth();
  if (!guest.value?.daily_goal) {
    dailyGoalModalRef.value?.openModal();
  }
});
</script>

<style scoped></style>
