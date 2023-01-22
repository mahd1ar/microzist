<template>
  <div>
    <section class="body-font text-gray-600">
      <div class="container mx-auto flex flex-wrap px-5 py-24">
        <div class="flex w-full flex-wrap px-2">
          <h1 class="title-font mb-4 text-2xl font-medium capitalize text-gray-900 sm:text-4xl lg:mb-0 lg:w-1/3">
            {{ $t('image_gallery') }}
          </h1>
          <p v-if="result?.category?.description" class="mx-auto text-base leading-relaxed lg:w-2/3 lg:pl-6">
            {{result.category.description}}
          </p>
        </div>

        <section class="overflow-hidden text-gray-700">
          <div class="container mx-auto px-2 py-2 lg:pt-12">
            <client-only>
              <div class="flex gap-2 pb-8">
                <div v-for="cat in categories" :key="cat.id" @click="selectSubCategory(cat.id)" :class="
                  cat.id === subcategoryID
                    ? 'border-primary-light bg-primary font-bold text-black'
                    : 'cursor-pointer border-tm-black bg-white text-tm-black hover:bg-slate-200'
                " class="flex h-10 items-center justify-center rounded border py-1 px-3 text-sm">
                  {{ cat.label }}
                </div>
              </div>
            </client-only>
            <loading-indicator :is-loading="loading">
              <!-- old -->
              <!-- <div class="flex flex-wrap" v-for="(i, index) in images" :key="index">
            <div
              class="flex w-1/2 flex-wrap"
              v-for="(j, index2) in i"
              :key="index2"
            >
              <div
                v-for="(k, index3) in j"
                :key="index3"
                :class="
                  [5, 0].includes(index2 * 3 + index3) ? 'w-full' : 'w-1/2'
                "
                class="relative p-1 md:p-2"
              >
                <img
                  alt="gallery"
                  class="block h-full w-full object-cover object-center"
                  :src="k.src"
                />
              </div>
            </div>
          </div> -->

              <div class="-m-1 flex flex-wrap md:-m-2">
                <div v-for="(img, index) in images" :key="index" class="flex w-1/3 flex-wrap">
                  <div class="w-full p-1 md:p-2">
                    <img @click="openImage(index)" alt="gallery"
                      class="block h-full w-full rounded-lg object-cover object-center" :src="img.src" />
                  </div>
                </div>
              </div>
            </loading-indicator>
          </div>
        </section>
      </div>
    </section>

    <Splide v-if="selectedItem > -1" :selected-item.sync="selectedItem" :images="images" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import { chunk } from '~/data/utils'

import GALLERYQL from '@/apollo/query/gallery.gql'
import { useQuery } from '@vue/apollo-composable/dist'
import { GalleryQuery, GalleryQueryVariables } from '~/types/types'
const { i18n } = useContext()
const categories = ref<{ label: string; id: string }[]>([])

const variable: GalleryQueryVariables = {
  id: i18n.locale === 'fa' ? 'dGVybToxNTE=' : 'dGVybToxNTM=',
}

const { result, loading, refetch, onResult } = useQuery<GalleryQuery>(
  GALLERYQL,
  variable
)
const selectedItem = ref(-1)
const subcategoryID = ref(variable.id)

onResult((result) => {
  if (categories.value.length > 0) return

  const cats = result.data?.category?.children?.edges
    ? result.data.category.children.edges.map((i) => ({
      label: i!.node!.name || '',
      id: i!.node!.id,
    }))
    : []

  cats.unshift({
    label: String(i18n.t('all_categories')),
    id: variable.id,
  })

  cats.forEach((i) => {
    categories.value.push(i)
  })
})

const selectSubCategory = (id: string) => {
  refetch({ id })
  subcategoryID.value = id
}

// const images = computed(() => {
//   return chunk(
//     result.value?.category?.mediaItems?.edges?.map(i => ({ src: i?.node?.sourceUrl || '', alt: 'gallery' })) || []
//     , 6).map(i => chunk(i, 3))
// })
const images = computed(() => {
  return (
    result.value?.category?.mediaItems?.edges?.map((i) => ({
      src: i?.node?.sourceUrl || '',
      alt: 'gallery',
    })) || []
  )
})

const openImage = (index: number) => {
  selectedItem.value = index
}

// :initial="{
//               scale: 1.5,
//               y: 100,
//               opacity: 0,
//             }"
//             :enter="{
//               opacity: 1,
//               y: 0,
//               scale: 1,
//               transition: {
//                 type: 'spring',
//                 stiffness: 250,
//                 damping: 25,
//                 mass: 0.5,
//                 delay: index * 70,
//               },
//             }"
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
  transition-delay: calc(var(--count) * 100ms);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.list-enter {
  /* transform: scale(1.1) translateY(100px); */
  clip-path: polygon(0 0, 100% 0, 100% 9%, 0 9%);
  opacity: 0;
}

.list-leave-to

/* .list-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.list-move

/* .list-leave-active below version 2.1.8 */
  {
  opacity: 0;
  width: 0%;
  /* transform: translateY(30px); */
}
</style>
