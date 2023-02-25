<template>
  <div dir="rtl" class="flex min-h-screen">
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
                <nuxt-link
                  to="/dashboard"
                  class="flex rounded-md px-2 py-2 text-gray-800 xl:px-4"
                >
                  اطلاعات کاربر
                </nuxt-link>
              </li>
              <li>
                <a
                  href="/user/events"
                  class="rounded-md px-2 py-2 text-gray-800 xl:px-4"
                >
                  رویداد ها
                </a>
              </li>
              <li>
                <nuxt-link
                  to="/dashboard/course/list"
                  class="rounded-md px-2 py-2 text-gray-800 xl:px-4"
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

          <div class=" relative flex flex-wrap">
            <button
              v-for="(i, idx) in tabItems"
              :key="idx"
              @click="switchTab(idx)"
              class="title-font inline-flex w-1/2  items-center transition-all duration-300 justify-center border-b-2 py-3 font-medium bg-opacity-30 leading-none tracking-wider sm:w-auto sm:justify-start sm:px-6"
              :class="{
                'text-sky-500 backdrop-blur border-sky-500  py-3 font-medium leading-none tracking-wider ':
                  +tabIndex === idx,
                'cursor-pointer rounded-t border-gray-200  hover:text-gray-900':
                  +tabIndex !== idx
              }"
            >
              <div
                class="icons flex justify-center items-center"
                v-html="i.icon"
              ></div>
              <div v-text="i.name"></div>
            </button>
          </div>
        </div>
      </div>

      <nuxt class="h-full bg-white" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  useContext,
  useRouter,
  computed,
  ref,
  reactive
} from '@nuxtjs/composition-api'

const ctx = useContext()
const router = useRouter()
const tabItems = ref<{ name: string; icon: string }[]>([])

if (!ctx.store.getters.isLoggedIn) router.push('/login')

const page = computed(() => ctx.route.value.path.split('/')[2])
const fullpath = computed(() => ctx.route.value.path)

const tabIndex = computed(() =>
  typeof ctx.route.value.query.tabIndex === 'string'
    ? ctx.route.value.query.tabIndex
    : '0'
)

function switchTab (index: number) {
  router.push({ path: fullpath.value, query: { tabIndex: String(index) } })
}

ctx.$mitt.on('tabItems', tb => {
  tabItems.value.splice(0, tabItems.value.length)
  tb.forEach(element => {
    tabItems.value.push(element)
  })
})
</script>

<style lang="scss" scoped>
.icons {
  @apply h-5 w-5 ml-3;
  svg {
    @apply h-5 w-5;
  }
}
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
