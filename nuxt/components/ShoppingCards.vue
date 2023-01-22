<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-12 mx-auto">
      <div class="flex flex-wrap -m-4">
        <!-- v-motion
        :initial="{ opacity: 0.4 }"
        :visible="{
          opacity: 1,
        }" -->
        <nuxt-link
          v-for="(i, index) in cards"
          :key="i.id"
          class="w-full p-4 md:w-1/3"
          :delay="(index % 3) * 200"
          :to="i.link"
        >
          <div
            class="h-full  border-2 border-gray-200 bg-white border-opacity-60 rounded-lg overflow-hidden"
          >
            <img
              v-if="i.image"
              class="h-60 lg:h-48 md:h-36 w-full object-cover object-center"
              :src="i.image"
              :alt="i.title"
            />
            <div class="p-6 border-t-4 border-primary ">
              <h2
                class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
              >
                {{ $t('category') }}
              </h2>
              <h1
                class="title-font text-lg font-medium text-gray-900 mb-3"
                v-html="i.title"
              ></h1>
              <p v-snip="3" class="leading-relaxed mb-3" v-text="i.body"></p>
              <!-- localePath('/product?id=' + i.id) -->
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PropType } from '@nuxtjs/composition-api'

const { cards = [] } = defineProps({
  cards: {
    type: Array as PropType<
      {
        id: string
        image: string
        title: string
        body: string
        link: string
      }[]
    >
  }
})
</script>
