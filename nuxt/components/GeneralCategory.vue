<template>
  <div>
    <!-- gap -->
    <div aria-hidden="true" class="h-6"></div>
    <div v-if="pageTitle" class="container mx-auto text-center py-10">
      <h2 class="text-xl font-bold">{{ pageTitle }}</h2>
    </div>
    <SimpleCard
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :body="item.excerpt"
      :left="!!( (index % 2 ) ^ ($i18n.locale === 'fa' ? 1 : 0) )"
      :style="{ '--count': index }"
      :link="item.link"
      :img="item.image"
      :full="false"
      :index="index"
    />
    <div aria-hidden="true" class="h-6"></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from '@nuxtjs/composition-api'
import i18n from '~/plugins/i18n';

defineProps({
  items: Array as PropType<
    {
      title: string
      excerpt: string
      link: string
      image : string
    }[]
  >,
  pageTitle: {
    type: String,
  },
})
</script>
