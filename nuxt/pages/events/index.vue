<template>
  <section class=" text-gray-600 ">
    <div class="container mt-12">
      <h2 class="text-3xl">fa::upcomming Events</h2>

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
          class="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5"
        >
          <div
            class="w-full h-64 bg-top bg-cover rounded-t"
            style="background-image: url(https://images.unsplash.com/photo-1675747150294-0376b8c69e52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=2&auto=format%2Ccompress&fit=crop&w=599&h=310)"
          ></div>
          <div class="flex flex-col w-full md:flex-row">
            <div
              class="flex flex-row justify-around p-4 font-bold leading-none text-slate-800 uppercase  rounded md:flex-col md:items-center md:justify-center md:w-1/4"
            >
              <div class="md:text-3xl">Jan</div>
              <div class="md:text-6xl">13</div>
              <div class="md:text-xl">7 pm</div>
            </div>
            <div class="p-4 font-normal text-slate-800 md:w-3/4">
              <h1
                class="mb-3 mt-2 text-4xl font-bold leading-none tracking-tight text-slate-800"
              >
                2020 National Championship
              </h1>
              <p class="leading-normal">
                The College Football Playoff (CFP) determines the national
                champion of the top division of college football. The format
                fits within the academic calendar and preserves the sport’s
                unique and compelling regular season.
              </p>
              <div class="flex flex-row items-center mt-4 text-gray-700">
                <div class="w-1/2 text-lg">
                  هزینه :
                  <strong>
                    400000 تومان
                  </strong>
                </div>
                <div class="w-1/2"></div>
                <div class="w-1/2 flex justify-end">
                  <nuxt-link
                    class="flex gap-1 items-center bg-slate-100 rounded px-2 py-1 hover:bg-slate-200"
                    to="/"
                  >
                    مشاهده رویداد
                    <svg class="w-4 h-4" viewBox="0 0 24 24">
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
      </div>
    </div>
    <h2 class="text-3xl mt-16 mb-10 container">رویدادهای برگزار شده</h2>
    <div class="container mx-auto ">
      <div
        v-if="eventsquery.result && eventsquery.result?.value"
        class=" flex flex-wrap"
      >
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="ev in eventsquery.result.value.events || []"
            :key="ev.id"
            class=""
          >
            <a
              href="#"
              class="flex p-4 flex-col items-center gap-4 border  rounded-lg shadow md:flex-row md:max-w-xl  border-gray-700 bg-gray-800 hover:bg-gray-700"
            >
              <img
                class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src="https://images.unsplash.com/photo-1675747150294-0376b8c69e52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=2&auto=format%2Ccompress&fit=crop&w=599&h=310"
                alt=""
              />
              <div class="flex flex-col justify-between  leading-normal">
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Noteworthy technology acquisitions 2021
                </h5>
                <p class="mb-3 font-normal  text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import EVENTS from '@/apollo/q/events.gql'
import { EventsQuery, EventsQueryVariables } from '../../types/types'
import { defineComponent, useContext, useStore } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import { GeneralApiResponse } from '../../../api/data/types'
import { showGeneralApiMessage } from '../../data/utils'

const eventsquery = useQuery<EventsQuery, EventsQueryVariables>(EVENTS)

const ctx = useContext()

async function addToCart (eventid: string, eventname: string) {
  if (ctx.store.getters.isLoggedIn) {
    await ctx.$axios.post<GeneralApiResponse>('/cart-item', {
      eventid
    })
  } else {
    // @ts-ignore

    ctx.$izitoast.error({ title: 'fa:: first login to watch => ' + eventname })
  }
}
</script>
