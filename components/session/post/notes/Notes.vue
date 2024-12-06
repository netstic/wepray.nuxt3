<template>
  <div class="flex justify-end items-center">
    <div class="space-y-14 mb-10 -mt-2 flex-1">
      <div class="mt-2 -mb-4 flex">
        <div class="ml-4 sm:ml-8"></div>
        <WeprayFormInput
          v-model.trim="newNote"
          @keyup.enter="addNote"
          :placeholder="$t('Add a note...')"
          class="flex-1"
          input-class="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <template #append>
            <button type="button" @click="addNote">
              <IconSend />
            </button>
          </template>
        </WeprayFormInput>
        <div class="mr-4 sm:mr-8"></div>
      </div>

      <SessionPostNotesSkeleton v-if="isNotesLoading" />

      <transition-group name="fade">
        <div
          v-if="!isNotesLoading"
          v-for="(note, noteId) in notes"
          :key="noteId"
          class="flex flex-col"
          :class="noteId % 2 === 0 ? 'items-start' : 'items-end'"
        >
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl w-4/5 shadow-md sm:shadow-lg p-4 pb-8"
          >
            <div class="flex flex-col">
              <SessionPostContent :content="note.content?.body!" />
              <div
                class="flex items-center relative z-20 w-full min-h-12 -mb-6 space-x-2"
                :class="noteId % 2 === 0 ? 'justify-end' : 'justify-start'"
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
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addPostNoteService, getPostNotesService } from '~/services/post/post';
import type { ISessionNote } from '~/types/session';

const props = defineProps<{
  postId: number;
  isUserOrGuestLoggedIn: 'user' | 'guest' | null;
}>();

const emit = defineEmits<{
  openGuestNoteDialog: [value: void];
  addNote: [note: ISessionNote];
}>();

const isNotesLoading = ref(false);
const notes = ref<ISessionNote[]>([]);
const newNote = ref('');

const getNotes = () => {
  console.log('getNotes');
  isNotesLoading.value = true;
  getPostNotesService(props.postId)
    .then(({ data: { data: data } }) => {
      notes.value = data.data;
    })
    .finally(() => (isNotesLoading.value = false));
};

const addNote = () => {
  if (props.isUserOrGuestLoggedIn == 'guest') {
    emit('openGuestNoteDialog');
    return;
  }

  addPostNoteService(props.postId, newNote.value).then(
    ({ data: { data: data } }) => {
      emit('addNote', data.note);
      notes.value.unshift(data.note);
      newNote.value = '';
    }
  );
};

onMounted(() => {
  getNotes();
});
</script>

<style scoped></style>
