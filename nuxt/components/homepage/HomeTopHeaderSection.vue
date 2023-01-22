<template>
  <header
    dir="ltr"
    class=" left-0 top-0 z-50 flex w-full flex-wrap  py-4  sm:flex-nowrap sm:justify-start bg-primary"
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
      class="mx-auto w-full max-w-[85rem] px-4 md:flex md:items-center md:justify-between"
      aria-label="Global"
    >
      <div class="flex items-center justify-between">
        <nuxt-link
          class="inline-flex items-end gap-x-2 text-xl font-semibold text-black"
          :to="localePath('/')"
        >
          <div class="flex-center aspect-square w-12 flex-shrink-0 rounded">
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
          </div>
        </nuxt-link>
        <div class="md:hidden">
          <button
            type="button"
            @click="showMobileMenu = true"
            class="inline-flex items-center justify-center gap-2  align-middle font-medium text-tm-black  transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="Toggle navigation"
          >
            <svg
              class="hs-collapse-open:hidden h-8 w-8"
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
        class="hs-collapse hidden h-full grow basis-full overflow-hidden transition-all duration-300 md:block"
      >
        <div
          class="desktop-nav mt-5 flex h-full flex-col  sm:mt-0 sm:flex-row-reverse sm:items-center sm:justify-start sm:pl-5 bg-primary"
        >
          <div class="mx-4 cursor-pointer text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
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

          <nuxt-link
            v-for="(i, index) in navItems"
            :key="i.id"
            :to="localePath(i.link)"
            v-if="i.link !== '/pich-gostar'"
            v-motion
            :initial="{
              opacity: 0,
              x: -35
            }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: {
                type: 'keyframes',
                duration: 800,
                delay: index * 75 + 1100,
                ease: 'easeOut'
              }
            }"
            class="flex-center h-full px-3 font-bold text-gray-900 hover:text-gray-500"
          >
            {{ i.label }}
          </nuxt-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import {
  useContext,
  useStore,
  computed,
  ref,
  watch
} from '@nuxtjs/composition-api'
import { RootState } from '@/store/index'
import MobileNav from '../topnav/MobileNav.vue'

const store = useStore<RootState>()
const { i18n } = useContext()

const showMobileMenu = ref(false)

const navItems = computed(() => {
  return (store.getters.navItems as RootState['navItem']).filter(
    i => i.lang === i18n.locale.toLowerCase()
  )
})
</script>

<style lang="scss" scoped>
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
