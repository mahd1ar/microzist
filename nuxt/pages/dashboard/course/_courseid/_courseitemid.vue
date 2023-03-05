<template>
  <div class="h-full bg-slate-50">
    <loading-indicator kind="spinner" :loading="loading">
      <div class="">
        <div v-show="tabIndex === 0">
          <div
            class="flex w-full items-stretch justify-center overflow-hidden bg-black"
          >
            <div class="w-full overflow-hidden">
              <!-- <client-only> -->
              <div
                v-if="courseItemResult?.courseItem"
                class="aspect-video"
                ref="videoContainer"
              >
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
              <!-- </client-only> -->
            </div>

            <div class="text-whit w-72 shrink-0 overflow-hidden p-2 text-white">
              <div
                id="playlist"
                class="flex h-full flex-col gap-1 overflow-auto mz-scrollbar-dark"
              >
                <div
                  class="relative flex items-center justify-between rounded border border-white/20 p-2 py-4 hover:bg-white/20"
                  v-for="i in 15"
                  :key="i"
                >
                  <div
                    class="absolute inset-0 h-full w-full bg-gradient-to-tr from-gray-400/20 to-transparent"
                    aria-hidden="true"
                  ></div>
                  <div>
                    <span class="ml-1 text-gray-400">1.</span>
                    introduction
                  </div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <div>5:04</div>
                    <div>
                      <svg class="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M9.525 18.025q-.5.325-1.012.038T8 17.175V6.825q0-.6.513-.888t1.012.038l8.15 5.175q.45.3.45.85t-.45.85l-8.15 5.175Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container mx-auto flex gap-4 py-4">
            <div class="w-full">
              <h1 class="flex items-center gap-1 text-3xl">
                <span class="font-bold text-slate-500">
                  {{ courseItemResult?.courseItem?.no }}.
                </span>
                <div>
                  {{ courseItemResult?.courseItem?.name }}
                </div>
              </h1>
            </div>
            <div class="w-5/12">
              <div
                class="flex flex-col"
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
            class="mt-8 flex items-center justify-between rounded-xl border bg-green-100 p-6"
          >
            <div class="flex items-center justify-center gap-4">
              <img
                class="w-20"
                src="/svg/comment-balloon-part-3-svgrepo-com.svg"
                alt=""
              />
              <div class="flex flex-col">
                <h2 class="text-3xl">دیدگاه ها</h2>
                <a href="#comment-section" class="flex gap-2 text-gray-600">
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
              <span class="text-xl text-gray-700">
                <strong> 12 </strong>
                دیدگاه
              </span>
            </div>
          </div>

          <comments-viewer :items="comments" />

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
  onMounted,
  computed
} from '@nuxtjs/composition-api'
import {
  useQuery,
  useMutation,
  useLazyQuery
} from '@vue/apollo-composable/dist'
import useTabIndex from '~/components/useTabIndex'
import CommentSection from '~/components/CommentSection.vue'
import { logicAnd } from '@vueuse/shared'
import { whenever } from '@vueuse/core'

export default defineComponent({
  middleware: ['auth'],
  layout: 'dashboard',
  transition: 'dashboard',
  components: { CommentSection },
  setup () {
    const ctx = useContext()
    const videoContainer = ref<HTMLDivElement>()
    const plyr = ref<HTMLDivElement>()
    const componentIsMounted = ref(false)
    const contentIsFatched = ref(false)

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
    >(COU_ITEMS, {
      id: ctx.route.value.params.courseid
    })

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

    onMounted(() => {
      courseItemsLoad()
      componentIsMounted.value = true
    })

    whenever(logicAnd(contentIsFatched, componentIsMounted), () => {
      setTimeout(() => {
        // @ts-ignore
        plyr.value.player.on('loadeddata', () => {
          if (ctx.$device.isDesktop === true) {
            const h = videoContainer.value?.clientHeight || 0
            ;(document.querySelector(
              '#playlist'
            ) as HTMLDivElement).style.height = h + 'px'
          }
        })
      }, 0)
    })

    const comments = computed(() => {
      return courseItemResult.value?.courseItem?.comments
        ? courseItemResult.value?.courseItem?.comments.map(comment => {
            return {
              id: comment.id,
              username: comment.user?.name,
              comment: comment.comment
            }
          })
        : []
    })

    courseItemOnResult(res => {
      const booksIcon = `<svg viewBox="0 0 48 48"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 6h34s4 2 4 7s-4 7-4 7H5s4-2 4-7s-4-7-4-7Zm38 22H9s-4 2-4 7s4 7 4 7h34s-4-2-4-7s4-7 4-7Z"/></svg>`

      const commentIcon = `<svg viewBox="0 0 24 24" ><path data-v-4dd8a7f0="" fill="currentColor" d="M20.3 20.3L18 18H4q-.825 0-1.413-.588T2 16V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v15.575q0 .675-.613.938T20.3 20.3ZM4 4v12h14.825L20 17.175V4H4Zm0 0v13.175V4Z"></path></svg>`

      contentIsFatched.value = true
      ctx.$mitt.emit('tabItems', [
        { name: res.data.courseItem?.name || '', icon: booksIcon },
        { name: 'نظرات' || '', icon: commentIcon }
      ])
    })

    const { tabIndex } = useTabIndex()

    // onMounted(() => {
    // console.log(plyr.value)
    // setTimeout(() => {
    // console.log(videoContainer.value?.clientHeight)
    // }, 2000)
    // plyr.value.player.on('event', () => console.log('event fired'))
    // })

    return {
      tabIndex,
      courseItemsResult,
      courseItemResult,
      loading,
      playerOptions,
      videoContainer,
      plyr,
      comments
    }
  }
})
</script>
