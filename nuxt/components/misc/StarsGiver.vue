<template>
  <div>
    <div class=" group   inline-flex gap-2 flex-row-reverse">
      <div
        v-for="i in 5"
        :key="i"
        @click="rate(i)"
        class=" hover:scale-110 text-yellow-400 group-hover:scale-150 stars-animation ease-out transition-all duration-300"
        :style="{ '--count': i }"
      >
        <div
          v-if="props.rate >= i"
          class="hover:scale-110 hover:text-yellow-500 transition-all duration-150"
        >
          <svg class="h-6 w-6" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z"
            />
          </svg>
        </div>
        <div
          v-else
          class="hover:scale-110 hover:text-yellow-500 transition-all duration-150"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6">
            <path
              fill="currentColor"
              d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28L12 15.4z"
            />
          </svg>
        </div>
      </div>
    </div>
    <slot v-bind:hasChanged="hasChanged" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@nuxtjs/composition-api'

const props = defineProps({
  rate: {
    type: Number,
    required: true
  }
})

const hasChanged = ref(false)

const initialValue = props.rate
const emit = defineEmits(['update:rate', 'hasChanged'])
function rate (i: number) {
  emit('update:rate', i)

  emit('hasChanged', i !== initialValue)

  hasChanged.value = i !== initialValue
}
</script>

<style lang="scss" scoped>
.stars-animation {
  transition-delay: calc(var(--count) * 50ms);
}
</style>
