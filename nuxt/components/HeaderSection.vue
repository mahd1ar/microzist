<template>
  <div class="bg-black text-white">
    <div class="container flex justify-between py-5">
      <ul class="flex gap-2">
        <li>
          <nuxt-link to="/">home</nuxt-link>
        </li>

        <li>
          <nuxt-link to="/courses">courses</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/events">events</nuxt-link>
        </li>
      </ul>
      <div class="flex flex-row-reverse gap-2" v-if="$store.getters.isLoggedIn">
        hello {{ $store.getters.user.name }}

        <nuxt-link to="/dashboard">dashboards</nuxt-link>
        <nuxt-link to="/logout">logout</nuxt-link>
        <div class="relative">
          <button @click="cart = !cart">V</button>
          <cart-box v-if="cart" class="absolute left-0 w-44 bg-lime-600" />
        </div>
      </div>
      <div v-else>
        <ul class="flex gap-2">
          <li>
            <nuxt-link to="/login">login</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/signup">signin</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@nuxtjs/composition-api'

const cart = ref(false)
</script>
