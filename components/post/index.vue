<template>
  <div>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <header class="card-title justify-between">
          <div class="flex flex-row items-center justify-between gap-4">
            <!-- <div class="avatar placeholder">
              <div
                class="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 text-primary"
              >
                x
              </div>
            </div> -->
            <PostAvatarInfo :item="item"></PostAvatarInfo>

            <div class="flex flex-col gap-0.5">
              <div>@{{ username }}</div>
              <div>
                <time
                  datetime="2021-01-01"
                  class="text-xs text-gray-500 font-sans font-normal"
                >
                  {{
                    useDateTime(item?.created_at?.toString()) ??
                    ' 8 de abr de 2024'
                  }}
                </time>
              </div>
            </div>
          </div>
          <div>
            <div>
              <button class="btn btn-circle btn-ghost">
                <IconFavorite class="w-6"></IconFavorite>
              </button>
            </div>
            <!-- <img
              v-if="item.user && item.user.avatar"
              class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              :src="item.user && item.user.avatar"
              alt="avatar"
            /> -->
          </div>
        </header>

        <component :is="bodyCurrentComponent" :item="item"></component>

        <div class="card-actions justify-between">
          <div>
            <div class="tooltip" data-tip="pay">
              <button class="btn btn-circle hover:btn-primary">
                <div class="badge absolute -mt-8 -mr-8">
                  {{ item.counter ?? 0 }}
                </div>
                <IconPray class="stroke-white h-5 w-5"></IconPray>
              </button>
            </div>
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
import {
  EPostType,
  TPostViewType,
  type IPost,
  type IPostText,
} from '~/types/post/post';

import bodyText from './bodyText.vue';
const bodyComponents: Record<TPostViewType | string, string | any> = {
  [TPostViewType.Text]: bodyText,
};

interface IProps {
  item: IPost;
}
const props = defineProps<IProps>();

const bodyCurrentComponent = computed(() => {
  return bodyComponents[props.item?.view_type ?? TPostViewType.Text];
});

const username = computed(() => {
  return props.item?.user?.username ?? 'Anonymous';
});
</script>
