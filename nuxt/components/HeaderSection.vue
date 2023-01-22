<template>
  <transition name="slideup">
    <header
      v-show="store.getters.showNav"
      dir="ltr"
      :style="{
        'max-height': store.getters.showNav ? '80px' : '0px'
      }"
      class="sticky left-0 top-0 z-50 flex w-full flex-wrap bg-gray-100 ease-out transition-all duration-300 py-4 shadow-md sm:flex-nowrap sm:justify-start overflow-hidden"
    >
      <!-- mobile nav -->
      <transition name="fade">
        <MobileNav
          :nav-items="navItems"
          v-if="showMobileMenu"
          @close="showMobileMenu = false"
        ></MobileNav>
      </transition>

      <nav
        class="mx-auto w-full max-w-[85rem] px-4 lg:flex md:items-center md:justify-between"
        aria-label="Global"
      >
        <div class="flex items-center justify-between">
          <nuxt-link
            class="inline-flex items-end gap-x-2 text-xl font-semibold text-black"
            :to="localePath('/')"
          >
            <!-- <div class="flex-center aspect-square w-12 flex-shrink-0 rounded">    
              <svg
                class="w-10 object-contain text-black"
                viewBox="0 0 692.74 667.87"
              >
                <g>
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      class="fill-current"
                      d="M498.44,263.59A193.48,193.48,0,0,0,404.28,288l-.11-.22a109.88,109.88,0,1,1,44.48-133.64l78.56-31A193.25,193.25,0,0,0,346.38,0C239.24,0,152,87.18,152,194.36a193.15,193.15,0,0,0,13.58,71.13C72,279.4,0,360.24,0,457.65,0,562.52,83.43,648.13,187.41,651.81v-84.5A109.87,109.87,0,1,1,303.88,450.54V527.8h84.84V450.54h.15a109.85,109.85,0,1,1,116.48,117V652c103.94-3.66,187.39-89.31,187.39-194.15,0-107.1-87.14-194.28-194.3-194.28"
                    />
                    <path
                      class="fill-current"
                      d="M471.77,567.39a12.26,12.26,0,0,1-24.15-.07h-8.4a12.3,12.3,0,0,1-24.23,0l-8.4-.07a12.28,12.28,0,0,1-24.23,0H374a12.25,12.25,0,0,1-24.21-.13H341.4a12.26,12.26,0,0,1-24.24-.07h-8.35a12.27,12.27,0,0,1-24.28-.05l-30.86-.06V550.46h-42.2v46.41h0a12.31,12.31,0,0,1,0,24.61h-.05v46.39h42.2V651.44h30.9a12.3,12.3,0,0,1,24.23,0h8.36a12.29,12.29,0,0,1,24.21,0h8.42a12.29,12.29,0,0,1,24.21,0h8.38a12.3,12.3,0,0,1,24.23,0H415a12.3,12.3,0,0,1,24.23,0h8.35a12.38,12.38,0,0,1,12.17-10.16,12.23,12.23,0,0,1,12,10.16h10.46V567.39Z"
                    />
                  </g>
                </g>
              </svg>
            </div> -->
            <div
              v-if="$i18n.locale === 'fa'"
              class="flex-center  w-40 flex-shrink-0 rounded  object-cover"
            >
              <img src="/logo-fa.png" alt="" />
            </div>
            <div
              v-else
              class="flex-center  w-40 flex-shrink-0 rounded  object-cover"
            >
              <img src="/logo-en.png" alt="" />
            </div>
            <!-- <div class="leading-5 max-w-[100px]">Carizan Pich Gostar</div> -->
          </nuxt-link>
          <div class="lg:hidden">
            <button
              type="button"
              @click="showMobileMenu = true"
              class="inline-flex items-center justify-center gap-2 border border-tm-black p-2 align-middle font-medium text-tm-black shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label="Toggle navigation"
            >
              <svg
                class="hs-collapse-open:hidden h-4 w-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                class="hs-collapse-open:block hidden h-4 w-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          class="hs-collapse hidden h-full grow basis-full overflow-hidden transition-all duration-300 lg:block"
        >
          <div
            class="desktop-nav mt-5 flex h-full flex-col bg-gray-100 sm:mt-0 sm:flex-row-reverse sm:items-center sm:justify-start sm:pl-5"
          >
            <div class="mx-4  flex flex-row-reverse gap-4 text-gray-900">
              <!-- search -->
              <div @click="$store.dispatch('toggleSearch', true)">
                <svg
                  class="w-5 h-5 cursor-pointer "
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="m21 21l-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"
                  />
                </svg>
              </div>
              <!-- translate -->
              <div class="cursor-pointer" @click="switchLang">
                <svg
                  class="w-5 h-5"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 20 20"
                >
                  <g fill="currentColor">
                    <path
                      d="M7.75 2.75a.75.75 0 0 0-1.5 0v1.258a32.987 32.987 0 0 0-3.599.278a.75.75 0 1 0 .198 1.487A31.545 31.545 0 0 1 8.7 5.545A19.381 19.381 0 0 1 7 9.56a19.418 19.418 0 0 1-1.002-2.05a.75.75 0 0 0-1.384.577a20.935 20.935 0 0 0 1.492 2.91a19.613 19.613 0 0 1-3.828 4.154a.75.75 0 1 0 .945 1.164A21.116 21.116 0 0 0 7 12.331c.095.132.192.262.29.391a.75.75 0 0 0 1.194-.91a18.97 18.97 0 0 1-.59-.815a20.888 20.888 0 0 0 2.333-5.332c.31.031.618.068.924.108a.75.75 0 0 0 .198-1.487a32.832 32.832 0 0 0-3.599-.278V2.75Z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M13 8a.75.75 0 0 1 .671.415l4.25 8.5a.75.75 0 1 1-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 1 1-1.342-.67l4.25-8.5A.75.75 0 0 1 13 8Zm2.037 6.5L13 10.427L10.964 14.5h4.073Z"
                      clip-rule="evenodd"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <!-- shadow-lg shadow-primary -->
            <nuxt-link
              :to="localePath('/pich-gostar')"
              class="flex-center h-full rounded-sm  bg-primary px-3 font-bold text-primary-dark hover:text-gray-500"
            >
              {{ $t('home') }}
            </nuxt-link>

            <nuxt-link
              v-for="(i, index) in navItems"
              :key="i.id"
              :to="localePath(i.link)"
              v-if="i.link !== '/pich-gostar'"
              v-motion
              :initial="{
                opacity: 0,
                y: 100
              }"
              :enter="{
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 250,
                  damping: 25,
                  mass: 0.5,
                  delay: index * 100
                }
              }"
              :leave="{
                y: -30,
                opacity: 0,
                transition: {
                  type: 'keyframes',
                  duration: 900,
                  delay: index * 85 + 800,
                  ease: 'circOut'
                }
              }"
              class="flex-center h-full font-bold text-gray-900 hover:text-gray-500 px-1 lg:px-3 text-sm lg:text-base"
            >
              {{ i.label }}
            </nuxt-link>
          </div>
        </div>
      </nav>
    </header>
  </transition>
</template>

<script lang="ts" setup>
import {
  useContext,
  useStore,
  computed,
  ref,
  watch,
  useRoute,
  useRouter
} from '@nuxtjs/composition-api'
import { RootState } from '@/store/index'
import MobileNav from './topnav/MobileNav.vue'

const store = useStore<RootState>()
const router = useRouter()
const { i18n, switchLocalePath } = useContext()
const ctx = useContext()

const showMobileMenu = ref(false)

const navItems = computed(() => {
  return (store.getters.navItems as RootState['navItem']).filter(
    i => i.lang === i18n.locale.toLowerCase()
  )
})

const switchLang = () => {
  const otherLang = i18n.locale.toLowerCase() === 'fa' ? 'en' : 'fa'
  const message = {
    fa: 'خوش آمدید',
    en: 'welcome'
  }

  router.push(switchLocalePath(otherLang))
  // @ts-ignore
  ctx.$izitoast.success({
    title: message[otherLang],
    timeout: 5000,
    color: '#ffc800'
  })
}
</script>

<style lang="scss" scoped>
.slideup-enter-active,
.slideup-leave-active {
  transition: all 0.5s ease;
}

.slideup-enter,
.slideup-leave-to {
  transform: translateY(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  // transform: scale(0.95);
}

.desktop-nav .nuxt-link-exact-active {
  @apply relative;

  &::after {
    content: '';
    animation: example 250ms ease-out 0ms;
    animation-fill-mode: forwards;
    // animation-play-state: running;
    // w-9/12
    @apply absolute bottom-0 rounded border-b-4 border-primary transition-all ease-out;
  }
}

//
@keyframes example {
  from {
    width: 0%;
  }

  to {
    width: 75%;
  }
}
</style>
