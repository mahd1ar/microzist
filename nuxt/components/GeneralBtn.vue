<template>
  <button
    class="bg-primary flex items-end cursor-pointer rounded border px-2 py-1 font-bold text-xs mt-3 gap-2"
  >
    <div>
      <slot />
    </div>

    <svg
      v-if="icon === 'chav-left'"
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M13.293 6.293L7.586 12l5.707 5.707l1.414-1.414L10.414 12l4.293-4.293z"
      />
    </svg>
    <svg
      v-else-if="icon === 'download'"
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M3.25 13.25h9m-8.5-6.5l4 3.5l4-3.5m-4-5v8.5"
      />
    </svg>
  </button>
</template>

<script lang="ts" setup>
import { PropType } from '@nuxtjs/composition-api'

const { icon = 'chav-left' } = defineProps({
  icon: {
    type: String as PropType<'download' | 'chav-left'>,
  },
})
</script>
