<template>
  <main
    dir="rtl"
    class="relative min-h-screen flex-col items-start justify-between bg-gray-100 sm:pt-0"
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
      <button @click="authItem">AXIOS</button>
      <button @click="authItemgql">GQL</button>
      <div>quick navigatin for dev : for toggle press `m`</div>
      <div style="background-color: red" class="text-xs text-white">
        this will not show in production
      </div>

      <br />
      <div
        class="top-10 left-10 z-50 opacity-50 sm:bg-green-400 md:bg-red-500 lg:bg-blue-500 xl:bg-yellow-500"
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

      <!-- <div class="h-8" aria-hidden="true"></div> -->

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
import { useLazyQuery } from '@vue/apollo-composable/dist'
import AUTHITEM from '@/apollo/q/authitem.gql'
// import CommandPallete from '@/components/CommandPallete.vue'
import axios from 'axios'
export default defineComponent({
  head: {},
  components: {
    // CommandPallete
  },
  setup () {
    const { i18n, $axios } = useContext()
    const { load, onResult, onError } = useLazyQuery(AUTHITEM)
    const showDevBox = ref(false)

    onResult(res => {
      console.log(res)
    })
    onError(res => {
      console.log(res)
    })
    function authItemgql () {
      load(AUTHITEM, {}, { fetchPolicy: 'no-cache' })
    }

    onKeyStroke('m', e => {
      e.preventDefault()
      showDevBox.value = !showDevBox.value
    })

    const locale = ref(i18n.locale)

    const authItem = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:3030/auth-item',
          {},
          { withCredentials: true }
        )
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    return {
      locale,
      showDevBox,
      authItem,
      authItemgql
    }
  }
})
</script>
