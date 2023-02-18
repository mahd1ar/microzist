<template>
  <div>
    <!-- component -->
    <div class="py-6">
      <div
        class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl"
      >
        <div
          class="hidden lg:block lg:w-1/2 bg-cover bg-right"
          style="background-image:url('/login.jpg')"
        ></div>
        <form @submit.prevent="login" class="w-full p-8 lg:w-1/2">
          <h2 class="text-2xl font-semibold text-gray-700 text-center">
            Brand
          </h2>
          <p class="text-xl text-gray-600 text-center">Welcome back!</p>

          <div class="mt-4 flex items-center justify-between">
            <span class="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" class="text-xs text-center text-gray-500 uppercase"
              >or login with email</a
            >
            <span class="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Email Address</label
            >
            <input
              v-model="email"
              class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
            />
          </div>
          <div class="mt-4">
            <div class="flex justify-between">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Password</label
              >
              <a href="#" class="text-xs text-gray-500">Forget Password?</a>
            </div>
            <input
              v-model="password"
              class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
            />
          </div>
          <div class="mt-8">
            <button
              type="submit"
              class="bg-indigo-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-indigo-600 flex justify-center items-center"
            >
              ورود
            </button>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="border-b w-1/5 md:w-1/4"></span>
            <a href="#" class="text-xs text-gray-500 uppercase">or sign up</a>
            <span class="border-b w-1/5 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </div>
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
import { useDebounceFn } from '@vueuse/core'
import { FetchResult } from 'apollo-link'

let prvPage: string

export default defineComponent({
  beforeRouteEnter (to, from, next) {
    prvPage = from.fullPath

    if (['/login', '/signup'].includes(prvPage)) {
      prvPage = '/'
    }
    // if(prvPage)

    next(vm => {
      if (vm.$store.getters.isLoggedIn) {
        // TODO defualt determain defualt route
        if (to.query.redirect === 'no') {
          vm.$router.push(vm.localePath('/'))
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

    const onDoneLoginCallbackDebouncedFn = useDebounceFn(
      async (
        r: FetchResult<SigninMutation, Record<string, any>, Record<string, any>>
      ) => {
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
            'toggleUser',
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
      },
      1000
    )

    onDone(onDoneLoginCallbackDebouncedFn)

    const email = ref(ctx.isDev ? 'a.mahdiyar7@yahoo.com' : '')
    const password = ref(ctx.isDev ? 'Aa1234578' : '')

    async function login () {
      const variables: SigninMutationVariables = {
        email: email.value,
        password: password.value
      }

      await loginMutation(variables)
      await loginMutation(variables)
      // store.dispatch('toggleUser')
    }
    return {
      email,
      password,
      login
    }
  }
})
</script>
