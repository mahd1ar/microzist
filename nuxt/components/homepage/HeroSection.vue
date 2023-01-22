<template>
  <div
  dir="rtl"
    class="relative h-72 overflow-hidden bg-cover bg-center bg-no-repeat sm:h-80"
    style="background-color: #ededed"
  >
    <!-- from-black to-gray-700 -->
    <!-- <div
      class="w-full absolute bg-gray-900 h-full top-0 left-0"
      aria-hidden="true"
      style="clip-path: polygon(43% 0, 100% 0, 100% 100%, 34% 100%)"
    ></div>
    <div
      class="w-full absolute bg-gray-800 h-full top-0 left-0"
      aria-hidden="true"
      style="clip-path: polygon(53% 0, 100% 0, 100% 100%, 44% 100%)"
    ></div> -->

    <div
      class="container absolute z-20 mx-auto flex h-full items-center bg-gradient-to-l from-white/60 to-transparent"
    >
      <h1
        class="relative text-center text-6xl font-bold text-gray-500 sm:text-6xl md:text-7xl"
      >
      {{
        $i18n.locale.toLowerCase() === 'fa' ?
        'کاریزان پیچ گستر' :
        'Carizan pich gostar'.toUpperCase()
      }}
      </h1>
    </div>

    <div
      id="logo"
      class="container absolute bottom-0 left-0 z-10 w-9/12 translate-y-10 transform text-white md:w-6/12"
    >
      <svg
        style="color: #dbdbdb"
        class="mw-full object-contain"
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
    <!-- style="background-image: url(/sample/sample3.jpg)" -->
    <div class="flex-center w-full justify-start md:w-6/12">
      <div class="max-w-lg text-center sm:text-left">
        <img src="/hero/pich-s.svg" class="pattern pich-1" alt="" />
        <img src="/hero/pich-g.svg" class="pattern pich-2" alt="" />
        <div class="pattern line-1"></div>
        <div class="pattern line-2"></div>
        <div class="pattern line-3"></div>
        <!-- <p
          class="hidden max-w-md text-gray-200 md:mt-6 md:text-lg md:leading-relaxed md:block mr-auto"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
          officia corporis quasi doloribus iure architecto quae voluptatum
          beatae excepturi dolores.
        </p>

        <div class="mt-4 sm:mt-8">
          <a
            class="inline-flex items-center gap-3 px-8 py-3 transition bg-primary text-black font-bold rounded"
            href="#"
          >
            <span class="text-sm font-medium"> درباره ما </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m11 5l-7 7l7 7m-7-7h16"
              />
            </svg>
          </a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HeroSection',
  mounted() {},
})
</script>

<style scoped lang="scss">
.pattern {
  @apply absolute object-contain;
}

.pich-1 {
  @apply top-0 w-20;
}

.pich-2 {
  @apply top-3 z-[1] w-10 -translate-x-full -rotate-12 transform;
}

.line-1 {
  @apply h-56 w-8 translate-y-20 rotate-[45deg] bg-primary;
}

.line-2 {
  @apply left-96 -top-12 h-56 w-6 rotate-[50deg] bg-primary;
}

.line-3 {
  @apply left-0 bottom-0 h-72 w-10 rotate-[45deg]  bg-primary;
}
</style>
