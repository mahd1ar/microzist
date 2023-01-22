<template>
  <div>
    <div v-if="$store.getters.showSearch">
      <div
        class="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20"
        role="dialog"
        aria-modal="true"
      >
        <div
          @click="close()"
          class="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
          aria-hidden="true"
        ></div>

        <div
          class="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
        >
          <input
            type="text"
            class="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            :placeholder="$t('search') + ' ... '"
            role="combobox"
            aria-expanded="false"
            aria-controls="options"
            v-model="search"
            @input="searchValue"
          />

          <!-- Results, show/hide based on command palette state. -->
          <ul
            v-if="res.length > 0"
            class="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
            id="options"
            role="listbox"
          >
            <!-- Active: "bg-indigo-600 text-white" -->
            <li
              v-for="(i, index) in res"
              :key="index"
              @click="selectItem(index)"
              class=" select-none rounded-md px-4 py-2 cursor-pointer"
              id="option-1"
              role="option"
              tabindex="-1"
            >
              {{ i.title }}
            </li>
          </ul>

          <!-- Empty state, show/hide based on command palette state. -->
          <div v-else class="py-14 px-4 text-center sm:px-14">
            <!-- Heroicon name: outline/users -->
            <svg
              class="mx-auto h-6 w-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 0 0 9.5 3C6.08 3 3.28 5.64 3.03 9h2.02C5.3 6.75 7.18 5 9.5 5C11.99 5 14 7.01 14 9.5S11.99 14 9.5 14c-.17 0-.33-.03-.5-.05v2.02c.17.02.33.03.5.03c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"
              />
              <path
                fill="currentColor"
                d="M6.47 10.82L4 13.29l-2.47-2.47l-.71.71L3.29 14L.82 16.47l.71.71L4 14.71l2.47 2.47l.71-.71L4.71 14l2.47-2.47z"
              />
            </svg>
            <p class="mt-4 text-sm text-gray-900">
              {{ $t('no_results_found') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  useContext,
  useRoute,
  useRouter,
  useStore
} from '@nuxtjs/composition-api'
import { ref } from 'vue'

const { $axios, i18n, localePath } = useContext()
const search = ref('')
const res = ref<{ title: string; link: string }[]>([])
let time: number
const store = useStore()
const router = useRouter()

function selectItem (index: number) {
  router.push(localePath(res.value[index].link))
  close()
}

function close () {
  search.value = ''
  store.dispatch('toggleSearch', false)
}

function searchValue () {
  clearTimeout(time)
  time = window.setTimeout(() => {
    changed()
  }, 600)
}

const changed = async () => {
  res.value.splice(0, res.value.length)

  if (search.value.trim() === '') return

  const { data } = await $axios.get(
    `https://api.carizanin.com/wp-json/wp/v2/posts?search=${search.value}${
      i18n.locale === 'en' ? '&lang=en' : ''
    }`
  )

  if (data) {
    data.forEach(element => {
      const t = element.title.rendered.replaceAll('\\', '-')

      res.value.push({
        title: t,
        link: `/product?en=${btoa('post:' + element.translations.en)}&fa=${btoa(
          'post:' + element.translations.fa
        )}`
      })
    })
  }
}
</script>
