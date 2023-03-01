<template>
  <div>

 
    <transition name="fade" mode="out-in">
      <MotionDNA :color="color" class="h-96" v-if="loading && kind === 'dna'" />
      <div v-else-if="loading && kind === 'spinner'" class="flex justify-center items-center h-28">
        <svg class="w-14 h-14" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="matrix(0 0 0 0 12 12)"
          >
            <animateTransform
              id="svgSpinnersPulseRingsMultiple0"
              attributeName="transform"
              begin="0;svgSpinnersPulseRingsMultiple2.end"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="translate"
              values="12 12;0 0"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin="0;svgSpinnersPulseRingsMultiple2.end"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="scale"
              values="0;1"
            />
            <animate
              attributeName="opacity"
              begin="0;svgSpinnersPulseRingsMultiple2.end"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </path>
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="matrix(0 0 0 0 12 12)"
          >
            <animateTransform
              id="svgSpinnersPulseRingsMultiple1"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="translate"
              values="12 12;0 0"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="scale"
              values="0;1"
            />
            <animate
              attributeName="opacity"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </path>
          <path
            fill="currentColor"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            transform="matrix(0 0 0 0 12 12)"
          >
            <animateTransform
              id="svgSpinnersPulseRingsMultiple2"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="translate"
              values="12 12;0 0"
            />
            <animateTransform
              additive="sum"
              attributeName="transform"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              type="scale"
              values="0;1"
            />
            <animate
              attributeName="opacity"
              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
              calcMode="spline"
              dur="1.2s"
              keySplines=".52,.6,.25,.99"
              values="1;0"
            />
          </path>
        </svg>
      </div>
      <div v-else>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import MotionDNA from '@/components/misc/MotionDNA.vue'
import { PropType } from 'vue'

const {
  loading,
  color,
  kind = 'dna',
} = defineProps({
  loading: {
    type: Boolean as PropType<boolean>,
    required: true,
  },

  color: {
    type: String,
  },
  kind: {
    type: String as PropType<'dna' | 'spinner' >,
    default: () => 'dna'
  },
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-leave-to {
  position: absolute;
  width: 100%;
  left: 0;
}
</style>
