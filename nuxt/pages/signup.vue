<template>
  <div class="py-6">
    <client-only>
      <div
        class="mx-auto flex max-w-sm overflow-hidden rounded-lg bg-white shadow-lg lg:max-w-4xl"
      >
        <div
          class="hidden bg-cover bg-right lg:block lg:w-1/2"
          style="background-image: url('/signup.jpg')"
        ></div>

        <form @submit.prevent="submit" class="relative w-full p-8 lg:w-1/2">
          <transition name="login">
            <div
              v-if="loading"
              style="background-color: #161616"
              class="absolute inset-0 flex h-full w-full items-center justify-center bg-white"
            >
              <div class="w-24">
                <motion-dna
                  class="rounded-md p-4"
                  style="background-color: #161616"
                />
              </div>
            </div>
          </transition>

          <h2 class="text-center text-2xl font-semibold text-gray-700">
            Microzist
          </h2>
          <p class="text-center text-xl text-gray-600">Welcome back!</p>

          <div class="mt-4 flex items-center justify-between">
            <span class="w-1/5 border-b lg:w-1/4"></span>
            <div class="text-center text-xs uppercase text-gray-500">
              با ایمیل خود ثبت نام کنید
            </div>
            <span class="w-1/5 border-b lg:w-1/4"></span>
          </div>
          <div class="mt-4">
            <label class="mb-2 block text-sm font-bold text-gray-700"
              >Email Address</label
            >
            <input
              v-model="email"
              class="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 focus:outline-none"
              type="email"
            />
          </div>

          <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div class="flex justify-between">
                <label class="mb-2 block text-sm font-bold text-gray-700"
                  >firstname</label
                >
              </div>
              <input
                v-model="firstname"
                class="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 focus:outline-none"
                type="text"
              />
            </div>
            <div>
              <div class="flex justify-between">
                <label class="mb-2 block text-sm font-bold text-gray-700"
                  >last name</label
                >
              </div>
              <input
                v-model="lastname"
                class="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 focus:outline-none"
                type="text"
              />
            </div>
          </div>

          <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div class="flex justify-between">
                <label class="mb-2 block text-sm font-bold text-gray-700"
                  >Password</label
                >
              </div>
              <input
                v-model="password"
                class="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 focus:outline-none"
                type="password"
              />
            </div>
            <div>
              <div class="flex justify-between">
                <label class="mb-2 block text-sm font-bold text-gray-700"
                  >Confirm Password</label
                >
              </div>
              <input
                v-model="re_password"
                class="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 focus:outline-none"
                type="password"
              />
            </div>
          </div>
          <div class="mt-8">
            <button
              type="submit"
              class="flex w-full items-center justify-center rounded bg-gray-900 py-2 px-4 font-bold text-white hover:bg-gray-800"
            >
              ثبت نام
            </button>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="w-1/5 border-b md:w-1/4"></span>
            <a href="#" class="text-xs uppercase text-gray-500">or sign up</a>
            <span class="w-1/5 border-b md:w-1/4"></span>
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
    <div class="container mx-auto w-24" @click="loading = !loading">
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
  beforeRouteEnter(to, from, next) {
    prvPage = from.fullPath

    if (['/login', '/signup', '/auth-item'].includes(prvPage)) {
      prvPage = '/'
    }

    next((vm) => {
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
    MotionDna,
  },
  setup() {
    const ctx = useContext()
    const router = useRouter()
    const firstname = ref(ctx.isDev ? 'sara' : '')
    const lastname = ref(ctx.isDev ? 'janari' : '')
    const email = ref(ctx.isDev ? 'a.mahdiyar7@gmail.com' : '')
    const password = ref(ctx.isDev ? 'Aa123456' : '')
    const re_password = ref(ctx.isDev ? 'Aa123456' : '')
    const loading = ref(false)
    let hCaptchTocken = ''

    function hCaptchTockenVerify(token: string) {
      console.log(token)
      hCaptchTocken = token
    }

    function submit() {
      loading.value = true

      ctx.$axios
        .post<GeneralApiResponse>('/signup', {
          firstname: firstname.value,
          lastname: lastname.value,
          email: email.value,
          password: password.value,
          're-password': re_password.value,
          token: hCaptchTocken,
        })
        .then(async (res) => {
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
      loading,
    }
  },
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
