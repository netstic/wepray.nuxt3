<template>
  <div>
    <LayoutPublicHeaderNav />
    <slot />
    <LayoutPublicFooterNav />
  </div>
</template>

<script setup lang="ts"></script>

<style>
#warp-header {
  background-color: #2196f3 !important;
}
#warp-header .is-link {
  background-color: #2196f3 !important;
}
#warp-header #navbar-header {
  margin-top: -23px;
}
#warp-header strong {
  color: #143e8e;
}
#warp-header .navbar-item,
#warp-header .navbar-item a {
  color: #fff;
}

#warp-header .bg-top {
  padding-top: 0;
  margin-top: -23px;
  fill: #0d47a1 !important;
  top: 0px;
}
.bg-sub-top {
  padding-top: 0;
  fill: #2196f3 !important;
  stroke: #2196f3 !important;
  top: 0px;
}

.toggleColour:hover {
  background-color: #143e8e;
}

.svg-page2 {
  padding-top: 0px;
  /* margin-top: -24px; */
  fill: rgb(255, 255, 255) !important;
}

#section-post-register {
  background-color: #f7fafc;
  clip-path: polygon(
    0px 0px,
    70% 0%,
    100% 0px,
    99.81% 88.27%,
    70% 100%,
    44.51% 92.85%,
    0px 100%,
    0px 10%
  );
}
</style>
