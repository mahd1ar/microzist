<template>
  <div>
    <div v-if="store.getters.isLoggedIn">
      <nuxt-link to="/cart" class="border bg-gray-300 font-mono"
        >go to cart</nuxt-link
      >
    </div>
    <div v-else>fa:: LOGIN TO SEE YOUR CART</div>
  </div>
</template>

<script lang="ts">
import CARTBYUSER from '@/apollo/q/cart-by-user.gql'
import { CartByUserQuery, CartByUserQueryVariables } from '@/types/types'
import { useStore, onMounted, defineComponent } from '@nuxtjs/composition-api'
import { useLazyQuery } from '@vue/apollo-composable/dist'

export default defineComponent({
  setup() {
    const { result, load, loading } = useLazyQuery<
      CartByUserQuery,
      CartByUserQueryVariables
    >(CARTBYUSER)

    const store = useStore()

    onMounted(() => {
      if (store.getters.isLoggedIn)
        load(
          CARTBYUSER,
          { user: store.getters.user.id },
          { fetchPolicy: 'no-cache' }
        )
    })

    return {
      result,
      load,
      loading,
      store,
    }
  },
})
</script>
