<template>
  <div class="avatar placeholder">
    <div
      class="bg-neutral text-neutral-content rounded-full w-9 h-w-9 ring ring-primary ring-offset-base-100 ring-offset-2"
      :title="username"
    >
      <span v-if="!isImg" class="text-3xl">
        {{ letter }}
      </span>
      <img
        v-else
        :src="props.src"
        :alt="username"
        class="rounded-full w-9 h-w-9"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  src?: string;
  username?: string;
}>();

const isImg = computed(() => {
  return props.src ? true : false;
});

const username = computed(() => {
  return props.username ?? '';
});

const letter = computed(() => {
  return username.value.charAt(0).toUpperCase();
});
</script>
