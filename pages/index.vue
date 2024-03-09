<template>
  <div>
    <div
      v-if="!loggedInUser"
      class="flex justify-center items-center flex-col gap-8"
    >
      <!-- <div class="flex flex-wrap bg-white">
        <div
          class="order-last w-full flex items-center text-center lg:text-left pt-8 px-8 md:px-8 lg:w-1/2 sm:order-last md:order-none lg:order-none xl:order-none md:pt-0 xl:pt-0"
        >
          <post-show-partial></post-show-partial>
        </div>
        <HomeLoginPartial></HomeLoginPartial>
        <login-partial
          class="w-full flex items-center text-center lg:text-left px-8 md:px-8 lg:w-1/2"
        ></login-partial>
      </div> -->

      <div class="hero max-w-[1024px] my-auto mb-32">
        <div class="hero-content flex-col-reverse lg:flex-row-reverse">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold">
              <span class="text-primary font-medium"> Junte-se a nós em </span>
              oração <span class="text-primary font-medium">e</span> conexão!
            </h1>
            <p class="py-6">
              Porque, onde estiverem dois ou três reunidos em meu nome, aí estou
              eu no meio deles.
              <span class="flex justify-end font-mono text-xs">
                Mateus 18:20
              </span>
            </p>
            <div class="px-4 h-[280px]">
              <LazyHomeCardPosts></LazyHomeCardPosts>
            </div>
          </div>
          <HomeLoginPartial></HomeLoginPartial>
        </div>
      </div>
      <div class="clear-both"></div>
      <div class="hero max-w-[1024px] mb-10">
        <div
          class="hero-content items-start grid grid-cols-1 gap-4 lg:grid-cols-8 lg:gap-8 mx-auto"
        >
          <HomeRegisterPartial class="col-span-3"></HomeRegisterPartial>
          <HomeCardCreatePostPartial
            class="col-span-5"
          ></HomeCardCreatePostPartial>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Home',
  htmlAttrs: {
    'data-theme': 'wp',
  },
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Home page',
    },
  ],
});
const route = useRoute();
const loggedInUser = ref(false);
</script>
