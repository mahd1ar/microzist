<template>
  <section class="container leading-8 text-lg" >
    
      <div class="grid grid-cols-4 gap-2">
        <div
          class="border bg-white p-3 flex flex-col justify-center"
          v-for="i in cards"
          :key="i.id"
        >
          <img :src="i.image" class="h-36" alt="" />
          <div class="flex flex-col items-start">
            <h2 class="text-xl pt-4 font-bold">{{ i.title }}</h2>
            <nuxt-link :to="i.link"
              class="bg-primary flex items-end cursor-pointer rounded border px-2 py-1 font-bold text-xs mt-3"
            >
            <div>
                {{$t("_details")}}
            </div>

              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13.293 6.293L7.586 12l5.707 5.707l1.414-1.414L10.414 12l4.293-4.293z"/></svg>
            </nuxt-link>
          </div>
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
        image: string
        altImage: string
        id: string
        title: string
        link : string
      }[]
    >,
  },
})
</script>
