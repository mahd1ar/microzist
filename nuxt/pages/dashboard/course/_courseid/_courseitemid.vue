<template>
  <div class="bg-slate-50 h-full">
    <loading-indicator :loading="loading">
      <div class="">
        <div v-show="tabIndex === 0">
          <div class="bg-black">
            <div class="container mx-auto pt-4 bg-black">
              <client-only>
                <div v-if="courseItemResult?.courseItem" class="aspect-video">
                  <vue-plyr ref="plyr">
                    <video
                      controls
                      :options="playerOptions"
                      :crossorigin="'true'"
                      playsinline
                      :src="courseItemResult.courseItem.video?.video?.url"
                      size="720"
                      format="video/mp4"
                    ></video>
                    <!-- :data-poster="video.poster" -->
                  </vue-plyr>
                </div>
              </client-only>
            </div>
          </div>

          <div class="container mx-auto flex gap-4 py-4">
            <div class="w-full">
              <h1 class="flex text-3xl items-center gap-1 ">
                <span class="  text-slate-500 font-bold">
                  {{ courseItemResult?.courseItem?.no }}.
                </span>
                <div>
                  we're gay too
                  {{ courseItemResult?.courseItem?.name }}
                </div>
              </h1>
            </div>
            <div class="w-5/12">
              <div
                class="flex flex-col "
                v-for="cis in courseItemsResult?.courseItems"
                :key="cis.id"
              >
                <div class="w-24">
                  <img src="" alt="" />
                </div>
                <div>
                  {{ cis.no }}
                  {{ cis.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container" v-show="tabIndex === 1">
          <div
            class="bg-green-100 border mt-8 rounded-xl flex justify-between items-center p-6"
          >
            <div class="flex gap-4 justify-center items-center">
              <img
                class="w-20"
                src="/svg/comment-balloon-part-3-svgrepo-com.svg"
                alt=""
              />
              <div class="flex flex-col">
                <h2 class="text-3xl">
                  دیدگاه ها
                </h2>
                <a href="#comment-section" class="text-gray-600 gap-2 flex">
                  نظرات خود را درمیان بگذارید
                  <svg
                    class="opacity-60"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <span class="text-xl text-gray-700 ">
                <strong> 12 </strong>
                دیدگاه
              </span>
            </div>
          </div>
          <div class="mt-8 mb-8 rounded-lg border bg-white">
            <div class="flex items-center justify-between px-6 pt-6">
              <h2 class="text-lg font-bold text-sky-500 ">دیدگاه ها</h2>
              <div class="flex gap-2">
                <span class="text-sm text-gray-600">
                  <strong> 12 </strong>
                  دیدگاه
                </span>
              </div>
            </div>

            <div
              v-for="comment in courseItemResult?.courseItem?.comments || []"
              :key="comment.id"
              class="mt-4 flex flex-col gap-1 bg-opacity-75 px-6 py-4 odd:bg-gary-100"
            >
              <div>
                <div class="mb-1 flex items-center justify-between">
                  <div class="flex gap-1 justify-center items-center">
                    <div class="text-sm font-bold">
                      {{ comment.user?.name }}
                    </div>

                    <div class=" text-xs text-gray-500">1 هفته پیش</div>
                    .
                    <div class=" text-xs text-gray-500">3:15 بعد از ظهر</div>
                  </div>
                  <div class="flex">
                    <svg
                      class="aspect-square w-4 text-yellow-400"
                      viewBox="0 2.4 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m5.825 24.4l1.625-7.025L2 12.65l7.2-.625L12 5.4l2.8 6.625l7.2.625l-5.45 4.725l1.625 7.025L12 20.675L5.825 24.4Z"
                      />
                    </svg>
                    <svg
                      class="aspect-square w-4 text-yellow-400"
                      viewBox="0 2.4 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m5.825 24.4l1.625-7.025L2 12.65l7.2-.625L12 5.4l2.8 6.625l7.2.625l-5.45 4.725l1.625 7.025L12 20.675L5.825 24.4Z"
                      />
                    </svg>
                    <svg
                      class="aspect-square w-4 text-yellow-400"
                      viewBox="0 2.4 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m5.825 24.4l1.625-7.025L2 12.65l7.2-.625L12 5.4l2.8 6.625l7.2.625l-5.45 4.725l1.625 7.025L12 20.675L5.825 24.4Z"
                      />
                    </svg>
                    <svg
                      class="aspect-square w-4 text-yellow-400"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
                      />
                    </svg>
                    <svg
                      class="aspect-square w-4 text-yellow-400"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
                      />
                    </svg>
                  </div>
                </div>

                <hr class="mb-4 mt-2" />
                <div>
                  {{ comment.comment }}
                </div>
              </div>
            </div>
          </div>
          <comment-section
            theme="gray"
            target="courseItem"
            :widthStars="true"
            :targetId="$route.params.courseitemid"
          />
        </div>
      </div>
    </loading-indicator>
  </div>
</template>

<script lang="ts">
import COU_ITEM from '@/apollo/q/course-item.gql'
import COU_ITEMS from '@/apollo/q/course-items.gql'

import {
  CourseItemQuery,
  CourseItemQueryVariables,
  CourseItemsQuery,
  CourseItemsQueryVariables
} from '@/types/types'
import {
  defineComponent,
  useContext,
  ref,
  onMounted
} from '@nuxtjs/composition-api'
import {
  useQuery,
  useMutation,
  useLazyQuery
} from '@vue/apollo-composable/dist'
import useTabIndex from '~/components/useTabIndex'
import CommentSection from '~/components/misc/CommentSection.vue'

export default defineComponent({
  middleware: ['auth'],
  layout: 'dashboard',
  components: { CommentSection },
  setup () {
    const ctx = useContext()

    const {
      result: courseItemResult,
      onResult: courseItemOnResult,
      loading
    } = useQuery<CourseItemQuery, CourseItemQueryVariables>(COU_ITEM, {
      id: ctx.route.value.params.courseitemid
    })

    const { result: courseItemsResult, load: courseItemsLoad } = useLazyQuery<
      CourseItemsQuery,
      CourseItemsQueryVariables
    >(COU_ITEMS, { id: ctx.route.value.params.courseid })

    const playerOptions = {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'pip',
        'airplay',
        'fullscreen'
      ]
    }

    const booksIcon = `<svg viewBox="0 0 48 48">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M5 6h34s4 2 4 7s-4 7-4 7H5s4-2 4-7s-4-7-4-7Zm38 22H9s-4 2-4 7s4 7 4 7h34s-4-2-4-7s4-7 4-7Z"
                  />
                </svg>`

    const commentIcon = `<svg viewBox="0 0 24 24" ><path data-v-4dd8a7f0="" fill="currentColor" d="M20.3 20.3L18 18H4q-.825 0-1.413-.588T2 16V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v15.575q0 .675-.613.938T20.3 20.3ZM4 4v12h14.825L20 17.175V4H4Zm0 0v13.175V4Z"></path></svg>`

    onMounted(() => {
      courseItemsLoad()
    })

    courseItemOnResult(res => {
      ctx.$mitt.emit('tabItems', [
        { name: res.data.courseItem?.name || '', icon: booksIcon },
        { name: 'نظرات' || '', icon: commentIcon }
      ])
    })

    const { tabIndex } = useTabIndex()

    return {
      tabIndex,
      courseItemsResult,
      courseItemResult,
      loading,
      playerOptions
    }
  }
})
</script>
