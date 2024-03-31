<template>
  <div>
    <div class="min-h-screen bg-slate-50 text-gray-800">
      <div class="container flex flex-row mx-auto">
        <layout-private-sidebar-left></layout-private-sidebar-left>
        <main class="flex flex-grow flex-col p-4">
          <slot> </slot>
        </main>
        <layout-private-sidebar-right></layout-private-sidebar-right>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
