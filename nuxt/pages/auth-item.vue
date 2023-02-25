<template>
  <div>
    <client-only>
      <div>
        auth item
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import AUTHITEM from '@/apollo/q/authitem.gql'
import { useLazyQuery } from '@vue/apollo-composable/dist'
import { onMounted } from 'vue'
import { AuthitemQuery } from '~/types/types'
import { RootState } from '~/store'
import { useContext, useRouter, defineComponent } from '@nuxtjs/composition-api'
import { type } from 'os'

let prvPath: string = '/'

export default defineComponent({
  //   beforeRouteEnter (_, from, next) {
  //     prvPath = from.fullPath
  //     console.log(prvPath)
  //     next()
  //   },
  setup () {
    const ctx = useContext()
    const router = useRouter()
    const { load, onResult, onError } = useLazyQuery<AuthitemQuery>(
      AUTHITEM,
      {},
      { fetchPolicy: 'no-cache' }
    )

    const nextStop =
      typeof ctx.route.value.query.go === 'string'
        ? ctx.route.value.query.go
        : '/'

    function goBack () {
      console.log(nextStop)
      router.push(nextStop)
    }

    onMounted(() => {
      console.log('...AUTH ITEM...')
      load()
    })

    onError(async () => {
      await ctx.store.dispatch('toggleUser', false)
      goBack()
    })

    onResult(async res => {
      const { authenticatedItem } = res.data
      console.log(authenticatedItem)
      if (authenticatedItem) {
        // user is logged in
        const user: RootState['user'] = {
          id: authenticatedItem.id,
          email: authenticatedItem.email || '',
          name: authenticatedItem.name || '',
          lastName: authenticatedItem.lastName || ''
        }
        await ctx.store.dispatch('toggleUser', user)
        goBack()
      } else {
        await ctx.store.dispatch('toggleUser', false)
        goBack()
        // router.push('/login')
      }
    })
  }
})
</script>
