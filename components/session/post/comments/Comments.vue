<template>
  <div class="flex justify-end items-center">
    <div class="space-y-14 mb-10 -mt-2 flex-1">
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

      <SessionPostCommentsSkeleton v-if="isCommentsLoading" />

      <transition-group name="fade">
        <div
          v-if="!isCommentsLoading"
          v-for="(comment, commentId) in comments"
          :key="commentId"
          class="flex flex-col"
          :class="commentId % 2 === 0 ? 'items-start' : 'items-end'"
        >
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl w-4/5 shadow-md sm:shadow-lg p-4 pb-8"
          >
            <div class="flex flex-col">
              <SessionPostContent :content="comment.content?.body!" />
              <div
                class="flex items-center relative z-20 w-full min-h-12 -mb-6 space-x-2"
                :class="commentId % 2 === 0 ? 'justify-end' : 'justify-start'"
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
  </div>
</template>

<script setup lang="ts">
import {
  addPostCommentService,
  getPostCommentsService,
} from '~/services/post/post';
import type { ISessionComment } from '~/types/session';

const props = defineProps<{
  postId: number;
  isUserOrGuestLoggedIn: 'user' | 'guest' | null;
}>();

const emit = defineEmits<{
  openGuestCommentDialog: [value: void];
  addComment: [comment: ISessionComment];
}>();

const isCommentsLoading = ref(false);
const comments = ref<ISessionComment[]>([]);
const newComment = ref('');

const getComments = () => {
  isCommentsLoading.value = true;
  getPostCommentsService(props.postId)
    .then(({ data: { data: data } }) => {
      comments.value = data.data;
    })
    .finally(() => (isCommentsLoading.value = false));
};

const addComment = () => {
  if (props.isUserOrGuestLoggedIn == 'guest') {
    emit('openGuestCommentDialog');
    return;
  }

  addPostCommentService(props.postId, newComment.value).then(
    ({ data: { data: data } }) => {
      emit('addComment', data.comment);
      comments.value.unshift(data.comment);
      newComment.value = '';
    }
  );
};

onMounted(() => {
  getComments();
});
</script>

<style scoped></style>
