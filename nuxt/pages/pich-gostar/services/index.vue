<template>
  <CategoryPage v-if="$route.query.product_type" :id="id" />
</template>

<script lang="ts" setup>
import {
  useContext,
  computed,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import CategoryPage from '~/components/page/CategoryPage.vue'
const { i18n } = useContext()
const route = useRoute()
const router = useRouter()

if (route.value.query.product_type === undefined)
  router.push({
    query: { product_type: 'page' },
  })

const id = computed(() => {
  return i18n.locale === 'fa' ? 'dGVybTozMw==' : 'dGVybToxMjk='
})
</script>
