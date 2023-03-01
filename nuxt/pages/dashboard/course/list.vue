<template>
  <div class="">
    <div class="container">
      <h1 class="mt-12 text-xl">دوره های آموزشی من</h1>

      <hr class="mx-28 mt-6 mb-6" />
      <loading-indicator kind="spinner" :loading="loading" color="#406b8f">
        <div class="">
          <section class="body-font overflow-hidden text-gray-600">
            <div
              v-for="course in myCourses?.user?.courses || []"
              :key="course.id"
              class="mx-auto py-10"
            >
              <div class="ml-auto flex flex-wrap">
                <img
                  class="h-64 w-full overflow-hidden rounded object-cover object-center lg:w-1/2"
                  :src="course.image?.url"
                />
                <div class="w-full lg:w-1/2 lg:pr-10">
                  <div class="flex h-full w-4/5 flex-col justify-evenly">
                    <div>
                      <h2
                        class="title-font text-sm tracking-widest text-emerald-600"
                      >
                        توسعه وب
                      </h2>
                      <h1
                        class="title-font mb-1 text-3xl font-medium text-gray-900"
                      >
                        {{ course.name }}
                      </h1>
                      <div class="mb-2 flex">
                        <span class="flex items-center">
                          <svg
                            v-for="i in 4"
                            :key="i"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="h-4 w-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            ></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="h-4 w-4 text-yellow-500"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            ></path>
                          </svg>
                          <span class="mr-3 text-gray-600">4 Reviews</span>
                        </span>
                        <span
                          class="mr-3 flex gap-2 border-r-2 border-gray-200 py-2 pr-3"
                        >
                          <a class="text-gray-500">
                            <svg
                              fill="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              class="h-5 w-5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                              ></path>
                            </svg>
                          </a>
                          <a class="text-gray-500">
                            <svg
                              fill="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              class="h-5 w-5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                              ></path>
                            </svg>
                          </a>
                          <a class="text-gray-500">
                            <svg
                              fill="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              class="h-5 w-5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                              ></path>
                            </svg>
                          </a>
                        </span>
                      </div>
                      <div class="mb-4 flex">
                        <span class="flex items-center">
                          <div
                            class="flex w-full items-center justify-between gap-4"
                          >
                            <img
                              src="https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg"
                              alt=""
                              class="h-12 w-12 rounded-md object-cover"
                            />
                            <div class="mt-1 flex flex-col">
                              <div class="text-gray-400">مدرس</div>
                              <div class="text-lg font-bold">Nicole Brown</div>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>

                    <div>
                      <nuxt-link
                        :to="'/dashboard/course/' + course.id"
                        class="flex items-center justify-between rounded bg-sky-50 px-4 py-2 text-sky-500"
                      >
                        <div>شروع یادگیری</div>
                        <div>
                          <svg class="h-5 w-5" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225L16 22Z"
                            />
                          </svg>
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="myCourses?.user?.courses?.length === 0"
              class="text-black"
            >
              fa:: you have none
            </div>
          </section>
        </div>
      </loading-indicator>
    </div>
  </div>
</template>

<script lang="ts">
import { useLazyQuery, useQuery } from '@vue/apollo-composable/dist'
import MYCOURSESQUery from '@/apollo/q/my-courses.gql'
import { MyCoursesQuery, MyCoursesQueryVariables } from '~/types/types'
import {
  useContext,
  defineComponent,
  computed,
  watch,
  onMounted,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'dashboard',
  setup() {
    const ctx = useContext()
    const userID = ctx.store.getters.user.id
    const { result: myCourses, loading } = useQuery<
      MyCoursesQuery,
      MyCoursesQueryVariables
    >(MYCOURSESQUery, { id: userID }, { fetchPolicy: 'no-cache' })

    return {
      myCourses,
      loading,
    }
  },
})
</script>
