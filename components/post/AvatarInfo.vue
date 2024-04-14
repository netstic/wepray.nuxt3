<template>
  <HoverCardRoot v-model:open="hoverState">
    <HoverCardTrigger
      class="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
      href="https://twitter.com/radix_ui"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Avatar username="A"></Avatar>
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        :side-offset="5"
      >
        <div class="flex flex-col gap-[7px]">
          <Avatar username="A" v-if="!loading"></Avatar>
          <div v-if="!loading" class="flex flex-col gap-[15px]">
            <div>
              <div
                class="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]"
              >
                Radix
              </div>
              <div class="text-mauve10 m-0 text-[15px] leading-[1.5]">
                @radix_ui
              </div>
            </div>
            <div class="text-mauve12 m-0 text-[15px] leading-[1.5]">
              Components, icons, colors, and templates for building
              high-quality, accessible UI. Free and open-source.
            </div>
            <div class="flex gap-[15px]">
              <div class="flex gap-[5px]">
                <div
                  class="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]"
                >
                  0
                </div>
                <div class="text-mauve10 m-0 text-[15px] leading-[1.5]">
                  Following
                </div>
              </div>
              <div class="flex gap-[5px]">
                <div
                  class="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]"
                >
                  2,900
                </div>
                <div class="text-mauve10 m-0 text-[15px] leading-[1.5]">
                  Followers
                </div>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-col gap-4 w-52">
            <div class="flex gap-4 items-center">
              <div class="skeleton w-16 h-16 rounded-full shrink-0"></div>
              <div class="flex flex-col gap-4">
                <div class="skeleton h-4 w-20"></div>
                <!-- <div class="skeleton h-4 w-28"></div> -->
              </div>
            </div>
            <div class="skeleton h-32 w-full"></div>
          </div>
        </div>

        <HoverCardArrow class="fill-white" :width="8" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>

<script setup lang="ts">
const hoverState = ref(false);

const loading = ref(false);

watchEffect(() => {
  //

  if (hoverState.value) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
});
</script>
