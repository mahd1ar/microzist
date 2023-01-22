<template>
  <loading-indicator :isLoading="loading">
    <CategoryWithItems :page-info="pageInfo" :items="items" />
    <FooterSection />
  </loading-indicator>
</template>

<script lang="ts" setup>
import CATWITHPRODS from '@/apollo/query/categories-with-products.gql'
import {
  CategoriesWithProductsQuery,
  CategoriesWithProductsQueryVariables,
LanguageCodeEnum,
} from '@/types/types'
import { computed, useContext, useRoute } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import CategoryWithItems from '~/components/inc/CategoryWithItems.vue'

const router = useRoute()
const q = router.value.query as {
  product_type: 'post' | 'page' | 'media' | undefined
}

const { id } = defineProps({
  id: { type: String, required: true },
})


const { i18n } = useContext()

const variable: CategoriesWithProductsQueryVariables = {
  id,
  language : i18n.locale === 'fa' ? LanguageCodeEnum.En : LanguageCodeEnum.Fa,
  isPost: q.product_type ? q.product_type === 'post' : true,
  isPage: q.product_type === 'page',
  isMedia: q.product_type === 'media',
}
const { result, loading } = useQuery<CategoriesWithProductsQuery>(
  CATWITHPRODS,
  variable
)

const pageInfo = computed(() => ({
  title: result.value?.category?.name || '',
  description: result.value?.category?.description || '',
  image: result.value?.category?.cat_cf?.image?.sourceUrl || '',
}))

const items = computed(() => {
console.log(result.value?.category?.mediaItems)
  if(result.value?.category?.mediaItems)
  return result.value.category.mediaItems.nodes?.map(i => {
    return {
      image:  '',
      title: i?.title || '', 
      id: i!.id ,
      link: i?.mediaItemUrl || "#"
    }
  }) || []
  else
  return result.value?.category?.contentNodes?.edges
  ? result.value.category.contentNodes.edges.map((i) => {
    if (i?.node?.__typename === 'Post') {
      return {
        image: i.node.featuredImage?.node?.sourceUrl || '',
          title: i.node?.title ? i.node.title.split('\\').join('<br />') : '',
          id: i.node.id,
          link: '/product?' + new URLSearchParams({
                [i18n.locale]: i!.node.id,
                [variable.language!.toLowerCase()]: i.node.translation!.id,
              }).toString(), 
        }
      }

      if (i?.node?.__typename === 'Page') {
        return {
          image: i.node.featuredImage?.node?.sourceUrl || '',
          title: i.node.title || '',
          id: i.node.id,
          link: '/page?' + new URLSearchParams({
                [i18n.locale]: i!.node.id,
                [variable.language!.toLowerCase()]: i.node.translation!.id,
              }).toString(), 
        }
      } else {
        console.log("WTF");
        return {
          image: '',
          title: '',
          id: '',
          link: "#",
        }
      }

    }) || []
    : []
  })
</script>
