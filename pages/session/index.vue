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
            <SessionPostContent
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

          <transition name="fade" mode="out-in">
            <SessionPostComments
              v-if="isShowComments"
              :post-id="currentCard.id"
              :is-user-or-guest-logged-in="isUserOrGuestLoggedIn"
              @open-guest-comment-dialog="
                guestBecomeUserDialogRef?.openDialog('comment')
              "
              @add-comment="sessionStore.incrementCardCommentCount()"
            />
            <SessionPostNotes
              v-else-if="isShowNotes"
              :post-id="currentCard.id"
              :is-user-or-guest-logged-in="isUserOrGuestLoggedIn"
              @open-guest-note-dialog="
                guestBecomeUserDialogRef?.openDialog('note')
              "
              @add-note="sessionStore.incrementCardNoteCount()"
            />
          </transition>
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

  <PostGuestBecomeUserDialog ref="guestBecomeUserDialogRef" />
  <PostUsersPrayedDialog ref="usersPrayedDialogRef" />
</template>

<script setup lang="ts">
import type {
  PostGuestBecomeUserDialog,
  PostUsersPrayedDialog,
  SessionIconPrayFireworks,
  SessionPostComments,
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
const guestBecomeUserDialogRef =
  ref<InstanceType<typeof PostGuestBecomeUserDialog>>();

const sessionStore = useSessionStore();
const {
  currentCard,
  isLastCard,
  isLoading: isSessionLoading,
  randomPrayedMessage,
  isUserOrGuestLoggedIn,
} = storeToRefs(sessionStore);

const isShowComments = ref(false);
const isShowNotes = ref(false);
const isReadMore = ref(false);

const isPrayed = ref(false);

// const reactions = ['👍', '❤️', '🙏', '😊', '🕯️'];

const restartSessionValues = () => {
  isPrayed.value = false;
  isShowComments.value = false;
  isShowNotes.value = false;
  isReadMore.value = false;
};

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

const toggleComments = () => {
  isShowNotes.value = false;
  isShowComments.value = !isShowComments.value;
};

const toggleNotes = () => {
  isShowComments.value = false;
  isShowNotes.value = !isShowNotes.value;
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
