<template>
  <div>hi dashboard</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: ['auth'],
  setup(props) {
    console.log(999)
  },
})
</script>
