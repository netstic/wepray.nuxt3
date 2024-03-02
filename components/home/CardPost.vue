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
              <div class="bg-primary-content text-primary rounded-full w-16">
                <span class="text-md">AI</span>
              </div>
            </div>
          </div>
        </h2>

        <div class="h-56 overflow-hidden text-wrap">
          {{ item?.text?.body ?? '' }}
        </div>
        <div class="card-actions justify-between">
          <div>
            <button class="btn">
              Pray
              <div class="badge">{{ item.counter ?? 0 }}</div>
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

const { item } = defineProps<Props>();
</script>
