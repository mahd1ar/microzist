<template>
  <div>
    <div>
      logging out
    </div>
  </div>
</template>

<script lang="ts">
import { useContext, useRouter, onMounted } from '@nuxtjs/composition-api'
import LOGOUT from '@/apollo/m/logout.gql'
import { LogoutMutation } from '@/types/types'
import { useMutation } from '@vue/apollo-composable/dist'
import { defineComponent } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export default defineComponent({
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.getters.isLoggedIn === false) {
        vm.$router.push(vm.localePath('/'))
      }
    })
  },
  setup () {
    const ctx = useContext()
    const router = useRouter()

    const { mutate, onDone, onError, loading } = useMutation<LogoutMutation>(
      LOGOUT
    )

    const onDoneDebouncedFn = useDebounceFn(() => {
      // @ts-ignore
      ctx.$izitoast.info({ title: 'fa:: success' })
      ctx.store.dispatch('toggleUser', false)
      // setTimeout(() => {
      //   location.href = '/'
      // }, 2500)
      router.push('/')
    }, 300)

    onDone(onDoneDebouncedFn)

    onError(() => {
      alert('ERROR')
      router.push('/')
    })

    onMounted(async () => {
      // ctx.$axios.post('/signout', {}, { withCredentials: true })
      await mutate()
      // await mutate()
    })

    return {
      loading
    }
  }
})
</script>
