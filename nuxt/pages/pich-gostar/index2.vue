<template>
  <!-- layout -->

  <div class="w-full">
    <HeroSection2 />
    <div v-if="cats[0]" class="relative flex h-[50vh] bg-tm-gray-ligth">
      <div class="relative w-full">
        <img 
        :style="{
          '--y': y / 20,
          transform: 'translate3d(0px, calc(var(--y) * -1px), 0px)',
        }"
        class="h-auto w-full object-cover grayscale-[50%] hover:grayscale-0 transition-all ease-out" :src="cats[0].img" alt="" />

        <div class="container absolute left-0 top-0 mx-auto h-full ">
          <div  class="relative flex h-full flex-col items-end justify-center">
            <h2
              class="inline-flex h-24 items-center justify-center overflow-hidden bg-black px-2 text-7xl uppercase text-gray-100">
              {{ cats[0].name }}
            </h2>
          
            <nuxt-link data-depth="1" class="flex bg-primary text-3xl uppercase text-black"
              :to="localePath('/pich-gostar/products')">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24">
                <path fill="currentColor" d="M17.6 18L8 8.4V17H6V5h12v2H9.4l9.6 9.6Z" />
              </svg>
              see more
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cats[1]" class="relative flex h-[50vh] bg-tm-gray-ligth">
      <div class="relative w-full overflow-hidden">
        <img :style="{
          '--y': y / 20,
          transform: 'translate3d(0px, calc(var(--y) * -1px), 0px)',
        }" class="h-auto w-full object-cover grayscale-[50%] hover:grayscale-0 transition-all ease-out" :src="cats[1].img" alt="" />

        <div class="container absolute left-0 top-0 mx-auto h-full">
          <div class="flex h-full flex-col items-start justify-center">
            <div class="inline-flex flex-col items-end justify-center">
              <h2
                class="inline-flex h-24 items-center justify-center overflow-hidden bg-black px-2 text-7xl uppercase text-gray-100">
                {{ cats[1].name }}
              </h2>
              <nuxt-link class="flex bg-primary text-3xl uppercase text-black"
                :to="localePath('/pich-gostar/products')">
                {{ $t('see_more') }}
                <svg class="rotate-90" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                  preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.6 18L8 8.4V17H6V5h12v2H9.4l9.6 9.6Z" />
                </svg>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative flex h-[50vh] bg-tm-gray-ligth">
      <div class="relative w-full overflow-hidden">
        <img :style="{
          '--y': y / 20,
          transform: 'translate3d(0px, calc(var(--y) * -1px), 0px)',
        }" class="h-auto w-full object-cover grayscale-[50%] transition-all ease-out"
          src="http://api.carizanin.com/wp-content/uploads/2022/12/photo-1581092580497-e0d23cbdf1dc-scaled.jpg"
          alt="" />

        <div id="scene" class="container absolute left-0 top-0 mx-auto h-full">
          <div class="flex h-full flex-col items-end justify-center">
            <h2 data-depth="0.2"
              class="inline-flex h-24 items-center justify-center overflow-hidden bg-black px-2 text-7xl uppercase text-gray-100">
              Lab&qc
            </h2>
            <nuxt-link data-depth="1" class="flex bg-primary text-3xl uppercase text-black"
              :to="localePath('/pich-gostar/products')">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24">
                <path fill="currentColor" d="M17.6 18L8 8.4V17H6V5h12v2H9.4l9.6 9.6Z" />
              </svg>
              see more
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="relative flex h-[70vh] bg-tm-gray-ligth">
      <div class="relative w-full overflow-hidden">
        <img :style="{
          '--y': y / 20,
          transform: 'translate3d(0px, calc(var(--y) * -1px), 0px)',
        }" class="h-auto w-full object-cover grayscale-[50%] transition-all ease-out"
          src="http://api.carizanin.com/wp-content/uploads/2022/12/photo-1581092335397-9583eb92d232.jpg"
          alt="" />

        <div class="container absolute left-0 top-0 mx-auto h-full">
          <div class="flex h-full flex-col items-start justify-center">
            <div class="inline-flex flex-col items-start justify-center">
              <h2
                class="inline-flex h-24 items-center justify-center overflow-hidden bg-black px-2 text-7xl uppercase text-primary">
                Description of the activity
              </h2>
              <div class="w-8/12 bg-black bg-opacity-80 p-2 text-xl capitalize text-white backdrop-blur-sm">
                Karizan Pich Gostar Company produces all kinds of bolts and nuts
                with different standards, grades and coatings, and these
                products are produced and supplied for use in all kinds of
                industries. Bolts and nuts are the most widely used industrial
                parts that choose the type and grade. Suitable for screws is a
                completely engineered fan.
              </div>
              <!-- <nuxt-link
                class="flex bg-primary text-3xl uppercase text-black"
                :to="localePath('/pich-gostar/products')"
              >
                {{ $t('see_more') }}
                <svg
                  class="rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M17.6 18L8 8.4V17H6V5h12v2H9.4l9.6 9.6Z"
                  />
                </svg>
              </nuxt-link> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-10 bg-black">.</div>

    <FooterSection />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  onBeforeUnmount,
  useStore,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import HeroSectionVue from '~/components/homepage/HeroSection2.vue'
import { useQuery } from '@vue/apollo-composable/dist'
import HOMEGQL from '@/apollo/query/home-page.gql'
import { HomeQuery, HomeQueryVariables, LanguageCodeEnum } from '@/types/types'
import { stripHtml } from '~/data/utils'
import { useWindowScroll } from '@vueuse/core'

export default defineComponent({
  components: {
    HeroSection2: HeroSectionVue,
  },

  name: 'IndexPage',
  setup() {
    const { i18n, error } = useContext()
    const store = useStore()

    const variable: HomeQueryVariables = {
      languages:
        i18n.locale.toLowerCase() === 'fa'
          ? LanguageCodeEnum.Fa
          : LanguageCodeEnum.En,
    }

    const { result, onError } = useQuery<HomeQuery>(HOMEGQL, variable)

    const { x, y } = useWindowScroll()

    onError(() => {
      error({ message: '_GET_INFO_ERROR', statusCode: 500 })
    })

    const cats = computed(() => {
      return result?.value?.categories?.edges
        ? result.value.categories.edges.map((i) => ({
          id: i!.node!.id,
          name: i?.node?.name || '',
          img: i?.node?.cat_cf?.image?.sourceUrl || '',
          description: i?.node?.description || '',
        }))
        : []
    })

    const explain = computed(() => {
      return {
        imageSrc: result.value?.page?.featuredImage?.node?.sourceUrl || '',
        imageAlt: result.value?.page?.featuredImage?.node?.altText || '',
        title: result.value?.page?.title || '',
        body: stripHtml(result.value?.page?.content || ''),
      }
    })
    onMounted(() => {
      document.querySelector('header')!.style.position = 'fixed'
    })
    onBeforeUnmount(() => {
      store.dispatch('toggleNav', true)
      document.querySelector('header')!.style.removeProperty('position')
    })



    return {

      y,
      cats,
      explain,
    }
  },
})
</script>

<style lang="scss">
.service {
  clip-path: polygon(0px 0px, 100% 0px, 60% 100%, 0% 100%);
}

html[dir='ltr'] .service {
  clip-path: polygon(80px 0px, 100% 0px, 100% 100%, 0% 100%);
}

@screen sm {
  .service {
    clip-path: polygon(0px 0px, 100% 0px, 85% 100%, 0% 100%);
  }
}

.product {
  clip-path: polygon(60% 0%, 100% 0, 100% 100%, 0% 100%);
}

html[dir='ltr'] .product {
  clip-path: polygon(0% 0%, 100% 0, 80% 100%, 0% 100%);
}

@screen sm {
  .product {
    clip-path: polygon(20% 0%, 100% 0, 100% 100%, 0% 100%);
  }
}
</style>
