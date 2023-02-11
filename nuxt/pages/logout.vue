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
let prvPage: string

export default defineComponent({
  beforeRouteEnter (to, from, next) {
    prvPage = from.fullPath

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

    onDone(async r => {
      router.push('/')
      // @ts-ignore
      ctx.$izitoast.info({ title: 'fa:: success' })
    })

    onError(() => {
      alert('ERROR')
      router.push('/')
    })

    onMounted(() => {
      mutate()
    })

    return {
      loading
    }
  }
})
</script>
