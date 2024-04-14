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
            <PostAvatarInfo></PostAvatarInfo>

            <div class="flex flex-col gap-0.5">
              <div>@{{ item?.user?.username ?? 'Anonymous' }}</div>
              <div>
                <time
                  datetime="2021-01-01"
                  class="text-xs text-gray-500 font-sans font-normal"
                >
                  {{ item?.created_at ?? ' 8 de abr de 2024' }}
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

        <div class="h-56 overflow-hidden text-wrap flex items-center">
          {{ item?.body ?? '' }}
        </div>
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
const hoverState = ref(false);
interface IProps {
  item:
    | {
        id: number;
        title: string;
        body: string;
      }
    | any;
}

const props = defineProps<IProps>();
</script>
