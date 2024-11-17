<template>
  <header
    class="fixed top-0 left-0 right-0 bg-white border-b-2 border-b-gray-200 z-50"
  >
    <nav class="container mx-auto px-4 py-2 public-layout-width">
      <div
        :class="{
          'justify-between': props.showStartBtn,
          'justify-center lg:justify-between': !props.showStartBtn,
        }"
        class="flex items-center"
      >
        <a href="/" class="flex space-x-2 items-end">
          <LogoWp custom-class="w-9 h-9 text-blue-600" />
          <span
            class="text-2xl font-bold text-blue-600"
            :class="{ 'hidden md:block': props.showStartBtn }"
            >WePray</span
          >
        </a>

        <NavHeaderDropdown
          :show-start-btn="props.showStartBtn"
          :label="`${$t('Site Language')}: ${$t('lang.' + locale)}`"
          :items="localeDropdownArray"
        />

        <button
          v-if="showStartBtn"
          @click="navigateTo('/welcome')"
          class="wp-btn-full wp-btn-blue font-bold"
        >
          {{ $t('Get Started') }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { setLocale, availableLocales, locale, t } = useI18n();

const props = defineProps<{
  showStartBtn: boolean;
}>();

const localeDropdownArray = computed(() =>
  availableLocales.map((locale) => ({
    label: t('lang.' + locale),
    callback: () => setLocale(locale),
  }))
);
</script>
