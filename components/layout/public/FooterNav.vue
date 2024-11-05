<template>
  <footer class="bg-white py-8 w-full">
    <div class="mx-auto px-8 layout-public-content-wrapper">
      <div class="table w-full">
        <div class="block sm:table-cell mb-5">
          <p class="uppercase text-grey text-sm sm:mb-2">&nbsp;</p>
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
        </div>
        <div class="block sm:table-cell">
          <p class="uppercase text-grey text-sm sm:mb-6">{{ $t('Legal') }}</p>
          <ul class="list-reset text-xs mb-6">
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <nuxt-link class="text-grey hover:text-grey-dark" to="/terms">
                {{ $t('Terms of Use') }}
              </nuxt-link>
            </li>
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <nuxt-link class="text-grey hover:text-grey-dark" to="/privacy">
                {{ $t('Privacy policy') }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="block sm:table-cell">
          <p class="uppercase text-grey text-sm sm:mb-6">Company</p>
          <ul class="list-reset text-xs mb-6">
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <a
                href="https://revivalandreformation.org/uip/blog"
                target="_black"
                class="text-grey hover:text-grey-dark"
                rel="noreferrer noopener"
              >
                {{ $t('Official Blog') }}
              </a>
            </li>
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <nuxt-link to="/aboutus" class="text-grey hover:text-grey-dark">{{
                $t('About Us')
              }}</nuxt-link>
            </li>
            <li class="mt-2 inline-block mr-2 sm:block sm:mr-0">
              <nuxt-link class="text-grey hover:text-grey-dark" to="/contactus">
                {{ $t('Contact Us') }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  <!-- <footer class="footer p-10 bg-base-200 text-base-content">
    <aside class="flex justify-center items-center text-center">
      <a
        href="https://www.revivalandreformation.org/"
        target="_black"
        rel="noreferrer noopener"
        class="m-auto"
      >
        <img
          src="https://euoro.wepray.org/img/R-R-Logo.png"
          alt="REVIVAL & REFORMATION"
          title="REVIVAL & REFORMATION"
        />
      </a>
    </aside>
    <nav>
      <h6 class="footer-title">{{ $t('Legal') }}</h6>
      <nuxt-link class="link link-hover" to="/terms">
        {{ $t('Terms of Use') }}
      </nuxt-link>
      <nuxt-link class="link link-hover" to="/privacy">
        {{ $t('Privacy policy') }}
      </nuxt-link>
    </nav>
    <nav>
      <h6 class="footer-title">{{ $t('Company') }}</h6>
      <a class="link link-hover">{{ $t('About us') }}</a>
      <a class="link link-hover">{{ $t('Contact') }}</a>
      <a class="link link-hover">{{ $t('Jobs') }}</a>
      <a class="link link-hover">{{ $t('Press kit') }}</a>
    </nav>
  </footer> -->
</template>
<script setup lang="ts"></script>
