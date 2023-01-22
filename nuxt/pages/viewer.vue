<template>
  <div class="bg-tm-black relative  w-full h-full text-white min-h-screen p-5 flex flex-col justify-center items-center">
    <img :src="srcUrl" alt="" />
    <!-- <img src="" alt=""> -->
    <div class="absolute left-5 top-5" >
      <nuxt-link class="flex-center gap-2  " :to="refPath">
        <svg class="w-10 h-10 bg-slate-600 rounded-full hover:bg-slate-400"  preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2Z"/></svg>
       <strong> _GOBACK</strong>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useFetch,
  useRoute,
  useRouter,
  useAsync,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'nolayout',
  name: 'viewer',
  setup() {
    const route = useRoute()
    const router = useRouter()

    let srcUrl: string,
      refPath = '/'
    const { src, ref } = <{ src: string; ref: string }>route.value.query

    if (Array.isArray(src)) {
      if (src[0] === null) {
        router.go(-1)
      } else srcUrl = src[0]
      return 0
    } else {
      srcUrl = src
    }

    refPath = ref === null || ref === '' ? '/' : ref

    return {
      srcUrl,
      refPath,
    }
  },
})
</script>
