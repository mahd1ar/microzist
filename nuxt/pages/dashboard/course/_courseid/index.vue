<template>
  <div class="bg-gray-300">
    {{ loading }}
    <div v-if="result?.course" class="container mx-auto my-6 flex gap-6">
      <div
        class="relative w-80 shrink-0 rounded-xl bg-gradient-to-tr from-slate-900 to-cyan-900"
      >
        <!-- <div
          class="absolute inset-0 h-full w-full scale-105 bg-gradient-to-tr from-slate-900 to-cyan-900 opacity-50 blur-2xl"
        ></div> -->
        <div class="relative w-full p-4 text-cyan-50">
          <img
            class="w-full overflow-hidden rounded-xl object-cover"
            :src="result.value.course.image?.url"
            alt=""
          />
          <div class="mt-4">
            <h1 class="w-full text-3xl">
              {{ result.value.course.name }}
            </h1>
            <div>
              <StarsViewer :rate="result.value.course.rate || 0" />
            </div>
          </div>

          <div class="mt-6 mb-5 flex gap-2">
            <div
              class="relative aspect-square h-12 w-12 overflow-hidden rounded-md"
            >
              <img
                :src="result.value.course.teacher?.image?.url"
                class="h-full w-full object-cover"
                alt=""
              />
            </div>
            <div>
              <h3 class="text-xl">
                {{ result.value.course.teacher?.name }}
              </h3>
              <div class="text-sm text-gray-300">
                {{ result.value.course.teacher?.description }}
              </div>
            </div>
          </div>

          <hr class="mx-4 opacity-40" />

          <div class="mt-6 flex items-center justify-center gap-6">
            <div class="text flex items-center gap-1 text-white">
              <div>
                <svg class="h-7 w-7 text-white" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="m22 22l-4-4H4q-.825 0-1.413-.588T2 16V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v18ZM4 4v12h14.825L20 17.175V4H4Zm0 0v13.175V4Z"
                  />
                </svg>
              </div>
              <div class="flex flex-col leading-3">
                <span class="-mb-3 text-3xl font-bold"> 4 </span>

                <span class="text-sm text-gray-300">دیدگاه</span>
              </div>
            </div>

            <div class="text flex items-center gap-1 text-white">
              <div>
                <svg class="h-8 w-8 text-white" viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path
                      d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"
                    />
                    <path d="M12 7v5l3 3M4 12h1m14 0h1m-8 7v1" />
                  </g>
                </svg>
              </div>
              <div class="flex flex-col leading-3">
                <span class="-mb-3 text-3xl font-bold"> 6 </span>

                <span class="text-sm text-gray-300">ساعت</span>
              </div>
            </div>

            <div class="text flex items-center gap-2 text-white">
              <div>
                <svg class="h-7 w-7 text-white" viewBox="0 0 1024 1024">
                  <path
                    fill="currentColor"
                    d="M800 272.288h64c17.664 0 32-14.336 32-32v-32c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v32c0 17.664 14.336 32 32 32zm0 192h64c17.664 0 32-14.336 32-32v-32c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v32c0 17.664 14.336 32 32 32zm0 192h64c17.664 0 32-14.336 32-32v-32c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v32c0 17.664 14.336 32 32 32zm0 192h64c17.664 0 32-14.336 32-32v-32c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v32c0 17.664 14.336 32 32 32zm-640-576h64c17.664 0 32-14.336 32-32v-32c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v32c0 17.664 14.336 32 32 32zm0 192h64c17.664 0 32-14.336 32-32v-32c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v32c0 17.664 14.336 32 32 32zm0 192h64c17.664 0 32-14.336 32-32v-32c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v32c0 17.664 14.336 32 32 32zm0 192h64c17.664 0 32-14.336 32-32v-32c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v32c0 17.664 14.336 32 32 32zM960 15.904H64c-35.184 0-64 28.816-64 64v864.192c0 35.184 28.816 64 64 64h896c35.184 0 64-28.816 64-64V79.904c0-35.184-28.816-64-64-64zm0 928.193H64V79.905h896v864.192z"
                  />
                </svg>
              </div>
              <div class="flex flex-col leading-3">
                <span class="-mb-3 text-3xl font-bold"> 12 </span>

                <span class="text-sm text-gray-300">ساعت</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative w-full rounded-xl bg-slate-100 py-2">
        <div
          aria-hidden="true"
          class="absolute inset-0 flex h-full w-full items-end justify-end overflow-auto"
        >
          <svg
            class="w-1/3 text-slate-200"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 70 70"
            fill="currentColor"
            enable-background="new 0 0 70 70"
            xml:space="preserve"
          >
            <g>
              <path
                d="M61.917,3.583h-53c-1.104,0-2.334,1.289-2.334,2.394v26c0,1.104,0.896,2,2,2s2-0.896,2-2V7.583h49v49H34.917
		c-1.104,0-2,0.896-2,2s0.896,2,2,2h27c1.104,0,1.666-0.502,1.666-1.606v-53C63.583,4.872,63.021,3.583,61.917,3.583z"
              />
              <path
                d="M29.917,17.583h22c0.553,0,1-0.447,1-1s-0.447-1-1-1h-22c-0.553,0-1,0.447-1,1S29.364,17.583,29.917,17.583z"
              />
              <path
                d="M17.917,17.583h4c0.553,0,1-0.447,1-1s-0.447-1-1-1h-4c-0.553,0-1,0.447-1,1S17.364,17.583,17.917,17.583z"
              />
              <path
                d="M29.917,27.583h22c0.553,0,1-0.447,1-1s-0.447-1-1-1h-22c-0.553,0-1,0.447-1,1S29.364,27.583,29.917,27.583z"
              />
              <path
                d="M17.917,27.583h4c0.553,0,1-0.447,1-1s-0.447-1-1-1h-4c-0.553,0-1,0.447-1,1S17.364,27.583,17.917,27.583z"
              />
              <path
                d="M29.917,37.583h22c0.553,0,1-0.447,1-1s-0.447-1-1-1h-22c-0.553,0-1,0.447-1,1S29.364,37.583,29.917,37.583z"
              />
              <path
                d="M17.917,37.583h4c0.553,0,1-0.447,1-1s-0.447-1-1-1h-4c-0.553,0-1,0.447-1,1S17.364,37.583,17.917,37.583z"
              />
              <path
                d="M51.917,45.583h-17c-0.553,0-1,0.447-1,1s0.447,1,1,1h17c0.553,0,1-0.447,1-1S52.47,45.583,51.917,45.583z"
              />
              <path
                d="M30.865,50.583L9.813,38.458c-0.619-0.357-1.443-0.357-2.063,0s-1.167,1.018-1.167,1.732v24.25
		c0,0.715,0.548,1.375,1.167,1.732c0.31,0.179,0.842,0.268,1.188,0.268s0.674-0.089,0.983-0.268l20.988-12.125
		c0.619-0.357,0.984-1.018,0.984-1.732S31.484,50.94,30.865,50.583z M10.583,60.977V43.654l15,8.661L10.583,60.977z"
              />
            </g>
          </svg>
        </div>
        <div
          class="relative flex cursor-pointer items-center gap-4 border-b border-slate-200 px-4 odd:bg-slate-50"
          v-for="ci in result.value.course.courseItem"
          :key="ci.id"
        >
          <div class="w-40 flex-shrink-0 overflow-hidden p-2">
            <img
              class="h-full w-full rounded object-contain"
              :src="result.value?.course.image?.url"
              alt=""
            />
          </div>
          <div>
            <h3 class="flex items-center gap-1">
              <span class="text-2xl font-bold text-slate-400"
                >{{ ci.no }} .</span
              >
              <div class="text-2xl">
                {{ ci.name }}
              </div>
            </h3>
            <span class="text-lg">
              {{ ci.description }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="pt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laborum
        exercitationem eos sed, culpa nam eaque excepturi consequuntur repellat
        quaerat ex corrupti inventore itaque neque repudiandae soluta commodi
        accusamus. Rem.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MYCOURSE from '@/apollo/q/course.gql'
import { CourseQuery, CourseQueryVariables } from '@/types/types'
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import StarsViewer from '~/components/misc/StarsViewer.vue'

export default defineComponent({
  middleware: ['auth'],
  layout: 'dashboard',
  components: { StarsViewer },
  setup() {
    console.log('get my cours')
    const ctx = useContext()

    const { result, loading } = useQuery<CourseQuery, CourseQueryVariables>(
      MYCOURSE,
      {
        id: ctx.route.value.params.courseid,
      }
    )

    return { result, loading }
  },
})
</script>
