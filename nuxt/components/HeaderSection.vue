<template>
  <div class="bg-black text-white">
    <div class="container flex py-5 justify-between">
      <ul class="  flex gap-2 ">
        <li>
          <nuxt-link to="/">home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/login">login</nuxt-link>
        </li>
      </ul>
      <div v-if="$store.getters.isLoggedIn">
        hello {{ $store.getters.user.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
