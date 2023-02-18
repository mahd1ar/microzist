<template>
  <div class="py-6">
    <client-only>
      <div
        class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl"
      >
        <div
          class="hidden lg:block lg:w-1/2 bg-cover bg-right"
          style="background-image:url('/signup.jpg')"
        ></div>

        <form @submit.prevent="submit" class="w-full p-8 lg:w-1/2 relative">
          <transition name="login">
            <div
              v-if="loading"
              style="background-color: #161616"
              class="absolute bg-white inset-0 w-full h-full flex justify-center items-center"
            >
              <div class="w-24">
                <motion-dna
                  class="p-4 rounded-md "
                  style="background-color: #161616"
                />
              </div>
            </div>
          </transition>

          <h2 class="text-2xl font-semibold text-gray-700 text-center">
            Microzist
          </h2>
          <p class="text-xl text-gray-600 text-center">Welcome back!</p>

          <div class="mt-4 flex items-center justify-between">
            <span class="border-b w-1/5 lg:w-1/4"></span>
            <div class="text-xs text-center text-gray-500 uppercase">
              با ایمیل خود ثبت نام کنید
            </div>
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

          <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
            <div>
              <div class="flex justify-between">
                <label class="block text-gray-700 text-sm font-bold mb-2"
                  >firstname</label
                >
              </div>
              <input
                v-model="firstname"
                class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
              />
            </div>
            <div>
              <div class="flex justify-between">
                <label class="block text-gray-700 text-sm font-bold mb-2"
                  >last name</label
                >
              </div>
              <input
                v-model="lastname"
                class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
            <div>
              <div class="flex justify-between">
                <label class="block text-gray-700 text-sm font-bold mb-2"
                  >Password</label
                >
              </div>
              <input
                v-model="password"
                class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
              />
            </div>
            <div>
              <div class="flex justify-between">
                <label class="block text-gray-700 text-sm font-bold mb-2"
                  >Confirm Password</label
                >
              </div>
              <input
                v-model="re_password"
                class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
              />
            </div>
          </div>
          <div class="mt-8">
            <button
              type="submit"
              class="bg-gray-900 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-800 flex justify-center items-center"
            >
              ثبت نام
            </button>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="border-b w-1/5 md:w-1/4"></span>
            <a href="#" class="text-xs text-gray-500 uppercase">or sign up</a>
            <span class="border-b w-1/5 md:w-1/4"></span>
          </div>
          <div>
            <vue-hcaptcha
              :sitekey="
                $nuxt.context.isDev
                  ? '10000000-ffff-ffff-ffff-000000000001'
                  : 'd689ed2e9-6e37-4fdb-a09f-8b4fcf04a67b'
              "
              @verify="hCaptchTockenVerify"
            ></vue-hcaptcha>
          </div>
        </form>
      </div>
    </client-only>
    <div class="w-24 container mx-auto" @click="loading = !loading">
      alsdolansdo;ans
    </div>
  </div>
</template>

<script lang="ts">
import { useContext, useRouter, onMounted, ref } from '@nuxtjs/composition-api'
import { defineComponent } from 'vue'
// @ts-ignore
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
import { GeneralApiResponse } from '../../api/data/types'
import MotionDna from '@/components/misc/MotionDNA.vue'

let prvPage: string

export default defineComponent({
  beforeRouteEnter (to, from, next) {
    prvPage = from.fullPath

    if (['/login', '/signup'].includes(prvPage)) {
      prvPage = '/'
    }

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
  components: {
    VueHcaptcha,
    MotionDna
  },
  setup () {
    const ctx = useContext()
    const router = useRouter()
    const firstname = ref(ctx.isDev ? 'sara' : '')
    const lastname = ref(ctx.isDev ? 'janari' : '')
    const email = ref(ctx.isDev ? 'a.mahdiyar7@gmail.com' : '')
    const password = ref(ctx.isDev ? 'Aa123456' : '')
    const re_password = ref(ctx.isDev ? 'Aa123456' : '')
    const loading = ref(false)
    let hCaptchTocken = ''

    function hCaptchTockenVerify (token: string) {
      console.log(token)
      hCaptchTocken = token
    }

    function submit () {
      loading.value = true

      ctx.$axios
        .post<GeneralApiResponse>('/signup', {
          firstname: firstname.value,
          lastname: lastname.value,
          email: email.value,
          password: password.value,
          're-password': re_password.value,
          token: hCaptchTocken
        })
        .then(async res => {
          router.push('/login')
        })

        .finally(() => {
          loading.value = false
        })
    }

    return {
      firstname,
      lastname,
      email,
      password,
      re_password,
      hCaptchTockenVerify,
      submit,
      loading
    }
  }
})
</script>

<style lang="scss" scoped>
.login-enter-active,
.login-leave-active {
  transition: all 0.5s;
  clip-path: circle(120% at 50% 100%);
}
.login-enter {
  clip-path: circle(0% at 50% 100%);
  opacity: 0;
}
.login-leave-to {
  opacity: 0;
  transition-delay: 500ms;
  // clip-path: circle(0% at 50% 0);
}
</style>
