<template>
  <div>
    <PageTemplate
      :body="pageInfo.body"
      :title="pageInfo.title"
      :image="pageInfo.image"
      :altimage="pageInfo.alttext"
    />

    <div class="container mx-auto">
      <div class="flex gap-4 justify-center items-start">
        <nuxt-link
          :to="localePath('/pich-gostar/quality-policy')"
          class="flex-center flex-col gap-2 w-36"
        >
          <div class="h-28">
            <img class="w-28 object-cover" src="/svg/quality/z-20.svg" alt="" />
          </div>
          <strong class="text-center">
            {{ $t('Quality_Policy') }}
          </strong>
        </nuxt-link>
        <nuxt-link
          :to="localePath(i.link)"
          v-for="i in items"
          :key="i.id"
          class="flex-center flex-col gap-2 w-36"
        >
          <div class="h-28">
            <img class="w-20" :src="i.image" alt="" />
          </div>
          <strong class="text-center">
            {{ i.title }}
          </strong>
        </nuxt-link>

        <!-- <div class="flex-center flex-col gap-2 w-36">
          <img class="w-20" src="/svg/lab.svg" alt="" />
          <strong class="text-center">کنترل کیفیت</strong>
        </div> -->
      </div>
    </div>
    <br /><br /><br />
    <!-- <img src="/svg/lab.svg" alt=""> -->
    <FooterSection />
  </div>
</template>

<script lang="ts" setup>
import PageTemplate from '~/components/inc/PageTemplate.vue'
import FooterSection from '~/components/FooterSection.vue'
import { useQuery } from '@vue/apollo-composable/dist'
import {
  LabAndQaQuery,
  LabAndQaQueryVariables,
  LanguageCodeEnum
} from '@/types/types'
import LABQL from '@/apollo/query/lab.gql'
import { computed } from 'vue'
import { useContext } from '@nuxtjs/composition-api'

const { i18n } = useContext()

const variables: LabAndQaQueryVariables = {
  language: i18n.locale === 'fa' ? LanguageCodeEnum.En : LanguageCodeEnum.Fa,
  id: i18n.locale === 'fa' ? 'dGVybToxMTc=' : 'dGVybToxMTc='
}

const { result } = useQuery<LabAndQaQuery>(LABQL, variables)

const pageInfo = computed(() => {
  return {
    title: result.value?.category?.name || '',
    image: result.value?.category?.cat_cf?.image?.sourceUrl || '',
    alttext: result.value?.category?.cat_cf?.image?.altText || '',
    body: result.value?.category?.description || ''
  }
})

const items = computed(() => {
  return result.value?.category?.contentNodes?.edges
    ? result.value?.category?.contentNodes?.edges.map(i => {
        console.log(i.node)
        return i?.node?.__typename === 'Page'
          ? {
              id: i.node.id,
              image: i.node.featuredImage?.node?.sourceUrl || '',
              link:
                '/page?' +
                new URLSearchParams({
                  [i18n.locale]: i!.node.id,
                  [variables.language!.toLowerCase()]: i.node!.translation!.id
                }).toString(),
              title: i.node.title || ''
            }
          : { id: '12', image: '', link: '', title: '' }
      })
    : []
})
</script>
