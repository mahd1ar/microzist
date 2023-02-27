<template>
  <div>
    <LoadingIndicator :loading="loading">
      <div class="container mx-auto mt-2 flex flex-col gap-6">
        <div class="relative h-96 overflow-hidden rounded-xl border">
          <img
            :src="result?.event?.image?.url"
            class="relative h-full w-full object-cover"
            alt=""
          />
          <div
            class="absolute bottom-0 right-0 flex h-full w-2/3 flex-col items-start justify-between p-4"
          >
            <span
              v-if="result?.event?.isUpcomming"
              class="mt-5 inline-flex items-center justify-end gap-2 rounded bg-green-600 px-2 text-lg text-white"
            >
              <svg class="h-5 w-5" viewBox="0 0 48 48">
                <g fill="none">
                  <path
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44Z"
                  />
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M24 37a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5Z"
                    clip-rule="evenodd"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M24 12v16"
                  />
                </g>
              </svg>
              رویداد پیش رو
            </span>
            <div
              class="relative mt-auto inline-block min-h-fit rounded bg-white bg-opacity-40 p-2 text-4xl font-bold text-black backdrop-blur"
            >
              {{ result?.event?.name }}
            </div>
          </div>
        </div>
        <div class="flex flex-row-reverse gap-4">
          <aside class="w-full">
            <div
              class="transition-transform duration-300 ease-out will-change-transform hover:scale-105"
            >
              <div
                id="event-info"
                class="flex flex-col gap-6 rounded bg-slate-50 p-4 shadow-sm"
              >
                <div
                  class="flex h-8 items-center justify-between border-b text-sm"
                >
                  <div class="flex items-center gap-2">
                    <div>
                      <svg class="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588Q21 5.175 21 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm0-2h14V10H5v10ZM5 8h14V6H5Zm0 0V6v2Zm7 6q-.425 0-.712-.288Q11 13.425 11 13t.288-.713Q11.575 12 12 12t.713.287Q13 12.575 13 13t-.287.712Q12.425 14 12 14Zm-4 0q-.425 0-.713-.288Q7 13.425 7 13t.287-.713Q7.575 12 8 12t.713.287Q9 12.575 9 13t-.287.712Q8.425 14 8 14Zm8 0q-.425 0-.712-.288Q15 13.425 15 13t.288-.713Q15.575 12 16 12t.712.287Q17 12.575 17 13t-.288.712Q16.425 14 16 14Zm-4 4q-.425 0-.712-.288Q11 17.425 11 17t.288-.712Q11.575 16 12 16t.713.288Q13 16.575 13 17t-.287.712Q12.425 18 12 18Zm-4 0q-.425 0-.713-.288Q7 17.425 7 17t.287-.712Q7.575 16 8 16t.713.288Q9 16.575 9 17t-.287.712Q8.425 18 8 18Zm8 0q-.425 0-.712-.288Q15 17.425 15 17t.288-.712Q15.575 16 16 16t.712.288Q17 16.575 17 17t-.288.712Q16.425 18 16 18Z"
                        />
                      </svg>
                    </div>
                    <div>تاریخ شروع</div>
                  </div>
                  <div>
                    {{ convertDate(result?.event?.from || '') }}
                  </div>
                </div>

                <div
                  class="flex h-8 items-center justify-between border-b text-sm"
                >
                  <div class="flex items-center gap-2">
                    <div>
                      <svg class="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588Q21 5.175 21 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm0-2h14V10H5v10ZM5 8h14V6H5Zm0 0V6v2Zm7 6q-.425 0-.712-.288Q11 13.425 11 13t.288-.713Q11.575 12 12 12t.713.287Q13 12.575 13 13t-.287.712Q12.425 14 12 14Zm-4 0q-.425 0-.713-.288Q7 13.425 7 13t.287-.713Q7.575 12 8 12t.713.287Q9 12.575 9 13t-.287.712Q8.425 14 8 14Zm8 0q-.425 0-.712-.288Q15 13.425 15 13t.288-.713Q15.575 12 16 12t.712.287Q17 12.575 17 13t-.288.712Q16.425 14 16 14Zm-4 4q-.425 0-.712-.288Q11 17.425 11 17t.288-.712Q11.575 16 12 16t.713.288Q13 16.575 13 17t-.287.712Q12.425 18 12 18Zm-4 0q-.425 0-.713-.288Q7 17.425 7 17t.287-.712Q7.575 16 8 16t.713.288Q9 16.575 9 17t-.287.712Q8.425 18 8 18Zm8 0q-.425 0-.712-.288Q15 17.425 15 17t.288-.712Q15.575 16 16 16t.712.288Q17 16.575 17 17t-.288.712Q16.425 18 16 18Z"
                        />
                      </svg>
                    </div>
                    <div>تاریخ پایان</div>
                  </div>
                  <div>
                    {{ convertDate(result?.event?.to || '') }}
                  </div>
                </div>

                <div
                  class="flex h-8 items-center justify-between border-b text-sm"
                >
                  <div class="flex items-center gap-2">
                    <div>
                      <svg class="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 12q.825 0 1.413-.588Q14 10.825 14 10t-.587-1.413Q12.825 8 12 8q-.825 0-1.412.587Q10 9.175 10 10q0 .825.588 1.412Q11.175 12 12 12Zm0 7.35q3.05-2.8 4.525-5.088Q18 11.975 18 10.2q0-2.725-1.738-4.463Q14.525 4 12 4Q9.475 4 7.737 5.737Q6 7.475 6 10.2q0 1.775 1.475 4.062Q8.95 16.55 12 19.35ZM12 22q-4.025-3.425-6.012-6.363Q4 12.7 4 10.2q0-3.75 2.413-5.975Q8.825 2 12 2t5.587 2.225Q20 6.45 20 10.2q0 2.5-1.987 5.437Q16.025 18.575 12 22Zm0-11.8Z"
                        />
                      </svg>
                    </div>
                    <div>محل برگزاری</div>
                  </div>
                  <div>
                    {{ result?.event?.location }}
                  </div>
                </div>
                <div
                  v-if="result?.event?.price !== -1"
                  class="flex h-8 items-center justify-between border-b text-sm"
                >
                  <div class="flex items-center gap-2">
                    <div>
                      <svg class="w-5 text-emerald-500" viewBox="0 0 32 32">
                        <path
                          fill="currentColor"
                          d="M2 7v17h28V7H2zm4 2h20a2 2 0 0 0 2 2v9a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-9a2 2 0 0 0 2-2zm9 2c0 1.439-.561 2-2 2v2c.776 0 1.437-.151 2-.412V20h2v-9h-2zm-6.5 3a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 14zm15 0a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 23.5 14z"
                        />
                      </svg>
                    </div>
                    <div>هزینه</div>
                  </div>
                  <div class="text-base">
                    {{ result?.event?.priceFa }}
                  </div>
                </div>

                <template v-if="result?.event?.isUpcomming">
                  <!-- cannot reg -->
                  <div
                    class="text-center text-gray-300"
                    v-if="result?.event?.price === -1"
                  >
                    {{ result?.event?.priceFa }}
                  </div>
                  <!-- reg event -->
                  <button
                    @click="
                      registerEvent(
                        result?.event?.id || '',
                        result?.event?.name || ''
                      )
                    "
                    v-else-if="!result?.event?.isAccessible"
                    class="h-12 w-full border-b bg-emerald-600 py-2 text-center font-bold text-white hover:bg-emerald-500"
                  >
                    ثبت نام در این رویداد
                  </button>
                  <!-- already reg -->
                  <div
                    v-else
                    class="flex h-12 w-full items-center justify-center border-b bg-green-600 py-2 text-center font-bold text-white"
                  >
                    <svg class="aspect-square w-6" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4Z"
                      />
                    </svg>
                    <div>شما در این رویداد ثبت نام کردید</div>
                  </div>
                </template>
              </div>
            </div>
          </aside>
          <div class="w-2/3 flex-shrink-0">
            <json-content
              v-if="result?.event?.isUpcomming"
              :content="result?.event?.content?.document"
            />
            <div v-else>
              <p class="text-lg text-black">
                {{ result?.event?.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </LoadingIndicator>
  </div>
</template>

<script lang="ts">
import EVENTQ from '@/apollo/q/event.gql'
import { useQuery } from '@vue/apollo-composable/dist'
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { EventQuery, EventQueryVariables } from '@/types/types'
import LoadingIndicator from '~/components/LoadingIndicator.vue'
import { PersianCalander } from '@/data/utils'

export default defineComponent({
  name: 'EventPage',
  setup() {
    const ctx = useContext()

    const { result, loading } = useQuery<EventQuery, EventQueryVariables>(
      EVENTQ,
      {
        id: ctx.route.value.params.id,
      }
    )

    async function registerEvent(eventid: string, eventname: string) {
      if (ctx.store.getters.isLoggedIn) {
        await ctx.$axios.post('/cart-item', {
          eventid,
        })
      } else {
        // @ts-ignore
        ctx.$izitoast.error({
          title: 'fa:: first login to register => ' + eventname,
        })
      }
    }

    return {
      loading,
      result,
      registerEvent,
      convertDate: (input: string) =>
        input ? new PersianCalander(input).toLetterMounth().join(' ') : '',
    }
  },
})
</script>

<style>
#event-info {
  animation-name: move-up;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-direction: normal;
  animation-fill-mode: forwards;
  transition: all;
}

@keyframes move-up {
  from {
    /* @apply translate-y-16 -translate-x-2; */
    transform: translate(8px, 46px);
  }
  to {
    transform: translate(8px, -64px);
    /* @apply -translate-y-16 -translate-x-2; */
  }
}
</style>
