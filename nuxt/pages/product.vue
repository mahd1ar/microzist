<template>
  <LoadingIndicator :isLoading="loadingProduct">
    <div class="container mx-auto mt-5 flex flex-col gap-6">
      <div class="flex gap-6 justify-between" dir="rtl">
        <div class="w-3/12">
          <div class="rounded border-2 border-gray-300 aspect-square w-full">
            <img
              class="w-full h-full object-cover"
              :src="pageContent.featuredImage"
              alt=""
            />
          </div>
        </div>
        <div class="w-9/12 text-left py-4 flex-center">
          <div class="w-full">
            <h1
              class="capitalize text-5xl text-gray-700 font-bold"
              v-text="pageContent.titleCollection[0]"
            ></h1>

            <h3
              v-for="title in pageContent.titleCollection.slice(1)"
              :key="title"
              class="capitalize text-2xl text-gray-600 font-bold"
            >
              {{ title }}
            </h3>
          </div>
        </div>
      </div>

      <div class="flex gap-4 md:flex-row flex-col">
        <div class="w-full md:w-4/12">
          <client-only>
            <div
              v-if="loadingTable === false && TErr === false"
              class="rounded border-2 border-gray-300 flex flex-col gap-2 p-2 md:hover:scale-105 transition-all transform-gpu duration-300"
            >
              <div>
                <label for="diameter">
                  {{ $t('diameter') }}
                </label>
                <select
                  v-model="TVDiameter"
                  class="w-full"
                  name="diameter"
                  id="diameter"
                >
                  <option v-for="i in TDiameter" :key="i" :value="i">
                    {{ i }}
                  </option>
                </select>
              </div>
              <div>
                <label for="length">
                  {{ $t("length") }}
                </label>
                <select
                  v-model="TVLength"
                  class="w-full"
                  name="length"
                  id="length"
                >
                  <option v-for="i in TLength" :key="i" :value="i">
                    {{ i }}
                  </option>
                </select>
              </div>

              <div v-if="details">
                <div class="mt-6">
                  {{ $t('specifications') }}
                </div>
                <div class="flex border-t border-gray-200 py-2 justify-between">
                  <span class="text-gray-500">
                    {{ $t('weight') }}
                  </span>
                  <span class="text-gray-900">{{
                    details.Weight
                  }}</span>
                </div>
                <div class="flex border-t border-gray-200 py-2 justify-between">
                  <span class="text-gray-500">
                    {{ $t('quantity_per_kg') }}
                  </span>
                  <span class=" text-gray-900">
                    {{ details.QuantityPerKg }}
                  </span>
                </div>

                <div class="flex border-t border-gray-200 py-2 justify-between">
                  <span class="text-gray-500">
                    {{ $t('wrench') }}
                  </span>
                  <span class="text-gray-900">
                    {{ details.Wrench }}
                  </span>
                </div>

                <div class="flex border-t border-gray-200 py-2 justify-between">
                  <span class="text-gray-500">
                    {{ $t('flower_height') }}
                  </span>
                  <span class=" text-gray-900">
                    {{ details.TotalHeight }}
                  </span>
                </div>

                <div class="flex border-t border-gray-200 py-2 justify-between">
                  <span class="text-gray-500">
                    {{ $t('step') }}
                  </span>
                  <span class="text-gray-900">
                    {{ details.step }}
                  </span>
                </div>
              </div>

              <div v-else>
                <div class="mt-6">
                  {{ $t('specifications') }}
                </div>
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500 text-center">
                    {{ $t('no_information_available') }}
                  </span>
                </div>
              </div>
            </div>
          </client-only>
        </div>
        <div class=" w-full md:w-8/12 text-center">
          <div
            v-if="pageContent.mapImage"
            class="rounded border-2 border-gray-300 w-full"
          >
            <ExpanableImg :src="pageContent.mapImage" />
          </div>
        </div>
      </div>

      <!-- <div class="flex flex-row-reverse gap-6">
        <div class="w-1/2">
          <img :src="pageContent.featuredImage" alt="" />
        </div>
        <div class="w-1/2">
          <h3 class="text-3xl">کنترل کیفیت</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
            nemo at ea, beatae similique amet reprehenderit sed minima nulla
            fugiat nam incidunt, eaque repudiandae culpa veniam eveniet eos
            doloribus tenetur!
          </p>
        </div>
      </div>

      <div class="mt-10 max-h-64 overflow-hidden">
        <img src="/sample/sample5.jpg" alt="" class="object-center" />
      </div>

      <div class="my-10 px-10">
        {{ $t('welcome') }}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem,
        quos! Odit doloremque qui consequatur at nemo eius dignissimos
        voluptates, accusamus, exercitationem ab enim maxime illo iusto velit
        voluptas sint libero. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Voluptatem, quos! Odit doloremque qui consequatur at
        nemo eius dignissimos voluptates, accusamus, exercitationem ab enim
        maxime illo iusto velit voluptas sint libero. Lorem ipsum dolor, sit
        amet consectetur adipisicing elit. Voluptatem, quos! Odit doloremque qui
        consequatur at nemo eius dignissimos voluptates, accusamus,
        exercitationem ab enim maxime illo iusto velit voluptas sint libero.
      </div> -->
      <WYSIWYG :includeGallery="false" :html="result?.post?.content || ''" />
    </div>
    <FooterSection class="mt-12" />
  </LoadingIndicator>
</template>

<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable/dist'
import PRODUCT from '@/apollo/query/product.gql'
import {
  ProductQuery,
  ProductQueryVariables,
  LanguageCodeEnum,
} from '@/types/types'
import {
  ref,
  Ref,
  computed,
  watch,
  useRoute,
  useContext,
} from '@nuxtjs/composition-api'
import { emptyArray } from '@/data/utils'
import ExpanableImg from '~/components/ExpanableImg.vue'
// import WIYSWYG from '~/components/WIYSWYG.vue'
const route = useRoute()
const ctx = useContext()

const TLength: Ref<string[]> = ref([])
const TDiameter: Ref<string[]> = ref([])
const TVLength: Ref<string> = ref('')
const TVDiameter: Ref<string> = ref('')
const TErr = ref(false)

// const dataTable : Ref<{[key : string] : string}> = ref({})
let dataTable: { [key: string]: string }[] = []
const details: Ref<null | { [key: string]: string }> = ref(null)
const loadingTable = ref(false)
const q = route.value.query as { fa : string , en : string }

const variable: ProductQueryVariables = {
  id: ctx.i18n.locale == 'fa' ? q.fa : q.en ,
  language:
    ctx.i18n.locale.toLowerCase() === 'fa'
      ? LanguageCodeEnum.En
      : LanguageCodeEnum.Fa,
}

const {
  onResult: onResultTable,
  onError: onErrorTable,
  loading: loadingProduct,
  result,
} = useQuery<ProductQuery>(PRODUCT, variable)

const pageContent = computed(() => {
  return {
    titleCollection: result.value?.post?.title?.split('\\') || ['', '', ''],
    mapImage:
      result.value?.post?.template?.__typename === 'Template_Product'
        ? result.value.post.template.cf?.map?.sourceUrl || ''
        : '',
    featuredImage: result.value?.post?.featuredImage?.node?.sourceUrl || '',
  }
})

watch([TVLength, TVDiameter], () => {
  try {
    const x = dataTable.find((i) => Object.entries(i)[0][1] === TVLength.value)!
    const y = Object.entries(x).find((i) => i[0] === TVDiameter.value)![1]
    const z = y.split(':')

    details.value = {
      Weight: z[0] || '',
      QuantityPerKg: z[1] || '',
      Wrench: z[3] || '',
      TotalHeight: z[4] || '',
      step: z[2] || '',
    }
  } catch (error) {
    console.log(error)
    details.value = null
  }
})

onErrorTable((err) => {
  console.error(err)
  ctx.error({ message: 'SOEMTHING WENT WRONG' })
})

onResultTable(async (r) => {
  if (r.data.post === null) ctx.error({ message: 'SOEMTHING WENT WRONG' })

  if (
    r.data.post?.template?.__typename === 'Template_Product' &&
    r.data.post?.template.cf?.table?.mediaItemUrl
  ) {
    try {
      loadingTable.value = true
      // cf?.table?.mediaItemUrl
      const f = await (
        await fetch(r.data.post.template.cf.table.mediaItemUrl)
      ).arrayBuffer()
      const { read, utils } = await import('xlsx')
      const wb = read(f)
      const data = utils.sheet_to_json<{ [key: string]: string }>(
        wb.Sheets[wb.SheetNames[0]]
      )
      console.log('here')
      dataTable = data

      emptyArray(TLength.value)
      emptyArray(TDiameter.value)

      for (
        let i = 0;
        i <
        Object.entries(
          data.sort((a, b) => Object.keys(b).length - Object.keys(a).length)[0]
        ).length;
        i++
      )
        if (i !== 0) TDiameter.value.push(Object.entries(data[0])[i][0])

      data.forEach((i) => {
        TLength.value.push(Object.entries(i)[0][1])
      })

      console.log(TLength)
      TLength.value.sort((a, b) => Number(a) - Number(b))
      TVDiameter.value = TDiameter.value[0]
      TVLength.value = TLength.value[0]
    } catch (error) {
      console.error(error)
      TErr.value = true
    } finally {
      loadingTable.value = false
    }
  } else TErr.value = true
})
</script>
