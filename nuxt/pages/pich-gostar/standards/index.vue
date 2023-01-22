<template>
  <div>
    <!-- image="https://images.unsplash.com/photo-1664715934138-5b7621936796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=2&auto=format%2Ccompress&fit=crop&w=999&h=594" -->
    <PageTemplate
      :image="pageInfo.image"
      :title="pageInfo.title"
      :body="pageInfo.description"
    />

    <ShoppingCards3 :cards="items" />
    <br /><br /><br /><br />

    <FooterSection />
  </div>
</template>

<script lang="ts" setup>
import FooterSection from '../../../components/FooterSection.vue'
import PageTemplate from '../../../components/inc/PageTemplate.vue'
import ShoppingCards3 from '../../../components/ShoppingCards3.vue'

import CATQ from '~/apollo/query/categories-with-categories.gql'
import { useQuery } from '@vue/apollo-composable/dist'
import {
  CategoriesWithCategoriesQuery,
  CategoriesWithCategoriesQueryVariables,
  LanguageCodeEnum,
} from '../../../types/types'

import { computed, useContext, useRoute } from '@nuxtjs/composition-api'

const {i18n} = useContext();
const route = useRoute()

const variables: CategoriesWithCategoriesQueryVariables = {
  id: i18n.locale === 'fa' ? 'dGVybToxNDM=' : "dGVybToxNDU=",
  language: i18n.locale === 'fa' ? LanguageCodeEnum.En :  LanguageCodeEnum.Fa,
}

const { result } = useQuery<CategoriesWithCategoriesQuery>(CATQ, variables)

const pageInfo = computed(() => {
  return {
    title: result.value?.category?.name || '',
    description: result.value?.category?.description || '',
    image: result.value?.category?.cat_cf?.image?.sourceUrl || '',
  }
})

const items = computed(() => {
  return (
    result.value?.category?.children?.edges?.map((i) => ({
      image: i?.node?.cat_cf?.image?.sourceUrl || '',
      altImage: i?.node?.cat_cf?.image?.altText || '',
      id: i!.node!.id,
      title: i?.node?.name || '',

      link: i?.node?.name
        ? route.value.path + '/' + i?.node?.name + '?' +
          new URLSearchParams({
            [i18n.locale]: i!.node!.id,
            [variables.language!.toLowerCase()]: i.node!.translation!.id,
            product_type: 'media',
          }).toString()
        : '#',
    })) || []
  )
})
</script>
