<template>
  <div
    id="comment-section"
    class="rounded border p-6 py-4"
    :class="{
      'border-yellow-500 bg-yellow-100 text-yellow-700': theme === 'gold',
      'border-gray-300 bg-gray-100 text-gray-700': theme === 'gray'
    }"
  >
    <div class="font-bol text-lg text-yellow-700">
      <span v-if="$store.getters.isLoggedIn" class="mb-2 inline-block">
        دیدگاه من
      </span>
      <div v-else class="text-center">
        برای ارسال دیدگاه

        <nuxt-link class="mx-1 font-bold underline" to="/login">
          وارد
        </nuxt-link>

        شوید یا
        <nuxt-link class="mx-1 font-bold underline" to="/signup">
          ثبت نام
        </nuxt-link>

        کنید
      </div>
    </div>
    <div v-if="$store.getters.isLoggedIn" class="p-0">
      <div
        v-if="widthStars"
        class="mb-4 inline-flex cursor-pointer items-center gap-4 bg-yellow-50 px-4 py-2 text-yellow-500"
      >
        <div
          v-for="i in 5"
          :key="i"
          @click="rate(i)"
          class="hover hover:scale-110"
        >
          <svg v-if="star > i" viewBox="0 0 24 24" class="h-6 w-6">
            <path
              fill="currentColor"
              d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
            />
          </svg>
          <svg v-else class="h-6 w-6" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z"
            />
          </svg>
        </div>
      </div>

      <textarea
        class="w-full border p-3 bg-white bg-opacity-75 text-black"
        name=""
        id=""
        cols="30"
        rows="3"
        v-model="comment"
      ></textarea>

      <button
        @click="submitComment"
        class="flex items-center gap-4 px-4 py-2"
        :class="{ 'bg-yellow-50': theme === 'gold' }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M222.3 33.7a13.6 13.6 0 0 0-13.7-3.6L22.3 82.7A13.9 13.9 0 0 0 12.1 95a14.1 14.1 0 0 0 8 13.8l85.6 40.5a2.4 2.4 0 0 1 1 1l40.5 85.6a13.8 13.8 0 0 0 12.6 8h1.2a13.9 13.9 0 0 0 12.3-10.2l52.6-186.3a13.6 13.6 0 0 0-3.6-13.7Zm-8 10.4l-52.5 186.3a1.8 1.8 0 0 1-1.8 1.5a1.8 1.8 0 0 1-1.9-1.1l-40-84.4l42.3-42.3a6 6 0 0 0-8.5-8.5l-42.3 42.3l-84.4-40a1.8 1.8 0 0 1-1.1-1.9a1.8 1.8 0 0 1 1.5-1.8l186.3-52.5h.6a1.6 1.6 0 0 1 1.3.6a1.8 1.8 0 0 1 .5 1.8Z"
          />
        </svg>
        ارسال نظر
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, useContext } from '@nuxtjs/composition-api'
import CREATE_COMMENT from '@/apollo/m/create-comment.gql'
import { useMutation } from '@vue/apollo-composable/dist'
import {
  CreateCommentMutation,
  CreateCommentMutationVariables
} from '@/types/types'

const { theme = 'gold', widthStars, target, targetId } = defineProps({
  theme: {
    type: String as PropType<'gray' | 'gold'>,
    default: () => 'gold'
  },
  widthStars: { type: Boolean, default: () => false },
  target: {
    type: String as PropType<'course' | 'courseItem'>,
    required: true
  },
  targetId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['onDone', 'onError'])

const star = ref(3)
const comment = ref('')

const ctx = useContext()

const { onDone, mutate } = useMutation<
  CreateCommentMutation,
  CreateCommentMutationVariables
>(CREATE_COMMENT)

function rate (i: number) {
  star.value = i
}

onDone(() => {
  // TODO toast
  alert('fa:: Comment saved')
  // reset comment
  ;(comment.value = ''), (star.value = 3)

  emit('onDone')
})

function submitComment () {
  const commentInput: CreateCommentMutationVariables = {
    data: {
      comment: null,
      user: {
        connect: {
          id: null
        }
      }
    }
  }

  if (comment.value.trim() === '') {
    // TODO
    alert('fa::empty comment')
    return
  }

  commentInput.data.comment = comment.value.trim()
  commentInput.data.user!.connect!.id = ctx.store.getters.user.id

  if (target === 'course')
    commentInput.data.course = { connect: { id: targetId } }
  else if (target === 'courseItem')
    commentInput.data.courseItem = { connect: { id: targetId } }

  if (widthStars) commentInput.data.rate = star.value

  mutate(commentInput)
}
</script>
