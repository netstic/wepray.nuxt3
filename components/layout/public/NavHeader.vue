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
            <NavHeaderDropdown
              class="hidden md:block text-gray-700"
              :show-start-btn="false"
              :label="`${$t('Site Language')}: ${$t('lang.' + locale)}`"
              :items="localeDropdownArray"
            />

            <button
              @click="navigateTo('/login')"
              class="wp-btn-full bg-white hover:bg-stone-200 border border-gray-400 font-bold"
            >
              {{ $t('Login') }}
            </button>
            <button
              @click="navigateTo('/register')"
              class="wp-btn-full wp-btn-blue font-bold"
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
              class="z-[1] dropdown-content cursor-pointer w-52 p-2 absolute -bottom-[10.0rem] right-0 shadow text-gray-600 bg-white dark:bg-gray-800"
            >
              <li
                v-for="(item, index) in menuArray"
                :key="index"
                class="wp-btn"
                @click="item.callback"
              >
                <span>{{ item.label }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="isLocaleDialogOpen" class="custom-dialog">
      <div class="rounded-lg bg-white dark:bg-gray-800 pt-4 pb-4 px-4 relative">
        <div
          class="absolute bg-white rounded-full p-2 cursor-pointer -top-4 -right-4"
          @click="closeLocaleDialog"
        >
          <IconX class="text-gray-600 dark:text-gray-400" />
        </div>
        <p v-for="locale in availableLocales" :key="locale">
          <button @click="setLocale(locale)" class="wp-btn w-full">
            {{ $t('lang.' + locale) }}
          </button>
        </p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { setLocale, availableLocales, locale, t } = useI18n();

const isMenuOpen = ref(false);
const isLocaleDialogOpen = ref(false);

const localeDropdownArray = computed(() =>
  availableLocales.map((locale) => ({
    label: t('lang.' + locale),
    callback: () => setLocale(locale),
  }))
);

const menuArray = computed(() => [
  {
    label: t('Login'),
    callback: () => navigateTo('/login'),
  },
  {
    label: t('Get Started'),
    callback: () => navigateTo('/register'),
  },
  {
    label: `${t('Site Language')}: ${locale.value.toUpperCase()}`,
    callback: () => openLocaleDialog(),
  },
]);

const toggleMenu = (event: MouseEvent) => {
  isMenuOpen.value = !isMenuOpen.value;
  event.stopPropagation();
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const openLocaleDialog = () => {
  isLocaleDialogOpen.value = true;
  closeMenu();
};

const closeLocaleDialog = () => {
  isLocaleDialogOpen.value = false;
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

<style lang="scss" scoped>
.custom-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
