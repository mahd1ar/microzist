<template>
  <div class="container mx-auto">
    <UserCart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserCart from '~/components/UserCart.vue'
export default defineComponent({
  middleware: ['auth'],
  components: { UserCart },
})
</script>
