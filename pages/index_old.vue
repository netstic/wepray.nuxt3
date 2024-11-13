<template>
  <div>
    <div
      v-if="!loggedInUser"
      class="flex justify-center items-center flex-col gap-8"
    >
      <!-- <button
        class="btn"
        @click="login('paulo.pcbr+teste@gmail.com', 'password')"
      >
        Login
      </button>
      {{ user }} -->
      <div class="hero layout-public-content-wrapper my-auto mb-32">
        <div
          class="hero-content items-start grid grid-cols-1 gap-4 lg:grid-cols-11 lg:gap-8 mx-auto"
        >
          <!-- <HomeLoginPartial class="col-span-4"></HomeLoginPartial> -->
          <div class="text-center lg:text-left col-span-11">
            <h1 class="text-5xl font-bold text-center">
              <span class="text-primary font-medium"> Junte-se a nós em </span>
              oração <span class="text-primary font-medium">e</span> conexão!
            </h1>
            <p class="py-6 text-center">
              Porque, onde estiverem dois ou três reunidos em meu nome, aí estou
              eu no meio deles.
              <span class="flex justify-end font-mono text-xs">
                Mateus 18:20
              </span>
            </p>
            <p class="flex items-center justify-center p-8 gap-6">
              <button
                class="btn btn-primary w-44"
                @click="navigateTo('/register')"
              >
                Iniciar a oração
              </button>
              <button class="btn w-44" @click="navigateTo('/login')">
                Já tenho uma conta
              </button>
            </p>
            <div class="mt-10 p-4 h-[480px] flex items-start justify-center">
              <LazyHomeCardPosts class="w-[500px]"></LazyHomeCardPosts>
            </div>
          </div>
        </div>
      </div>
      <div class="clear-both"></div>
      <!-- <div class="hero max-w-[1024px] mb-10">
        <div
          class="hero-content items-start grid grid-cols-1 gap-4 lg:grid-cols-11 lg:gap-8 mx-auto"
        >
          <HomeRegisterPartial class="col-span-4"></HomeRegisterPartial>
          <HomeCardCreatePostPartial
            class="col-span-7"
          ></HomeCardCreatePostPartial>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Pessoas que amam orar - WePray',
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

const loggedInUser = ref(false);
</script>
