<template>
  <loading-indicator :isLoading="loading" class="w-full">
    <GeneralCategory v-if="!!items" :items="items" />
    <FooterSection />
  </loading-indicator>
</template>

<script lang="ts" setup>
import CHILDCATBYSLUG from '@/apollo/query/child-categories-by-slug.gql'
import {
  ChildCategoriesBySlugQuery,
  ChildCategoriesBySlugQueryVariables,
  LanguageCodeEnum,
} from '@/types/types'
import {
  computed,
  PropType,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import { stripHtml } from '~/data/utils'

const { id } = defineProps({
  id: {
    type: String as PropType<string | null | undefined>,
  },
})

const { i18n, localePath } = useContext()
const route = useRoute()
const q = route.value.query as {
  fa: string
  en: string
  product_type: 'post' | 'page' | 'media' | 'category' | undefined
}

const variable: ChildCategoriesBySlugQueryVariables = {
  id: id ? id : i18n.locale == 'fa' ? q.fa : q.en,
  isChildCategory:
    q.product_type === 'category' || q.product_type === undefined,
  isChildPage: q.product_type === 'page',
  language: i18n.locale === 'fa' ? LanguageCodeEnum.En : LanguageCodeEnum.Fa,
}

const { result, loading } = useQuery<ChildCategoriesBySlugQuery>(
  CHILDCATBYSLUG,
  variable
)

const items = computed(() => {
  if (result.value?.category?.contentNodes) {
    return (
      result.value.category.contentNodes.nodes?.map((i) => {
        if (i?.__typename === 'Page')
          return {
            title: i?.title || '',
            excerpt: stripHtml(i?.content || ''),
            link:
              '/page?' +
              new URLSearchParams({
                [i18n.locale]: i!.id,
                [variable.language!.toLowerCase()]: i.translation!.id,
                product_type: '',
              }).toString(),
            image: i?.featuredImage?.node?.sourceUrl || '',
          }
      }) || []
    )
  } else
    return result.value?.category?.children?.edges?.map((i) => ({
      title: i?.node?.name,
      excerpt: i?.node?.description,
      link:
        `${route.value.fullPath}/${i!.node!.name}?` +
        new URLSearchParams({
          [i18n.locale]: i!.node!.id,
          [variable.language!.toLowerCase()]: i!.node!.translation!.id,
          product_type: '',
        }).toString(),

      image: i?.node?.cat_cf?.image?.sourceUrl || '',
    }))
})
</script>
