<template>
  <LoadingIndicator :isLoading="loading">
    <div>
    
      <PageTemplate :title="pageInfo.title" :body="pageInfo.content" :image="pageInfo.image" />
   
      <FooterSection />
    </div>
  </LoadingIndicator>
</template>

<script lang="ts" setup>
import { computed, useContext, useRoute } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import PageTemplate from '~/components/inc/PageTemplate.vue';
import { LanguageCodeEnum, PageQueryVariables, PageQuery } from '~/types/types'

import PAGE from '@/apollo/query/page.gql'

const route = useRoute()
const ctx = useContext()

const q = route.value.query as { fa : string , en : string }


const variable: PageQueryVariables = {
  id : ctx.i18n.locale === 'fa' ? q.fa : q.en ,
  language:
    ctx.i18n.locale.toLowerCase() === 'fa'
      ? LanguageCodeEnum.En
      : LanguageCodeEnum.Fa,
}

const { onError, loading, result } = useQuery<PageQuery>(PAGE, variable)

onError(() => {
  ctx.error({ message: '_SOMETHING_WENTWRONG', statusCode: 500 })
})


const pageInfo = computed(() => {
  return {
     title : result.value?.page?.title || '' ,
     content : result.value?.page?.content || '',
     image : result.value?.page?.featuredImage?.node?.sourceUrl || '',
     alttext : result.value?.page?.featuredImage?.node?.altText || ''
  }
})
// ctx.i18n.onLanguageSwitched = (_, nlang) => {
//   console.log('lang switched')
// }
</script>
