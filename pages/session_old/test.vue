<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <header
      class="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center"
    >
      <button
        @click="goBack"
        class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div
        class="w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden"
      >
        <div
          class="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          :style="{ width: `${((currentCardIndex + 1) / totalCards) * 100}%` }"
        ></div>
      </div>
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="font-semibold"
          >{{ currentCardIndex + 1 }}/{{ totalCards }}</span
        >
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="relative overflow-hidden">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${currentCardIndex * 100}%)` }"
        >
          <div
            v-for="(card, index) in prayerCards"
            :key="card.id"
            class="w-full flex-shrink-0"
          >
            <div
              class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4"
            >
              <h2 class="text-2xl font-bold mb-4">{{ card.title }}</h2>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                {{ card.content }}
              </p>
              <div class="flex justify-between items-center">
                <div class="flex space-x-4">
                  <button
                    @click="toggleNotes(card.id)"
                    class="flex items-center text-blue-600 dark:text-blue-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>{{ card.notes.length }}</span>
                  </button>
                  <button
                    @click="toggleComments(card.id)"
                    class="flex items-center text-green-600 dark:text-green-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <span>{{ card.comments.length }}</span>
                  </button>
                  <button
                    class="flex items-center text-red-600 dark:text-red-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>{{ card.prayedCount }}</span>
                  </button>
                </div>
                <div class="flex space-x-2">
                  <button
                    v-if="index > 0"
                    @click="prevCard"
                    class="bg-gray-200 dark:bg-gray-700 rounded-full p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="index < prayerCards.length - 1"
                    @click="nextCard"
                    class="bg-gray-200 dark:bg-gray-700 rounded-full p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <input
          v-model="newComment"
          @keyup.enter="addComment"
          type="text"
          placeholder="Add a comment..."
          class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div v-if="showComments" class="mt-8">
        <h3 class="text-xl font-bold mb-4">Comments</h3>
        <div v-if="loading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="animate-pulse flex space-x-4">
            <div
              class="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12"
            ></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div
                  class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <transition-group name="fade" tag="div" class="space-y-4">
          <div
            v-for="comment in currentCard.comments"
            :key="comment.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div class="flex items-start space-x-4">
              <img
                :src="comment.avatar"
                :alt="comment.name"
                class="w-12 h-12 rounded-full"
              />
              <div class="flex-1">
                <h4 class="font-bold">{{ comment.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ comment.location }}
                </p>
                <p class="mt-2">{{ comment.content }}</p>
                <div class="mt-2 flex items-center space-x-2">
                  <button
                    @click="toggleReactions(comment.id)"
                    class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
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
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <div v-if="comment.showReactions" class="relative">
                    <div
                      class="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2 flex space-x-2"
                    >
                      <button
                        v-for="reaction in reactions"
                        :key="reaction"
                        @click="addReaction(comment.id, reaction)"
                        class="text-2xl"
                      >
                        {{ reaction }}
                      </button>
                    </div>
                  </div>
                  <div
                    v-if="comment.reactions.length > 0"
                    class="flex items-center space-x-1"
                  >
                    <span
                      v-for="(count, reaction) in comment.reactions"
                      :key="reaction"
                      class="text-sm"
                    >
                      {{ reaction }} {{ count }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const currentCardIndex = ref(0);
const showComments = ref(false);
const loading = ref(true);
const newComment = ref('');

const totalCards = 3; // This should be dynamically set based on the user's daily goal

const prayerCards = ref([
  {
    id: 1,
    title: 'Prayer for Health',
    content: 'Please pray for my mother who is battling cancer.',
    notes: [],
    comments: [
      {
        id: 1,
        name: 'John Doe',
        avatar: '/placeholder-avatar.jpg',
        location: 'California, USA',
        content: "Praying for your mother's recovery.",
        reactions: {},
        showReactions: false,
      },
      {
        id: 2,
        name: 'Jane Smith',
        avatar: '/placeholder-avatar.jpg',
        location: 'London, UK',
        content: 'Sending positive thoughts your way.',
        reactions: {},
        showReactions: false,
      },
    ],
    prayedCount: 156,
  },
  {
    id: 2,
    title: 'Prayer for Guidance',
    content:
      "I'm facing a difficult decision in my career. Please pray for wisdom and clarity.",
    notes: [],
    comments: [],
    prayedCount: 89,
  },
  {
    id: 3,
    title: 'Prayer for Peace',
    content: 'Praying for peace in conflict-ridden areas around the world.',
    notes: [],
    comments: [],
    prayedCount: 234,
  },
]);

const currentCard = computed(() => prayerCards.value[currentCardIndex.value]);

const reactions = ['👍', '❤️', '🙏', '😊', '🕯️'];

const nextCard = () => {
  if (currentCardIndex.value < prayerCards.value.length - 1) {
    currentCardIndex.value++;
    showComments.value = false;
  }
};

const prevCard = () => {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--;
    showComments.value = false;
  }
};

const toggleComments = (cardId: number) => {
  showComments.value = !showComments.value;
  if (showComments.value) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1500);
  }
};

const toggleNotes = (cardId: number) => {
  // Implement notes functionality
};

const toggleReactions = (commentId: number) => {
  const comment = currentCard.value.comments.find((c) => c.id === commentId);
  if (comment) {
    comment.showReactions = !comment.showReactions;
  }
};

const addReaction = (commentId: number, reaction: string) => {
  const comment = currentCard.value.comments.find((c) => c.id === commentId);
  if (comment) {
    if (!comment.reactions[reaction]) {
      comment.reactions[reaction] = 0;
    }
    comment.reactions[reaction]++;
    comment.showReactions = false;
  }
};

const addComment = () => {
  if (newComment.value.trim()) {
    currentCard.value.comments.push({
      id: Date.now(),
      name: 'You',
      avatar: '/your-avatar.jpg',
      location: 'Your Location',
      content: newComment.value,
      reactions: {},
      showReactions: false,
    });
    newComment.value = '';
  }
};

const goBack = () => {
  // Implement navigation back to the previous page
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
