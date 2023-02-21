<template>
  <div
    class="rounded border border-yellow-500 bg-yellow-100 p-6 py-4 text-yellow-700"
  >
    <div class="font-bol text-lg text-yellow-700">
      <span v-if="$store.getters.isLoggedIn"> دیدگاه من </span>
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
    <dir v-if="$store.getters.isLoggedIn" class="p-0">
      <div
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
        class="w-full border p-3 text-black"
        name=""
        id=""
        cols="30"
        rows="3"
      ></textarea>

      <button class="flex items-center gap-4 bg-yellow-50 px-4 py-2">
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
    </dir>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@nuxtjs/composition-api'

const star = ref(3)

function rate(i: number) {
  star.value = i
}
</script>
