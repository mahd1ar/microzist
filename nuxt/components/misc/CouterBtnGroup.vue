<template>
  <div class="flex gap-4 items-center">
    تعداد
    <div
      class=" flex bg-indigo-500 rounded border border-gray-500 bg-opacity-50 gap-2 "
    >
      <button
        class="p-1 w-6 h-6 flex justify-center items-center text-lg hover:bg-black/20 "
        @click="$emit('update', props.count + 1)"
      >
        <svg class="w-4 aspect-square" viewBox="0 0 24 24">
          <path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z" />
        </svg>
      </button>
      <div class="flex justify-center items-center text-lg">
        {{ props.count }}
      </div>
      <button
        class="p-1 w-6 h-6 flex justify-center items-center text-lg hover:bg-black/20 "
        @click="$emit('update', props.count - 1)"
      >
        <svg class="w-4 aspect-square" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 12.998H5v-2h14z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  count: {
    type: Number,
    default: () => 0
  }
})
</script>
