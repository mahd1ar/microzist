<template>
  <main
    class="relative flex-col items-start justify-between min-h-screen bg-gray-100 sm:pt-0"
  >
    <div
      v-if="showDevBox"
      :style="
        `
      position: fixed;
      top: 200px;
      left: 20px;
      width : 164px;
      background: white;
      direction: ltr;
      z-index : 200;
      opacity: 0.8;
    `
      "
    >
      <div>quick navigatin for dev : for toggle press `m`</div>
      <div style="background-color: red" class="text-white text-xs">
        this will not show in production
      </div>

      <br />
      <div
        class=" top-10 left-10 z-50 opacity-50 sm:bg-green-400 md:bg-red-500 lg:bg-blue-500 xl:bg-yellow-500"
      >
        <span class="hidden sm:block">sm</span>
        <span class="hidden md:block">md</span>
        <span class="hidden lg:block">lg</span>
        <span class="hidden xl:block">xl</span>
        <span class="hidden 2xl:block">2xl</span>
      </div>
    </div>
    <div class="w-full flex-grow">
      <HeaderSection />

      <Nuxt ref="nuxt" />

      <!-- TODO command pallete -->
      <!-- <command-pallete /> -->
    </div>
  </main>
</template>

<script lang="ts">
import {
  ref,
  useContext,
  useMeta,
  defineComponent
} from '@nuxtjs/composition-api'
import { onKeyStroke } from '@vueuse/core'
// import CommandPallete from '@/components/CommandPallete.vue'

export default defineComponent({
  head: {},
  components: {
    // CommandPallete
  },
  setup () {
    const { i18n } = useContext()

    const showDevBox = ref(false)

    onKeyStroke('m', e => {
      e.preventDefault()
      showDevBox.value = !showDevBox.value
    })

    const locale = ref(i18n.locale)

    return {
      locale,
      showDevBox
    }
  }
})
</script>
