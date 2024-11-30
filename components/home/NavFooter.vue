<template>
  <footer class="bg-white border-t border-gray-200 py-8 w-full">
    <div class="mx-auto public-layout-padding public-layout-width">
      <div class="grid grid-cols-3 gap-4">
        <div>
          <p class="mb-4 text-gray-600">{{ $t('Languages') }}</p>
          <ul class="space-y-2 text-gray-400">
            <li
              v-for="lang in availableLocales"
              :key="lang"
              class="cursor-pointer"
              @click="setLocale(lang)"
            >
              {{ $t('lang.' + lang) }}
            </li>
          </ul>
        </div>

        <div>
          <p class="mb-4 text-gray-600">{{ $t('About us') }}</p>
          <ul class="space-y-2 text-gray-400">
            <li>
              <NuxtLink to="/our-mission">{{ $t('Our mission') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/team">{{ $t('Team') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact">{{ $t('Contact us') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-gray-600 mb-4">{{ $t('Privacy and terms') }}</p>
          <ul class="space-y-2 text-gray-400">
            <li>
              <NuxtLink to="/terms">{{ $t('Terms') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy">{{ $t('Privacy') }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- <div class="block sm:table-cell mb-5">
          <p class="uppercase text-grey sm:mb-2">&nbsp;</p>
          <a
            href="https://www.revivalandreformation.org/"
            target="_black"
            rel="noreferrer noopener"
          >
            <img
              src="https://euoro.wepray.org/img/R-R-Logo.png"
              alt="REVIVAL & REFORMATION"
              title="REVIVAL & REFORMATION"
            />
          </a>
        </div> -->

      <!-- <a
                href="https://revivalandreformation.org/uip/blog"
                target="_black"
                class="text-grey hover:text-grey-dark"
                rel="noreferrer noopener"
              >
                {{ $t('Official Blog') }}
              </a> -->
    </div>
  </footer>
</template>
<script setup lang="ts">
const { setLocale, availableLocales } = useI18n();
</script>
