<template>
  <div>
    <transition name="fade" mode="out-in">
      <MotionDNA :color="color" class="h-96" v-if="loading" />
      <div v-else>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import MotionDNA from '@/components/misc/MotionDNA.vue'
import { PropType } from 'vue'

const { loading, color } = defineProps({
  loading: {
    type: Boolean as PropType<boolean>,
    required: true
  },

  color: {
    type: String
  }
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
