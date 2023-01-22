<template>
  <div
    class="relative overflow-hidden bg-primary bg-cover bg-center bg-no-repeat"
  >
    <div class="" ref="target">
      <HomeTopHeaderSectionVue />
      <div class="container mx-auto flex items-end justify-center">
        <div class="w-1/2">
          <h1
            class="my-16 flex flex-col items-start text-9xl font-extrabold uppercase"
          >
            <span
              v-for="(w, index) in ['carizan', 'pich', 'gostar']"
              :key="index"
              class="relative flex h-28 items-center justify-center overflow-hidden font-lato"
            >
              <strong
                v-motion
                :initial="{
                  y: 125,
                  rotate : 5
                }"
                :enter="{
                  y: 0,
                  rotate : 0,
                  
                  transition: {
                    type: 'keyframes',
                    duration: 900,
                    delay: (index * 85) + 800,
                    ease: 'circOut',
                  },
                  // ease: 'cubic-bezier(0.08, 0.56, 0.19, 1)',
                }"
                class=""
              >
                {{ w }}
              </strong>
            </span>
          </h1>
        </div>

        <div class="w-1/2">
          <img src="/hero/heroimage.jpg" class="object-cover" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useStore } from '@nuxtjs/composition-api'
import { useIntersectionObserver } from '@vueuse/core'
import { RootState } from '~/store'
import HomeTopHeaderSectionVue from './HomeTopHeaderSection.vue'

const target = ref(null)
const store = useStore<RootState>()

useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
  store.dispatch('toggleNav', !isIntersecting)
})
</script>

<style scoped lang="scss"></style>
