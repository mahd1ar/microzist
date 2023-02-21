<template>
  <div class="flex min-h-screen">
    <div class="flex w-full flex-col items-stretch">
      <div class="relative flex-shrink-0 border-b-2 bg-slate-200">
        <div
          aria-hidden="true"
          class="svg-hero-bg absolute inset-0 h-full w-full"
        >
          <div
            class="absolute inset-0 h-full w-full bg-gradient-to-l from-transparent to-slate-100"
          ></div>
        </div>

        <nav
          class="md:mx-w-6xl relative p-4 md:container md:mx-auto md:py-4 xl:px-0"
        >
          <div class="hidden lg:flex lg:items-center lg:justify-between">
            <div class="group flex items-center gap-2">
              <div
                class="rounded-full bg-sky-50 p-1 text-sky-400 group-hover:bg-sky-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 48 48"
                  class="h-10 w-10 p-2"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                  >
                    <path
                      d="M6.572 37.428A21.904 21.904 0 0 1 2 24C2 11.85 11.85 2 24 2s22 9.85 22 22c0 5.056-1.705 9.713-4.572 13.428"
                    ></path>
                    <path
                      d="M12.303 31.697A13.935 13.935 0 0 1 10 24c0-7.732 6.268-14 14-14s14 6.268 14 14c0 2.843-.847 5.488-2.303 7.697"
                    ></path>
                    <path d="m24 30l16 16H8l16-16Z" clip-rule="evenodd"></path>
                  </g>
                </svg>
              </div>
              <div class="flex translate-y-1 transform flex-col">
                <div class="text-base font-bold tracking-widest">پیشخوان</div>
                <div class="text-xs">
                  {{
                    $store.getters.user.name +
                    ' ' +
                    $store.getters.user.lastName
                  }}
                </div>
              </div>
            </div>
            <ul class="flex items-center gap-2 text-sm">
              <li>
                <a
                  href="/user/userprofile"
                  aria-current="page"
                  class="flex rounded-md px-2 py-2 text-gray-800 hover:bg-gray-200 xl:px-4"
                >
                  اطلاعات کاربر
                </a>
              </li>
              <li>
                <a
                  href="/user/events"
                  class="rounded-md px-2 py-2 text-gray-800 hover:bg-gray-200 xl:px-4"
                >
                  رویداد ها
                </a>
              </li>
              <li>
                <nuxt-link
                  to="/dashboard/course/list"
                  class="rounded-md px-2 py-2 text-gray-800 hover:bg-gray-200 xl:px-4"
                >
                  courses
                </nuxt-link>
              </li>
            </ul>
            <nuxt-link
              to="/"
              href="/"
              class="nuxt-link-active mr-10 flex flex-row-reverse items-center justify-center gap-4 px-2 py-2 text-sm text-gray-500 hover:bg-gray-100 xl:px-4"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                class="h-4 w-4 text-sky-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              بازگشت به خانه
            </nuxt-link>
            <ul class="flex items-center gap-6">
              <li>
                <div title="exit">
                  <div
                    class="flex cursor-pointer gap-2 overflow-hidden rounded-md bg-sky-50 p-1 px-3 text-sky-400 hover:bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                      class="h-6 w-6"
                    >
                      <path
                        fill="currentColor"
                        d="M10.09 15.59L11.5 17l5-5l-5-5l-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                      ></path>
                    </svg>

                    خروج
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="relative flex w-full justify-between lg:hidden">
            <div class="group flex items-start gap-2">
              <div class="group flex items-center gap-2">
                <div
                  class="rounded-full bg-sky-50 p-1 text-sky-400 group-hover:bg-sky-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 48 48"
                    class="h-10 w-10 p-2"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                    >
                      <path
                        d="M6.572 37.428A21.904 21.904 0 0 1 2 24C2 11.85 11.85 2 24 2s22 9.85 22 22c0 5.056-1.705 9.713-4.572 13.428"
                      ></path>
                      <path
                        d="M12.303 31.697A13.935 13.935 0 0 1 10 24c0-7.732 6.268-14 14-14s14 6.268 14 14c0 2.843-.847 5.488-2.303 7.697"
                      ></path>
                      <path
                        d="m24 30l16 16H8l16-16Z"
                        clip-rule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div class="flex translate-y-1 transform flex-col">
                  <div class="text-base font-bold tracking-widest">پیشخوان</div>
                  <div class="text-xs">
                    {{
                      $store.getters.user.name +
                      ' ' +
                      $store.getters.user.lastName
                    }}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="rounded-full bg-white p-3 text-sky-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
                style="display: none"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <!---->
          </div>
        </nav>

        <div class="container relative mx-auto pt-5">
          <!-- courses -->

          <template v-if="page === 'course'">
            <div class="relative flex flex-wrap">
              <div
                class="title-font inline-flex w-1/2 cursor-pointer items-center justify-center rounded-t border-b-2 border-sky-500 bg-gray-100 bg-opacity-30 py-3 font-medium leading-none tracking-wider text-sky-500 backdrop-blur sm:w-auto sm:justify-start sm:px-6"
              >
                <svg class="ml-3 h-5 w-5" viewBox="0 0 48 48">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M5 6h34s4 2 4 7s-4 7-4 7H5s4-2 4-7s-4-7-4-7Zm38 22H9s-4 2-4 7s4 7 4 7h34s-4-2-4-7s4-7 4-7Z"
                  />
                </svg>
                دوره های آموزشی من
              </div>
              <div
                class="title-font inline-flex w-1/2 cursor-pointer items-center justify-center border-b-2 border-gray-200 py-3 font-medium leading-none tracking-wider hover:text-gray-900 sm:w-auto sm:justify-start sm:px-6"
              >
                <svg class="ml-3 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20.3 20.3L18 18H4q-.825 0-1.413-.588T2 16V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v15.575q0 .675-.613.938T20.3 20.3ZM4 4v12h14.825L20 17.175V4H4Zm0 0v13.175V4Z"
                  />
                </svg>
                نظرات من
              </div>
            </div>
          </template>
          <div class="relative flex flex-wrap" v-else-if="!page">
            <div
              class="title-font inline-flex w-1/2 cursor-pointer items-center justify-center rounded-t border-b-2 border-sky-500 bg-gray-100 bg-opacity-30 py-3 font-medium leading-none tracking-wider text-sky-500 backdrop-blur sm:w-auto sm:justify-start sm:px-6"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="ml-3 h-5 w-5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              پروفایل کاربر
            </div>
            <div
              class="title-font inline-flex w-1/2 cursor-pointer items-center justify-center border-b-2 border-gray-200 py-3 font-medium leading-none tracking-wider hover:text-gray-900 sm:w-auto sm:justify-start sm:px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                class="ml-3 h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              ویرایش اطلاعات
            </div>
            <div
              class="title-font inline-flex w-1/2 cursor-pointer items-center justify-center border-b-2 border-gray-200 py-3 font-medium leading-none tracking-wider hover:text-gray-900 sm:w-auto sm:justify-start sm:px-6"
            >
              <svg class="ml-3 h-5 w-5" viewBox="0 2.4 24 24">
                <path
                  fill="currentColor"
                  d="M2 21.4v-2h20v2H2Zm1.15-6.05l-1.3-.75l.85-1.5H1v-1.5h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H7v1.5H5.3l.85 1.5l-1.3.75l-.85-1.5l-.85 1.5Zm8 0l-1.3-.75l.85-1.5H9v-1.5h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H15v1.5h-1.7l.85 1.5l-1.3.75l-.85-1.5l-.85 1.5Zm8 0l-1.3-.75l.85-1.5H17v-1.5h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H23v1.5h-1.7l.85 1.5l-1.3.75l-.85-1.5l-.85 1.5Z"
                />
              </svg>
              تعویض پسورد
            </div>
            <div
              class="title-font inline-flex w-1/2 cursor-pointer items-center justify-center border-b-2 border-gray-200 py-3 font-medium leading-none tracking-wider hover:text-gray-900 sm:w-auto sm:justify-start sm:px-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 1024 1024"
                class="ml-3 h-5 w-5"
              >
                <path
                  fill="currentColor"
                  d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088l-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36l-116.224-25.088l-65.28 113.152l79.68 88.192l-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136l-79.808 88.192l65.344 113.152l116.224-25.024l22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152l24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296l116.288 25.024l65.28-113.152l-79.744-88.192l1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136l79.808-88.128l-65.344-113.152l-116.288 24.96l-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384a192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256a128 128 0 0 0 0-256z"
                ></path>
              </svg>
              تنظیمات
            </div>
          </div>
        </div>
      </div>
      <nuxt class="h-full bg-white" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useContext, useRouter, computed } from '@nuxtjs/composition-api'

const ctx = useContext()
const router = useRouter()

if (!ctx.store.getters.isLoggedIn) router.push('/login')

const page = computed(() => ctx.route.value.path.split('/')[2])
const fullpath = computed(() => ctx.route.value.path)
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
  @apply relative flex flex-row-reverse items-center gap-1 font-bold;

  &::after {
    content: '';
    width: 20px;
    height: 20px;
    color: #38bdf8;
    transform: scale(1.5);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 24 24'%3E%3Cpath fill='%2338bdf8' d='M12 14a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z'/%3E%3C/svg%3E");
  }
}

.svg-hero-bg {
  background-size: 110px;
  /* background-color: #e2e8f0; */
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.415 1.415 9.9-9.9v-2.828zm0 5.657L51.515 47.8l1.414 1.413 7.07-7.07v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413 7.07-7.07 7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23aec8ec' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
