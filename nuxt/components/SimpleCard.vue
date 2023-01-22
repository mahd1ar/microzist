<template>
  <div ref="root" class="mb-5 flex w-full gap-2" :class="{ container: !full, 'flex-row-reverse': left }">
    <div class="hidden w-1/2 justify-start md:flex">
      <div class="flex flex-col items-start justify-center gap-4" :class="leftt ? 'pr-10' : 'pl-10'">
        <div class="relative">
          <h2 class="text-5xl font-bold text-tm-gray-dark">
            {{ title }}
          </h2>
          <span class="absolute left-0 -top-5 text-8xl font-bold text-tm-gray-dark opacity-[0.05] rtl:left-auto">
            {{ title }}
          </span>
        </div>
        <p ref="snipable" style="opacity: 0" class="h-24 overflow-hidden pr-10 text-zinc-500 rtl:pl-10 rtl:pr-0"
          v-snip="{ lines: 4, onSnipped }">
          {{ body }}
        </p>
        <nuxt-link :to="link"
          class="text-bold z-0 inline-flex flex-row-reverse items-start gap-1 overflow-hidden rounded bg-primary px-4 py-2 font-bold text-tm-gray-dark">
          <svg class="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M5 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 5h14l.001 14H5V5z" />
            <path fill="currentColor" d="M13.293 6.293L7.586 12l5.707 5.707l1.414-1.414L10.414 12l4.293-4.293z" />
          </svg>
          <span class="flex items-center justify-center px-2 transition-all hover:px-4">
            <!-- _SEEMORE  -->
            {{ $t('see_more') }}
          </span>
        </nuxt-link>
      </div>
    </div>
    <nuxt-link :to="localePath(link)"
      class="relative h-[400px] w-full overflow-hidden rounded shadow-xl shadow-gray-400 md:w-1/2">
      <img v-if="img" v-motion :initial="{
        scale: 1.5,
        x: 100,
      }" :enter="{
  opacity: 1,
  x: 0,
  scale: 1,
  transition: {
    type: 'spring',
    stiffness: 250,
    damping: 25,
    mass: 0.5,
    delay: index * 100,
  },
}" ref="target" :src="img" loading="lazy"
        class="h-full w-full origin-right translate-x-24 scale-150 object-cover transition-all duration-700 ease-out"
        alt="" />

      <div class="absolute bottom-0 left-0 flex w-full flex-col gap-4 bg-black bg-opacity-50 px-8 text-white md:hidden">
        <h2 class="mt-4 text-4xl">
          {{ title }}
        </h2>

        <p v-snip="{ lines: 4 }" class="h-24 overflow-hidden text-gray-300">
          {{ body }}
        </p>
        <button class="mb-6 w-full rounded bg-primary py-2 text-center text-black">
          {{ $t('more') }}
        </button>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onBeforeUnmount,
  useContext,
} from '@nuxtjs/composition-api'

import { useIntersectionObserver } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'

const root = ref<HTMLElement>()

const {
  full = false,
  left = false,
  title = '',
  body = '',
  img = '',
  link = '',
  index = 0,
} = defineProps<{
  full: Boolean
  left: Boolean
  title: String
  body: String
  img: String
  link: String
  index: number
}>()

const { i18n } = useContext()
const target = ref(null)
const snipable = ref<HTMLElement>()
const targetIsVisible = ref(false)

const onSnipped = () => {
  useMotion(snipable, {
    initial: {
      opacity: 0,
      x: -10,
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1000,
      },
    },
  })
}

onBeforeUnmount(() => {
  if (snipable.value) snipable.value.style.opacity = '0'
})

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
  }
)

const leftt = computed(() => {
  return Boolean(Number(left) ^ Number(i18n.locale !== 'fa'))
})
</script>
