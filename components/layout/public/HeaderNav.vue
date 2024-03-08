<template>
  <div>
    <div>
      <header id="warp-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="100%"
          height="100"
          class="bg-top"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 25 C 60 60 40 150 100 -8 Z"></path>
        </svg>
        <div
          class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 max-w-[1024px]"
        >
          <div class="pl-4 flex items-center">
            <a
              href="/"
              class="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl items-center"
            >
              <LogoWp :width="300" :height="84.23"></LogoWp>
            </a>
          </div>
          <div class="block lg:hidden pr-4">
            <button
              id="nav-toggle"
              class="flex items-center px-3 py-2 border rounded text-white border-gray-100 hover:text-gray-200 hover:border-teal-500 appearance-none focus:outline-none"
              @click="toggleNavbar"
            >
              <svg
                v-if="!showMenu"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-current h-3 w-3"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
              <svg
                v-if="showMenu"
                style="width: 16px; height: 16px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3,16.74L7.76,12L3,7.26L7.26,3L12,7.76L16.74,3L21,7.26L16.24,12L21,16.74L16.74,21L12,16.24L7.26,21L3,16.74M12,13.41L16.74,18.16L18.16,16.74L13.41,12L18.16,7.26L16.74,5.84L12,10.59L7.26,5.84L5.84,7.26L10.59,12L5.84,16.74L7.26,18.16L12,13.41Z"
                />
              </svg>
            </button>
          </div>
          <div
            id="nav-content"
            :class="{ hidden: !showMenu, block: showMenu }"
            class="w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 text-blue-100 p-4 lg:p-0 z-20 animate__bounceInDown"
          >
            <ul class="list-reset lg:flex justify-end flex-1 items-center">
              <li class="mr-3">
                <a
                  class="inline-block py-2 px-4 font-bold no-underline toggleColour rounded-md"
                  href="/#"
                >
                  <i class="mdi mdi-home"></i> {{ $t('Home') }}
                </a>
              </li>
              <li class="mr-3">
                <nuxt-link
                  class="inline-block py-2 px-4 font-bold no-underline toggleColour rounded-md"
                  to="/explore"
                >
                  <i class="mdi mdi-compass"></i> {{ $t('Explore') }}
                </nuxt-link>
              </li>
              <li class="mr-3">
                <nuxt-link
                  class="inline-block py-2 px-4 font-bold no-underline toggleColour rounded-md"
                  to="/login"
                >
                  <i class="mdi mdi-login-variant"></i> {{ $t('Login') }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <svg
        class="bg-sub-top"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0 0 C 60 100 40 100 120 -2 Z"></path>
      </svg>
    </div>
  </div>
</template>
<script setup lang="ts">
const showMenu = ref(false);

const toggleNavbar = () => {
  showMenu.value = !showMenu.value;
};
</script>
