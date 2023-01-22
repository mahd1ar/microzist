<template>
  <!-- layout -->

  <div class="w-full">
    <HeroSection />

    <!-- bg-primary 🔽 -->
    <div v-if="cats[0]" class="relative flex h-[50vh] bg-primary">
      <nuxt-link
        :to="localePath('/pich-gostar/products')"
        class="product relative w-7/12"
        style="height: 101%"
      >
        <img class="h-full w-full object-cover" :src="cats[0].img" alt="" />
      </nuxt-link>

      <div
        class="absolute flex h-full w-full items-center overflow-hidden bg-none sm:relative sm:w-5/12 sm:bg-primary"
      >
        <!-- <img
            class="w-full object-cover absolute grayscale scale-150 opacity-10 pointer-events-none"
            src="/sample/sample1.jpg"
            alt=""
          /> -->
        <div
          class="container flex flex-col items-end justify-start gap-3 sm:items-end md:translate-x-10"
        >
          <h2
            class="text-5xl font-semibold capitalize text-gray-700 md:text-7xl"
          >
            {{ cats[0].name }}
          </h2>
          <p>
            {{ cats[0].description }}
          </p>
          <nuxt-link
            :to="localePath('/pich-gostar/products')"
            class="text-bold flex items-center gap-2 rounded bg-tm-gray-dark px-4 py-2 text-xl text-primary rtl:flex-row-reverse"
          >
            <span class="px-2 transition-all hover:px-4">
              {{ $t('see') }}
            </span>
            <svg
              class="h-5 w-5 flex-shrink-0 rotate-180 rtl:rotate-0"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 5h14l.001 14H5V5z"
              />
              <path
                fill="currentColor"
                d="M13.293 6.293L7.586 12l5.707 5.707l1.414-1.414L10.414 12l4.293-4.293z"
              />
            </svg>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div
      v-if="cats[1]"
      class="relative flex h-[50vh] flex-row-reverse bg-tm-gray-dark"
    >
      <nuxt-link
        :to="localePath('/pich-gostar/services')"
        class="relative w-8/12"
      >
        <img
          v-if="cats[1].img"
          class="service h-full w-full object-cover"
          :src="cats[1].img"
          alt=""
        />
      </nuxt-link>
      <div
        class="relative flex w-4/12 items-center overflow-hidden bg-tm-gray-dark overflow-visible"
      >
        <div class="container flex flex-col items-start justify-start gap-4">
          <h2
            class="text-5xl font-semibold capitalize text-gray-200 md:text-7xl"
          >
            {{ cats[1].name }}
          </h2>
          <p class="text-gray-300" v-text="cats[1].description"></p>

          <nuxt-link
            :to="localePath('/pich-gostar/services')"
            class="text-bold flex items-center gap-2 rounded bg-gray-200 px-4 py-2 text-tm-black rtl:flex-row-reverse"
          >
            <span class="px-2 transition-all hover:px-4">
              {{ $t('see') }}
            </span>
            <svg
              class="h-5 w-5 flex-shrink-0 rotate-180 rtl:rotate-0"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 5h14l.001 14H5V5z"
              />
              <path
                fill="currentColor"
                d="M13.293 6.293L7.586 12l5.707 5.707l1.414-1.414L10.414 12l4.293-4.293z"
              />
            </svg>
          </nuxt-link>
        </div>
      </div>
    </div>

    <section class="container">
      <div class="relative flex w-full flex-col py-20 sm:flex-row">
        <div class="w-full overflow-hidden rounded shadow-md sm:w-4/12">
          <img
            :src="explain.imageSrc || '/sample/sample3.jpg'"
            class="h-full w-full object-cover"
            :alt="explain.imageAlt"
          />
        </div>
        <div
          class=" bottom-0 w-full bg-black px-8 py-4 text-white sm:relative sm:w-8/12 sm:bg-gray-100 sm:py-0 sm:text-black"
        >
          <div class="flex flex-col gap-4">
            <h2 class="text-3xl font-semibold text-primary sm:text-gray-700">
              {{ explain.title }}
            </h2>
            <p v-text="explain.body"></p>
          </div>
        </div>
      </div>
    </section>

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
  onMounted
} from '@nuxtjs/composition-api'
import HeroSectionVue from '~/components/homepage/HeroSection.vue'
import { useQuery } from '@vue/apollo-composable/dist'
import HOMEGQL from '@/apollo/query/home-page.gql'
import { HomeQuery, HomeQueryVariables, LanguageCodeEnum } from '@/types/types'
import { stripHtml } from '~/data/utils'

export default defineComponent({
  components: {
    HeroSection: HeroSectionVue
  },

  name: 'IndexPage',
  setup () {
    const aboutVars = {
      fa: 'cG9zdDoxMzQ=',
      en: 'cG9zdDoxMzE='
    }
    const { i18n, error } = useContext()
    const store = useStore()
    const variable: HomeQueryVariables = {
      languages:
        i18n.locale.toLowerCase() === 'fa'
          ? LanguageCodeEnum.Fa
          : LanguageCodeEnum.En,
      // @ts-ignore
      aboutid: aboutVars[i18n.locale.toLowerCase()]
    }
    const { result, onError } = useQuery<HomeQuery>(HOMEGQL, variable)

    onError(() => {
      error({ message: '_GET_INFO_ERROR', statusCode: 500 })
    })

    console.log(result)

    const cats = computed(() => {
      return result?.value?.categories?.edges
        ? result.value.categories.edges.map(i => ({
            id: i!.node!.id,
            name: i?.node?.name || '',
            img: i?.node?.cat_cf?.image?.sourceUrl || '',
            description: i?.node?.description || ''
          }))
        : []
    })

    const explain = computed(() => {
      return {
        imageSrc: result.value?.page?.featuredImage?.node?.sourceUrl || '',
        imageAlt: result.value?.page?.featuredImage?.node?.altText || '',
        title: result.value?.page?.title || '',
        body: stripHtml(result.value?.page?.content || '')
      }
    })

    return {
      cats,
      explain
    }
  }
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
