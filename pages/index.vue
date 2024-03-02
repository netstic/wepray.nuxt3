<template>
  <div>
    <div
      v-if="!loggedInUser"
      class="flex justify-center items-center flex-col gap-4"
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

      <div class="hero max-w-[1024px] my-auto mb-10">
        <div class="hero-content flex-col lg:flex-row-reverse">
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
            <div class="px-4">
              <LazyHomeCardPosts></LazyHomeCardPosts>
            </div>
          </div>
          <HomeLoginPartial></HomeLoginPartial>
        </div>
      </div>

      <br />
      <section id="section-post-register w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="60"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          class="svg-page2"
        >
          <path d="M0 0 C 60 20 40 150 100 -8 Z"></path>
        </svg>
        <div class="flex flex-wrap mb-10">
          <create-post-partial
            class="w-full flex items-center text-center lg:text-left px-3 md:px-8 lg:w-1/2"
          ></create-post-partial>

          <register-partial
            class="w-full flex items-center text-center mt-5 lg:text-left px-3 md:px-8 lg:w-1/2"
          ></register-partial>
        </div>
        <br />
        <br />
        <br />
        <br />
      </section>
    </div>
    <client-only>
      <home-rank-posts v-if="loggedInUser"> </home-rank-posts>
    </client-only>
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
