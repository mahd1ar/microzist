<template>
  <div>
    <CategoryWithProductsPage :id="id" />   
    <!-- <ShoppingCards2 class="top-5" :cards="co" /> -->
  </div>
</template>

<script lang="ts" setup>
import { useContext, useRoute, computed } from '@nuxtjs/composition-api'
import CategoryWithProductsPage from '~/components/page/CategoryWithProductsPage.vue';
import ShoppingCards2 from '~/components/ShoppingCards2.vue'

type ShoppingCards2 = InstanceType<typeof ShoppingCards2>['$props']

const co: ShoppingCards2['cards'] = [
  {
    text: 'string',
    id: 'string',
    link: 'string',
    linkLabel: 'string',
    linkIcon: 'chav-left',
  },
]

const route = useRoute()
const { i18n } = useContext()

const id = computed(() => {
  const q = route.value.query as { en: string; fa: string }
  return i18n.locale === 'fa' ? q.fa : q.en
})


</script>
