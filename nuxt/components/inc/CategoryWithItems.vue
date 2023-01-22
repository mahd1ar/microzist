<template>
  <div>
    <PageTemplate
      :image="pageInfo.image"
      :altimage="''"
      :title="pageInfo.title"
    >
      <div>
        <div class="container my-10">
          <p
            class="leading-8 text-lg text-gray-700"
            v-html="pageInfo.description.replaceAll('\n', '<br />')"
          ></p>
        </div>
      </div>

      <ShoppingCards :cards="items" />
    </PageTemplate>
    <!-- <FooterSection /> -->
  </div>
</template>

<script setup lang="ts">
import PageTemplate from './PageTemplate.vue'

import { PropType } from 'vue'

const {
  items = [],
  pageInfo = { image: '', title: '', description: '' }
} = defineProps({
  items: {
    type: Array as PropType<
      {
        id: string
        image: string
        link: string
        title: string
        body: string
      }[]
    >
  },
  pageInfo: {
    type: Object as PropType<{
      image: string
      title: string
      description: string
    }>
  }
})

console.log(pageInfo.description)
</script>
