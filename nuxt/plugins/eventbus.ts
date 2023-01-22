import { Plugin, Context } from '@nuxt/types'
import mitt, { Emitter } from 'mitt'

declare module 'vue/types/vue' {
  interface Vue {
    $mitt: Emitter<Events>
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $mitt: Emitter<Events>
  }

  interface Context {
    $mitt: Emitter<Events>
  }
}

type Events = {
  languageSwitched: ['en' | 'fa', 'fa' | 'en']
}
const eventBus: Plugin = (context, inject) => {
  const emitter = mitt<Events>()
  //   const eb = new EventBus(context)
  // console.log( context.app.apolloProvider)
  inject('mitt', emitter)
}

export default eventBus
