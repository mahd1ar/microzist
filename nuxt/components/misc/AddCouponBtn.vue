<template>
  <div class="relative">
    <button
      v-show="!show"
      @click="toggle"
      type="button"
      class="flex items-start gap-2 border border-slate-900 px-2 py-1 transition-colors hover:border-gray-500 hover:bg-white/20"
    >
      <svg class="fill-cu h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.713T16 11h-3V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v3H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13h3v3q0 .425.288.713T12 17Zm-7 4q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14Zm0 0V5v14Z"
        />
      </svg>
      <span> اضافه کردن کپن تخفیف </span>
    </button>
    <div v-show="show" class="absolute top-0 flex items-end px-2">
      <div class="flex flex-col">
        <input
          placeholder="کد تخفیف"
          type="text"
          v-model="input"
          @input="() => $emit('update:code', input)"
          class="w-32 rounded  border border-gray-300 placeholder:text-base bg-white/10 py-1 px-2 text-lg text-white outline-none"
        />
      </div>
      <button
        @click="submit"
        class="mr-2 min-w-max rounded bg-green-500 bg-opacity-20 px-4 py-2 text-green-300"
      >
        اعمال کد
      </button>
      <button
        @click="goBack"
        class="mr-2 min-w-max rounded bg-opacity-20 px-4 py-2 text-gray-200"
      >
        بازگشت
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@nuxtjs/composition-api'

const { code } = defineProps({
  code: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submit'])

const input = ref(code)
const show = ref(false)
function toggle () {
  show.value = !show.value
}
function clean () {
  input.value = ''
}
function goBack () {
  toggle()
  clean()
}

function submit () {
  emit('submit')
  goBack()
}
</script>
