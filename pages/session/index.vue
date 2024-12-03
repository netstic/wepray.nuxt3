<template>
  <transition name="fade" mode="out-in">
    <div v-if="isSessionLoading" class="wp-loader-navigation">
      <LoaderNavigation />
    </div>
    <div v-else>
      <LayoutSessionMainContent
        v-if="currentCard"
        :key="currentCard.id"
        :title="$t(currentCard.list.title)"
        class="app-layout-width pb-10 sm:pb-28"
      >
        <div class="flex flex-col w-96 sm:w-[30rem] mx-auto gap-1">
          <div
            class="flex items-start flex-col gap-2 bg-white dark:border dark:border-gray-700 dark:bg-gray-800 min-h-44 rounded-2xl shadow-md sm:shadow-2xl p-6"
          >
            <div class="flex items-center gap-4 mb-1">
              <Avatar :src="currentCard.avatar" :username="currentCard.title" />
              <h2 class="text-xl font-bold">{{ currentCard.title }}</h2>
            </div>
            <SessionCardContent :content="currentCard.content" />
          </div>
          <div class="flex justify-end items-center mb-8 mr-1">
            <div
              class="flex gap-4 items-center bg-white dark:border dark:border-gray-700 dark:bg-gray-800 rounded-xl px-4 py-2 shadow-md sm:shadow-xl"
            >
              <SessionIconPrayFireworks
                ref="iconPrayRef"
                @click="onIconPray"
                :prayer-count="currentCard.prayedCount"
              />
              <button
                @click="toggleComments(currentCard.id)"
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
                <span>{{ currentCard.comments?.length }}</span>
              </button>
              <button
                @click="toggleNotes(currentCard.id)"
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
                <span>{{ currentCard.notes?.length }}</span>
              </button>
            </div>
          </div>

          <div class="flex justify-end items-center">
            <transition name="fade">
              <div v-if="showComments" class="space-y-14 mb-10 -mt-2 flex-1">
                <div class="mt-2 -mb-4 flex">
                  <div class="ml-4 sm:ml-8"></div>
                  <WeprayFormInput
                    v-model="newComment"
                    @keyup.enter="addComment"
                    :placeholder="$t('Add a comment...')"
                    class="flex-1"
                    input-class="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <template #append>
                      <button type="button" @click="addComment">
                        <IconSend />
                      </button>
                    </template>
                  </WeprayFormInput>
                  <div class="mr-4 sm:mr-8"></div>
                </div>

                <div v-if="loading" class="space-y-4">
                  <div
                    v-for="i in 3"
                    :key="i"
                    class="animate-pulse flex space-x-4"
                  >
                    <div
                      class="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12"
                    ></div>
                    <div class="flex-1 space-y-4 py-1">
                      <div
                        class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"
                      ></div>
                      <div class="space-y-2">
                        <div
                          class="h-4 bg-gray-300 dark:bg-gray-600 rounded"
                        ></div>
                        <div
                          class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <transition-group name="fade">
                  <div
                    v-if="!loading"
                    v-for="(comment, commentId) in currentCard?.comments"
                    :key="commentId"
                    class="flex flex-col"
                    :class="commentId % 2 === 0 ? 'items-start' : 'items-end'"
                  >
                    <div
                      class="bg-white dark:bg-gray-800 rounded-2xl w-4/5 shadow-md sm:shadow-lg p-4 pb-8"
                    >
                      <div class="flex flex-col">
                        <SessionCardContent :content="comment.content" />
                        <div
                          class="flex items-center relative z-20 w-full min-h-12 -mb-6 space-x-2"
                          :class="
                            commentId % 2 === 0
                              ? 'justify-end'
                              : 'justify-start'
                          "
                        >
                          <button
                            @click="toggleReactions(comment.id)"
                            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
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
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <div v-if="comment.showReactions" class="absolute">
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
                            v-if="Object.keys(comment.reactions).length > 0"
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
                        <Avatar
                          :src="comment.avatar"
                          :username="comment.name"
                          :from="comment.location"
                          chip
                          size="xl"
                          class="-mb-14"
                          :class="commentId % 2 === 0 ? 'ml-2' : 'mr-2'"
                          :align="commentId % 2 === 0 ? 'start' : 'end'"
                        />
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>
            </transition>
          </div>
        </div>
      </LayoutSessionMainContent>
    </div>
  </transition>

  <ClientOnly>
    <Teleport to="#session-layout">
      <LayoutSessionFooter>
        <template #prepend>
          <transition name="fade" mode="out-in">
            <div
              v-if="isPrayed"
              class="flex items-center justify-center sm:justify-start gap-2 mb-2"
            >
              <LogoWp size="xl" />
              <span class="text-lg sm:text-xl">{{
                isLastCard
                  ? $t('Thanks for your prayers!')
                  : $t(randomPrayedMessage)
              }}</span>
            </div>
          </transition>
        </template>
        <template #append>
          <button
            class="w-full sm:w-auto relative z-20"
            :class="
              isPrayed ? 'wp-btn-session-success' : 'wp-btn-session-submit'
            "
            @click="goNext"
          >
            {{ submitButtonText }}
          </button>
        </template>
      </LayoutSessionFooter>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { SessionIconPrayFireworks } from '#build/components';
import { useWelcomeSession } from '~/composables/useWelcomeSession';
import { updateGuestTodayService } from '~/services/guest';
import { useSessionStore } from '~/store/session.store';

definePageMeta({
  layout: 'session',
  colorMode: 'light',
  middleware: 'welcome',
});

const iconPrayRef = ref<InstanceType<typeof SessionIconPrayFireworks>>();

const { incrementTodayPrayerCount, updateTodayWelcomeCookie } =
  useWelcomeSession();
const sessionStore = useSessionStore();
const {
  currentCard,
  isLastCard,
  isLoading: isSessionLoading,
} = storeToRefs(sessionStore);

const showComments = ref(false);
const loading = ref(true);
const newComment = ref('');
const isReadMore = ref(false);

const reactions = ['👍', '❤️', '🙏', '😊', '🕯️'];

const isPrayed = ref(false);

const prayedMessages = [
  'God bless you!',
  'May peace be with you!',
  'Wishing you joy and blessings!',
  'Stay blessed!',
];

const randomPrayedMessage = ref('');

const shufflePrayedMessage = () => {
  randomPrayedMessage.value =
    prayedMessages[Math.floor(Math.random() * prayedMessages.length)];
};

const submitButtonText = computed(() => {
  if (!isPrayed.value) return 'Pray';
  else if (isLastCard.value) return 'Finish';
  return 'Continue';
});

const onPrayAnimation = () => {
  shufflePrayedMessage();
  isPrayed.value = true;
  sessionStore.incrementCurrentProgress();
  iconPrayRef.value?.startAnimation();
  incrementTodayPrayerCount();
};

const onIconPray = () => {
  if (!isPrayed.value) {
    onPrayAnimation();
    return;
  }
};

const goNext = () => {
  if (!isPrayed.value) {
    onPrayAnimation();
    return;
  } else if (isLastCard.value) {
    restartSessionValues();
    navigateTo('/session/finish');
    return;
  }

  sessionStore.nextCard();
  restartSessionValues();
};

const restartSessionValues = () => {
  isPrayed.value = false;
  showComments.value = false;
  isReadMore.value = false;
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
  const comment = currentCard.value?.comments.find((c) => c.id === commentId);
  if (comment) {
    comment.showReactions = !comment.showReactions;
  }
};

const addReaction = (commentId: number, reaction: string) => {
  const comment = currentCard.value?.comments.find((c) => c.id === commentId);
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
    currentCard.value?.comments.push({
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

onMounted(() => {
  sessionStore.initSession();
});

onBeforeMount(() => {
  const { guest } = useAuth();
  updateGuestTodayService().then(({ data }) => {
    guest.value = data.guest;
  });
});
</script>
