<template>
  <aside
    class="transition-all duration-150 ease-in w-64 py-8 px-2 gap-8 flex flex-col"
  >
    <div class="flex flex-row gap-4 items-center">
      <Avatar :src="user?.avatar" :username="user?.username" />
      <div class="truncate">@{{ user?.username }}</div>
    </div>
    <div>
      <ul class="menu menu-lg">
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

            Item 1</a
          >
        </li>
        <li><a>Item 2</a></li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { user } = useAuth();
</script>
