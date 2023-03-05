<template>
  <div class="bg-slate">
    <loading-indicator kind="spinner" color="#64b6db" :loading="loading">
      <div v-if="tabIndex === 0">
        <div v-if="result?.course" class="container mx-auto my-6 flex gap-6">
          <div class="flex flex-col gap-2">
            <div
              class="relative w-80 shrink-0 rounded-xl bg-gradient-to-tr from-slate-900 to-cyan-900"
            >
              <!-- <div
                class="absolute inset-0 h-full w-full scale-105 bg-gradient-to-tr from-slate-900 to-cyan-900 opacity-50 blur-2xl"
              ></div> -->
              <div class="relative w-full p-4 text-cyan-50">
                <img
                  class="aspect-video w-full overflow-hidden rounded-xl object-cover"
                  :src="result.course.image?.url"
                  alt=""
                />
                <div class="mt-4">
                  <h1 class="w-full text-3xl">
                    {{ result.course.name }}
                  </h1>
                  <div>
                    <StarsViewer :rate="result.course.rate || 0" />
                  </div>
                </div>

                <div class="mt-6 mb-5 flex gap-2">
                  <div
                    class="relative aspect-square h-12 w-12 overflow-hidden rounded-md"
                  >
                    <img
                      :src="result.course.teacher?.image?.url"
                      class="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 class="text-xl">
                      {{ result.course.teacher?.name }}
                    </h3>
                    <div class="text-sm text-gray-300">
                      {{ result.course.teacher?.description }}
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
            <div
              v-if="userRateThisCourse === false"
              class="relative h-12 overflow-hidden rounded border
              border-yellow-500 bg-yellow-400 p-2 text-xl text-yellow-50
              cursor-pointer shadow-lg shadow-yellow-500/50"
              @click="goToTabIndex(1)"
            >
              <div
                class="absolute left-0 top-0 flex h-full w-full justify-end px-2"
              >
                <div class="flex gap-1">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="h-10 w-10"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                    />
                  </svg>
                </div>
                <div
                  class="absolute top-0 h-full w-full bg-gradient-to-l from-yellow-400 to-transparent"
                ></div>
              </div>

              <div
                class="relative flex items-center gap-2 text-xl font-semibold text-[#664800]"
              >
                به این آموزش امتیاز دهید

                <svg class="h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12l4.58-4.59z"
                  />
                </svg>
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
            <nuxt-link
              class="relative flex cursor-pointer items-center gap-4 border-b border-slate-200 px-4 odd:bg-slate-50/50"
              v-for="ci in result.course.courseItem"
              :key="ci.id"
              :to="`/dashboard/course/${result.course.id}/${ci.id}`"
            >
              <div class="w-40 flex-shrink-0 overflow-hidden p-2">
                <img
                  class="h-full w-full rounded object-contain"
                  :src="result.course.image?.url"
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
            </nuxt-link>
          </div>
        </div>

        <div class="container mx-auto">
          <div class="pt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            laborum exercitationem eos sed, culpa nam eaque excepturi
            consequuntur repellat quaerat ex corrupti inventore itaque neque
            repudiandae soluta commodi accusamus. Rem.
          </div>
        </div>
      </div>
      <div v-else-if="tabIndex === 1">
        <div id="tab2" class="container mx-auto transition-opacity">
          <div class="text-center mt-8">
            <div
              v-if="!userRateThisCourse"
              class="inline-flex mx-auto rounded bg-gradient-to-tr from-yellow-200 to-yellow-100 border border-yellow-300  px-6 py-4 flex-col"
            >
              <h2 class="text-2xl mb-4 px-6 text-[#986429]">
                به این آموزش امتیاز دهید
              </h2>
              <StarsGiver
                class="flex flex-col items-center gap-2"
                :rate.sync="rate"
                v-slot="{ hasChanged }"
              >
                <button
                  class="text-center w-full disabled:opacity-60 text-yellow-500 py-2 mt-2 bg-white rounded bg-opacity-60 hover:bg-opacity-70"
                  @click="setRate"
                  :disabled="!hasChanged"
                >
                  ثبت نظر
                </button>
              </StarsGiver>
            </div>
          </div>
          <CommentsViewer :items="comments" />
          <CommentSection
            :widthStars="false"
            @onDone="refetch"
            target="course"
            :targetId="$route.params.courseid"
          />
        </div>
      </div>
      <div v-else-if="tabIndex === 2">
        <InstructorProfile class="container mx-auto my-10" />
      </div>
    </loading-indicator>
  </div>
</template>

<script lang="ts">
import MYCOURSE from '@/apollo/q/course.gql'
import {
  CourseQuery,
  CourseQueryVariables,
  UserCommentAndRateQuery,
  UserCommentAndRateQueryVariables,
  SetRateMutationVariables,
  SetRateMutation
} from '@/types/types'
import {
  defineComponent,
  useContext,
  ref,
  onMounted,
  computed,
  useRouter
} from '@nuxtjs/composition-api'
import {
  useLazyQuery,
  useQuery,
  useMutation
} from '@vue/apollo-composable/dist'
import StarsViewer from '~/components/misc/StarsViewer.vue'
import useTabIndex from '~/components/useTabIndex'
import USERHASRATED from '@/apollo/q/user-comment-and-rate.gql'
import SETRATE from '@/apollo/m/set-rate.gql'
import StarsGiver from '~/components/misc/StarsGiver.vue'
import InstructorProfile from '~/components/InstructorProfile.vue'

export default defineComponent({
  middleware: ['auth'],
  layout: 'dashboard',
  transition: 'dashboard',
  components: { StarsViewer, StarsGiver, InstructorProfile },
  setup () {
    const rate = ref(0)
    const comment = ref('')

    const ctx = useContext()
    const router = useRouter()

    // Graphql

    const { result, loading, onResult, refetch } = useQuery<
      CourseQuery,
      CourseQueryVariables
    >(
      MYCOURSE,
      {
        id: ctx.route.value.params.courseid
      },
      {
        fetchPolicy: 'no-cache'
      }
    )

    const comments = computed(() =>
      result.value?.course?.comments
        ?.map(i => {
          return i.rate === -1
            ? {
                comment: i.comment,
                id: i.id,
                username: i.user?.name + ' ' + i.user?.lastName,
                date: i.createdAt
              }
            : undefined
        })
        .filter(Boolean)
    )

    const {
      load: loadUserComments,
      result: userCommentAndRate,
      refetch: userCommentAndRateRefresh
    } = useLazyQuery<UserCommentAndRateQuery, UserCommentAndRateQueryVariables>(
      USERHASRATED,
      {
        courseId: ctx.route.value.params.courseid,
        userId: ctx.store.getters.user.id
      }
    )

    const { mutate: runSetRate, onDone: setRateDone } = useMutation<
      SetRateMutation,
      SetRateMutationVariables
    >(SETRATE)

    const { tabIndex } = useTabIndex()
    const userRateThisCourse = computed(() => {
      return userCommentAndRate.value?.comments
        ? userCommentAndRate.value.comments.find(i =>
            i.rate ? i.rate > -1 : false
          )?.rate || false
        : false
    })

    onMounted(() => {
      loadUserComments()
    })

    onResult(res => {
      const booksIcon = `<svg viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 6h34s4 2 4 7s-4 7-4 7H5s4-2 4-7s-4-7-4-7Zm38 22H9s-4 2-4 7s4 7 4 7h34s-4-2-4-7s4-7 4-7Z"/></svg>`
      const commentIcon = `<svg viewBox="0 0 24 24" ><path data-v-4dd8a7f0="" fill="currentColor" d="M20.3 20.3L18 18H4q-.825 0-1.413-.588T2 16V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v15.575q0 .675-.613.938T20.3 20.3ZM4 4v12h14.825L20 17.175V4H4Zm0 0v13.175V4Z"></path></svg>`
      const studentIcon = `<svg  viewBox="0 0 32 32"><path fill="currentColor" d="m16 7.78l-.313.095l-12.5 4.188L.345 13L2 13.53v8.75c-.597.347-1 .98-1 1.72a2 2 0 1 0 4 0c0-.74-.403-1.373-1-1.72v-8.06l2 .655V20c0 .82.5 1.5 1.094 1.97c.594.467 1.332.797 2.218 1.093c1.774.59 4.112.937 6.688.937c2.576 0 4.914-.346 6.688-.938c.886-.295 1.624-.625 2.218-1.093C25.5 21.5 26 20.82 26 20v-5.125l2.813-.938L31.655 13l-2.843-.938l-12.5-4.187L16 7.78zm0 2.095L25.375 13L16 16.125L6.625 13L16 9.875zm-8 5.688l7.688 2.562l.312.094l.313-.095L24 15.562V20c0 .01.004.126-.313.375c-.316.25-.883.565-1.625.813C20.58 21.681 18.395 22 16 22c-2.395 0-4.58-.318-6.063-.813c-.74-.247-1.308-.563-1.624-.812C7.995 20.125 8 20.01 8 20v-4.438z"/></svg>`

      ctx.$mitt.emit('tabItems', [
        { name: res.data.course?.name || '', icon: booksIcon },
        { name: 'نظرات' || '', icon: commentIcon },
        { name: '  درباره مدرس  ' || '', icon: studentIcon }
      ])
    })

    function goToTabIndex (inx: number) {
      router.push({
        path: ctx.route.value.path,
        query: {
          tabIndex: String(inx)
        }
      })
    }

    function setRate () {
      runSetRate({
        comment: 'my rating is ' + rate.value,
        rate: rate.value,
        courseId: ctx.route.value.params.courseid
      })
    }

    function yourRateIsSuccessfullySaved () {
      // @ts-ignore
      ctx.$izitoast.success({
        icon: 'icon-person',
        title: 'ممنون از شرکت در شما در این نظر سنجی',
        message: 'امتیاز شما با موفقیت ثبت شد',
        position: 'center',
        onOpening: function () {
          try {
            ;(document.querySelector('#tab2') as HTMLDivElement).style.opacity =
              '0.5'
          } catch (error) {
            console.info(error)
          }
        },
        onClosing: function () {
          try {
            ;(document.querySelector('#tab2') as HTMLDivElement).style.opacity =
              '1'
          } catch (error) {
            console.info(error)
          }
        }
      })
    }

    setRateDone(async () => {
      yourRateIsSuccessfullySaved()
      await refetch()
      userCommentAndRateRefresh()
    })

    return {
      result,
      refetch,
      comments,
      tabIndex,
      loading,
      userRateThisCourse,
      goToTabIndex,
      rate,
      userCommentAndRate,
      setRate
    }
  }
})
</script>
