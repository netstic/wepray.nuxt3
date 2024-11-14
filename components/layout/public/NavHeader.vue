<template>
  <header
    class="fixed top-0 left-0 right-0 bg-white border-b-2 border-b-gray-200 z-50"
  >
    <nav class="container mx-auto px-4 py-2 public-layout-width">
      <div class="flex items-center justify-between">
        <a href="/" class="flex space-x-2 items-end">
          <LogoWp custom-class="w-9 h-9 text-blue-600" />
          <span class="text-2xl font-bold text-blue-600">WePray</span>
        </a>

        <div>
          <div class="md:flex hidden py-1 items-center space-x-2">
            <div class="dropdown dropdown-hover text-gray-700">
              <div
                tabindex="0"
                role="button"
                class="wp-btn hover:bg-stone-200 flex font-semibold text-sm wp-btn-ghost uppercase text-gray-400"
              >
                {{ $t('Site Language') }}: {{ $t('lang.' + locale) }}
                <IconChevronDown />
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li v-for="locale in availableLocales">
                  <a @click="setLocale(locale)">{{ $t('lang.' + locale) }}</a>
                </li>
              </ul>
            </div>

            <button
              @click="navigateTo('/login')"
              class="wp-btn bg-white hover:bg-stone-200 border border-gray-400 font-bold"
            >
              {{ $t('Login') }}
            </button>
            <button
              @click="navigateTo('/register')"
              class="wp-btn wp-btn-blue font-bold"
            >
              {{ $t('Get Started') }}
            </button>
          </div>

          <div class="md:hidden relative">
            <button @click="toggleMenu" class="rounded-full wp-btn-icon p-1">
              <IconMenuHamburger custom-class="text-blue-600 w-8 h-8" />
            </button>
            <ul
              v-if="isMenuOpen"
              class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 absolute -bottom-[8.3rem] right-0 shadow"
            >
              <li>
                <a @click="navigateTo('/login')">{{ $t('Login') }}</a>
              </li>
              <li>
                <a @click="navigateTo('/register')">{{ $t('Get Started') }}</a>
              </li>
              <li>
                <a @click="() => languageDialog?.showModal()"
                  >{{ $t('Site Language') }}: {{ $t('lang.' + locale) }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <dialog ref="languageDialog" class="modal">
      <div class="modal-box max-w-[15rem]">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <p v-for="locale in availableLocales" :key="locale" class="">
          <button @click="setLocale(locale)" class="btn btn-ghost w-full">
            {{ $t('lang.' + locale) }}
          </button>
        </p>
      </div>
    </dialog>
  </header>
</template>

<script setup lang="ts">
const { setLocale, availableLocales, locale } = useI18n();
const isMenuOpen = ref(false);
const languageDialog = ref<HTMLDialogElement | null>(null);

const toggleMenu = (event: MouseEvent) => {
  isMenuOpen.value = !isMenuOpen.value;
  event.stopPropagation();
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('resize', closeMenu);

  const handleClickOutside = (event: MouseEvent) => {
    const menu = document.querySelector('.dropdown-content');
    if (menu && !menu.contains(event.target as Node) && isMenuOpen.value) {
      closeMenu();
    }
  };

  document.addEventListener('click', handleClickOutside);

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', closeMenu);
});
</script>
