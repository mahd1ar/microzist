<template>
  <section class="text-gray-600">
    <loading-indicator kind="dna" :loading="loading">
      <template>
        <div class="container mt-12">
          <h2 class="text-3xl">رویداد های پیش رو</h2>

          <!-- <div class="bg-slate-900 text-slate-50 border rounded-xl p-6 relative">
            <div class="flex justify-between">
              <div>
                <h1 class="text-4xl ">dorehami 2</h1>
                <div>
    
                </div>
              </div>
              <div>2</div>
            </div>
          </div> -->

          <!-- component -->
          <div class="mx-auto mt-10">
            <div
              v-if="upcommings[0]"
              class="flex w-full flex-col rounded bg-white shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5"
            >
              <div
                class="h-64 w-full rounded-t bg-cover bg-top"
                :style="{
                  backgroundImage: `url(${upcommings[0].image?.url || ''})`
                }"
              ></div>
              <div class="flex w-full flex-col md:flex-row">
                <div
                  class="flex flex-row justify-around rounded p-4 font-bold uppercase leading-none text-slate-800 md:w-1/4 md:flex-col md:items-center md:justify-center"
                >
                  <div class="md:text-3xl">Jan</div>
                  <div class="md:text-6xl">13</div>
                  <div class="md:text-xl">7 pm</div>
                </div>
                <div class="p-4 font-normal text-slate-800 md:w-3/4">
                  <h1
                    class="mb-3 mt-2 text-4xl font-bold  tracking-tight text-slate-800 "
                  >
                    {{ upcommings[0].name }}
                  </h1>
                  <!-- <p class="leading-normal">
                    {{ upcommings[0].description }}
                  </p> -->
                  <div class="mt-8 flex flex-row items-center text-gray-700">
                    <div class="w-1/2 text-lg">
                      هزینه :
                      <strong> {{ upcommings[0].priceFa }} </strong>
                    </div>
                    <div class="w-1/2"></div>
                    <div class="flex w-1/2 justify-end">
                      <nuxt-link
                        class="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 hover:bg-slate-200"
                        :to="'/events/' + upcommings[0].id"
                      >
                        مشاهده رویداد
                        <svg class="h-4 w-4" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225Z"
                          />
                        </svg>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-500">
              فعلا رویدادی برای برگزاری وجود ندارد
            </div>
          </div>
        </div>
        <h2 class="container mt-16 mb-10 text-3xl">رویدادهای برگزار شده</h2>
        <div class="container mx-auto">
          <div v-if="result" class="flex flex-wrap">
            <div class="grid grid-cols-2 items-stretch gap-2">
              <div v-for="ev in passed" :key="ev.id" class="">
                <nuxt-link
                  :to="'/events/' + ev.id"
                  class="flex h-full flex-col items-center gap-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow hover:bg-gray-700 md:max-w-xl md:flex-row"
                >
                  <img
                    class="h-96 w-full rounded-lg object-cover md:h-auto md:w-48"
                    :src="ev.image?.url"
                    alt=""
                  />
                  <div class="flex flex-col justify-between leading-normal">
                    <h5
                      class="mb-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                      {{ ev.name }}
                    </h5>
                    <p class="font-normal text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </template>
    </loading-indicator>
  </section>
</template>

<script lang="ts" setup>
import EVENTS from '@/apollo/q/events.gql'
import { EventsQuery, EventsQueryVariables } from '../../types/types'
import {
  computed,
  defineComponent,
  useContext,
  useStore
} from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import LoadingIndicator from '~/components/LoadingIndicator.vue'

const { result, loading } = useQuery<EventsQuery, EventsQueryVariables>(EVENTS)

const ctx = useContext()

const upcommings = computed(
  () => result.value?.events?.filter(i => i.isUpcomming) || []
)

const passed = computed(
  () => result.value?.events?.filter(i => !i.isUpcomming) || []
)
</script>
