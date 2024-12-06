<template>
  <transition name="fade" mode="out-in">
    <div v-if="isSessionLoading" class="wp-loader-navigation">
      <LoaderNavigation />
    </div>
    <div v-else>
      <LayoutSessionMainContent
        v-if="currentCard"
        :key="currentCard.id"
        :title="$t(currentCard.title)"
        class="app-layout-width pb-10 sm:pb-28"
      >
        <div
          class="flex flex-col max-w-96 sm:max-w-full sm:w-[30rem] mx-auto gap-1"
        >
          <div
            class="flex items-start flex-col gap-2 bg-white dark:border dark:border-gray-700 dark:bg-gray-800 min-h-44 rounded-2xl shadow-md sm:shadow-2xl p-6"
          >
            <div class="flex items-center gap-4 mb-1">
              <Avatar
                :src="currentCard.avatar"
                :username="currentCard.contentTitle"
              />
              <h2 class="text-xl font-bold">{{ currentCard.contentTitle }}</h2>
            </div>
            <SessionCardContent
              :content="currentCard.content?.body!"
              class="text-lg"
            />
          </div>
          <div class="flex justify-end items-center mb-8 mr-1">
            <div
              class="flex gap-4 items-center bg-white dark:border dark:border-gray-700 dark:bg-gray-800 rounded-xl px-4 py-2 shadow-md sm:shadow-xl"
            >
              <WeprayTooltip :text="$t('Prayers')" position="top">
                <SessionIconPrayFireworks
                  v-model="currentCard.isPrayed"
                  ref="iconPrayRef"
                  @click="onIconPrayerCount"
                  :prayer-count="currentCard.prayedCount"
                />
              </WeprayTooltip>
              <WeprayTooltip :text="$t('Comments')" position="top">
                <button
                  @click="toggleComments()"
                  class="flex items-center text-green-600 dark:text-green-400"
                >
                  <IconCommentCircleOutline class="mr-1" />
                  <span>{{ currentCard.commentCount ?? 0 }}</span>
                </button>
              </WeprayTooltip>
              <WeprayTooltip :text="$t('Notes')" position="top">
                <button
                  @click="toggleNotes()"
                  class="flex items-center text-blue-600 dark:text-blue-400"
                >
                  <IconNotesOutline class="mr-1" />
                  <span>{{ currentCard.notesCount ?? 0 }}</span>
                </button>
              </WeprayTooltip>
            </div>
          </div>

          <div class="flex justify-end items-center">
            <transition name="fade">
              <div v-if="isShowComments" class="space-y-14 mb-10 -mt-2 flex-1">
                <div class="mt-2 -mb-4 flex">
                  <div class="ml-4 sm:ml-8"></div>
                  <WeprayFormInput
                    v-model.trim="newComment"
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

                <div v-if="isCommentsLoading" class="space-y-4">
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
                    v-if="!isCommentsLoading"
                    v-for="(comment, commentId) in currentCard?.comments"
                    :key="commentId"
                    class="flex flex-col"
                    :class="commentId % 2 === 0 ? 'items-start' : 'items-end'"
                  >
                    <div
                      class="bg-white dark:bg-gray-800 rounded-2xl w-4/5 shadow-md sm:shadow-lg p-4 pb-8"
                    >
                      <div class="flex flex-col">
                        <SessionCardContent :content="comment.content?.body!" />
                        <div
                          class="flex items-center relative z-20 w-full min-h-12 -mb-6 space-x-2"
                          :class="
                            commentId % 2 === 0
                              ? 'justify-end'
                              : 'justify-start'
                          "
                        >
                          <!-- <button
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
                          <div v-if="comment.isShowReactions" class="absolute">
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
                          </div> -->
                        </div>
                        <Avatar
                          v-if="isShowComments"
                          :src="comment.avatar"
                          :username="comment.name"
                          :from="comment.location"
                          chip
                          size="lg"
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
            class="w-full sm:w-auto relative z-20 wp-btn-session-submit"
            :disabled="!isPrayed"
            @click="goNext"
          >
            {{ isLastCard ? $t('Finish Session') : $t('Next') }}
          </button>
        </template>
      </LayoutSessionFooter>
    </Teleport>
  </ClientOnly>

  <PostGuestCommentDialog ref="guestCommentDialogRef" />
  <PostUsersPrayedDialog ref="usersPrayedDialogRef" />
</template>

<script setup lang="ts">
import type {
  PostGuestCommentDialog,
  PostUsersPrayedDialog,
  SessionIconPrayFireworks,
} from '#build/components';
import { updateGuestTodayService } from '~/services/guest';
import { useSessionStore } from '~/store/session.store';

definePageMeta({
  layout: 'session',
  colorMode: 'dark',
  middleware: 'welcome',
});

const iconPrayRef = ref<InstanceType<typeof SessionIconPrayFireworks>>();
const usersPrayedDialogRef = ref<InstanceType<typeof PostUsersPrayedDialog>>();
const guestCommentDialogRef =
  ref<InstanceType<typeof PostGuestCommentDialog>>();

const sessionStore = useSessionStore();
const {
  currentCard,
  isLastCard,
  isLoading: isSessionLoading,
  randomPrayedMessage,
  isUserOrGuestLoggedIn,
} = storeToRefs(sessionStore);

const isShowComments = ref(false);
const isCommentsLoading = ref(true);
const isShowNotes = ref(false);
const isNotesLoading = ref(true);
const newComment = ref('');
const isReadMore = ref(false);

const reactions = ['👍', '❤️', '🙏', '😊', '🕯️'];

const isPrayed = ref(false);

const prayForCurrentCard = () => {
  sessionStore.pray().then(() => {
    iconPrayRef.value?.startAnimation();
    isPrayed.value = true;
  });
};

const onIconPrayerCount = () => {
  usersPrayedDialogRef.value?.openDialog(currentCard.value?.id!);
};

const goNext = () => {
  if (isLastCard.value) {
    sessionStore.reset();
    restartSessionValues();
    navigateTo('/pray');
    return;
  }

  sessionStore.nextCard();
  restartSessionValues();
};

const restartSessionValues = () => {
  isPrayed.value = false;
  isShowComments.value = false;
  isReadMore.value = false;
};

const toggleComments = () => {
  isShowNotes.value = false;
  isShowComments.value = !isShowComments.value;
  if (isShowComments.value) {
    isCommentsLoading.value = true;
    sessionStore
      .showCurrentCardComments()
      .finally(() => (isCommentsLoading.value = false));
  }
};

const toggleNotes = () => {
  isShowComments.value = false;
  isShowNotes.value = !isShowNotes.value;
  if (isShowNotes.value) {
    isNotesLoading.value = true;
    sessionStore
      .showCurrentCardNotes()
      .finally(() => (isNotesLoading.value = false));
  }
};

const toggleReactions = (commentId: number) => {
  const comment = currentCard.value?.comments.find((c) => c.id === commentId);
  if (comment) {
    comment.isShowReactions = !comment.isShowReactions;
  }
};

const addReaction = (commentId: number, reaction: string) => {
  const comment = currentCard.value?.comments.find((c) => c.id === commentId);
  if (comment) {
    if (!comment.reactions[reaction]) {
      comment.reactions[reaction] = 0;
    }
    comment.reactions[reaction]++;
    comment.isShowReactions = false;
  }
};

const addComment = () => {
  if (isUserOrGuestLoggedIn.value == 'guest') {
    guestCommentDialogRef.value?.openDialog();
    return;
  }

  sessionStore.addComment(newComment.value);
  newComment.value = '';
};

watch(currentCard, () => {
  const animationTimer = setTimeout(() => {
    if (!isPrayed.value) prayForCurrentCard();
    clearTimeout(animationTimer);
  }, 1000);
});

onMounted(() => {
  sessionStore.initSession();

  // Add beforeunload event listener
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = ''; // This will trigger the confirmation dialog
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Cleanup the event listener on component unmount
  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });
});

onBeforeMount(() => {
  const { guest } = useAuth();
  updateGuestTodayService().then(({ data: { data: data } }) => {
    guest.value = data.guest;
  });
});
</script>
