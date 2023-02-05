<template>
  <div>
    LOGIN PAGE <br />
    i came from <br />
    <form @submit.prevent="login" class="flex flex-col gap-4">
      <input v-model="email" type="text" />
      <input v-model="password" type="password" />
      <button type="submit">login</button>
    </form>
  </div>
</template>

<script lang="ts">
import {
  useContext,
  useRouter,
  ref,
  useStore,
  useRoute
} from '@nuxtjs/composition-api'
import LOGIN from '@/apollo/m/signin.gql'
import { SigninMutation, SigninMutationVariables } from '@/types/types'
import { useMutation } from '@vue/apollo-composable/dist'
import { defineComponent } from 'vue'
let prvPage: string

export default defineComponent({
  beforeRouteEnter (to, from, next) {
    prvPage = from.fullPath

    next(vm => {
      console.log(vm.$store.getters.isLoggedIn)
      if (vm.$store.getters.isLoggedIn) {
        // TODO defualt determain defualt route
        vm.$router.push(vm.localePath('/'))
        if (to.query.redirect === 'no') {
        } else if (typeof to.query.redirect === 'string') {
          vm.$router.push(vm.localePath(to.query.redirect))
        } else {
          vm.$router.push(vm.localePath(prvPage))
        }
      }
    })
  },
  setup () {
    const ctx = useContext()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const { mutate: loginMutation, onDone, onError } = useMutation<
      SigninMutation
    >(LOGIN)

    onDone(async r => {
      if (
        r.data?.authenticateUserWithPassword?.__typename ===
        'UserAuthenticationWithPasswordFailure'
      ) {
        alert('incorrect username or password!')
      } else if (
        r.data?.authenticateUserWithPassword?.__typename ===
        'UserAuthenticationWithPasswordSuccess'
      ) {
        alert('welcome ' + r.data.authenticateUserWithPassword.item.lastName)
        await store.dispatch(
          'toggleLogin',
          r.data.authenticateUserWithPassword.item
        )
        // @ts-ignore
        ctx.$izitoast.success({ title: 'fa:: success' })
        if (route.value.query.redirect === 'no') {
          // TODO defualt determain defualt route
        } else if (typeof route.value.query.redirect === 'string') {
          router.push(ctx.localePath(route.value.query.redirect))
        } else {
          router.push(ctx.localePath(prvPage))
        }
      }
    })

    const prv_page = ref('')
    const email = ref('a.mahdiyar7@yahoo.com')
    const password = ref('Aa1234578')

    function login () {
      const variables: SigninMutationVariables = {
        email: email.value,
        password: password.value
      }

      loginMutation(variables)

      store.dispatch('toggleUser')
    }
    return {
      email,
      password,
      login
    }
  }
})
</script>
