<template>
  <div class="mt-8 mb-8 rounded-lg border bg-white">
    <div class="flex items-center justify-between px-6 pt-6">
      <h2 class="text-lg font-bold text-sky-500">دیدگاه ها</h2>
      <div class="flex gap-2">
        <span class="text-sm text-gray-600" v-if="items.length > 0">
          <strong> {{ items.length }} </strong>
          دیدگاه
        </span>
      </div>
    </div>

    <div
      v-for="item in items"
      :key="item.id"
      class="odd:bg-gary-100 mt-4 flex flex-col gap-1 bg-opacity-75 px-6 py-4"
    >
      <div>
        <div class="mb-1 flex items-center justify-between">
          <div class="flex items-center justify-center gap-1">
            <div class="text-sm font-bold">
              {{ item.username }}
            </div>

            <div class="text-xs text-gray-500">1 هفته پیش</div>
            .
            <div class="text-xs text-gray-500">3:15 بعد از ظهر</div>
          </div>
          <div class="flex">
            <svg
              class="aspect-square w-4 text-yellow-400"
              viewBox="0 2.4 24 24"
            >
              <path
                fill="currentColor"
                d="m5.825 24.4l1.625-7.025L2 12.65l7.2-.625L12 5.4l2.8 6.625l7.2.625l-5.45 4.725l1.625 7.025L12 20.675L5.825 24.4Z"
              />
            </svg>
            <svg
              class="aspect-square w-4 text-yellow-400"
              viewBox="0 2.4 24 24"
            >
              <path
                fill="currentColor"
                d="m5.825 24.4l1.625-7.025L2 12.65l7.2-.625L12 5.4l2.8 6.625l7.2.625l-5.45 4.725l1.625 7.025L12 20.675L5.825 24.4Z"
              />
            </svg>
            <svg
              class="aspect-square w-4 text-yellow-400"
              viewBox="0 2.4 24 24"
            >
              <path
                fill="currentColor"
                d="m5.825 24.4l1.625-7.025L2 12.65l7.2-.625L12 5.4l2.8 6.625l7.2.625l-5.45 4.725l1.625 7.025L12 20.675L5.825 24.4Z"
              />
            </svg>
            <svg class="aspect-square w-4 text-yellow-400" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
              />
            </svg>
            <svg class="aspect-square w-4 text-yellow-400" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
              />
            </svg>
          </div>
        </div>

        <hr class="mb-4 mt-2" />
        <div>
          {{ item.comment }}
        </div>
      </div>
    </div>
    <div class="p-6 text-center text-gray-500" v-if="items.length === 0">
      هیچ نظری در باره این موضوع وجود ندارد
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from '@nuxtjs/composition-api'

const { items } = defineProps({
  items: {
    type: Array as PropType<
      {
        comment: string
        id: string
        username: string
        date?: string
        rate?: number
      }[]
    >,
    default: () => [],
  },
})
</script>
