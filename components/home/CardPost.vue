<template>
  <div>
    <div class="card bg-base-100 shadow-xl w-screen min-w-lg max-w-lg">
      <div class="card-body">
        <h2 class="card-title justify-between">
          <div>@{{ item?.user?.username }}</div>
          <div>
            <!-- <img
              v-if="item.user && item.user.avatar"
              class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              :src="item.user && item.user.avatar"
              alt="avatar"
            /> -->
            <div class="avatar placeholder">
              <!-- <div class="bg-primary-content text-primary rounded-full w-16">
                <span class="text-md">AI</span>
              </div> -->
              <div
                class="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 text-primary"
              >
                <img
                  v-if="isShowImg"
                  class="w-9 h-w-9 object-cover rounded-full"
                  :src="item.user && item.user.avatar"
                  alt="avatar"
                />
                <template v-else>
                  {{ (item.user?.username ?? ' ')?.slice(0, 2) ?? '' }}
                </template>
              </div>
            </div>
          </div>
        </h2>

        <div
          class="h-56 overflow-hidden text-wrap flex items-center"
          :class="bodyTextSize"
        >
          {{ item?.text?.body ?? '' }}
        </div>
        <div class="card-actions justify-between">
          <div>
            <button class="btn btn-circle hover:btn-primary">
              <div class="badge absolute -mt-8 -mr-8">
                {{ item.counter ?? 0 }}
              </div>
              <IconPray class="stroke-white h-5 w-5"></IconPray>
            </button>
          </div>
          <div>
            <slot name="nav"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IPostPublic } from '~/types/post/public';

interface Props {
  item: IPostPublic;
}

const props = defineProps<Props>();

const isShowImg = computed(() => {
  console.log('item?.user?.img_show', props.item?.user?.img_show);
  return props.item?.user?.img_show ?? false;
});

const body = computed(() => {
  return props.item?.text?.body ?? '';
});

const bodyTextSize = computed(() => {
  // 592
  // 300
  // 150
  // 50
  // 10

  const size = body.value.length;
  switch (true) {
    case size > 500:
      return 'text-xs';
    case size > 300:
      return 'text-sm';
    case size > 150:
      return 'text-base';
    case size > 50:
      return 'text-lg';
    default:
      return 'text-xl';
  }

  return body.value.length > 50 ? 'text-lg' : 'text-xl';
});
</script>
