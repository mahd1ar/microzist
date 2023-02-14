<template>
  <div>
    <div v-html="content"></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from '@nuxtjs/composition-api'
import { Slate, Editable } from 'slate-vue'

const { content } = defineProps({
  content: {
    type: String as PropType<string>,
  },
})
</script>
