<template>
  <div>
    <h1>we doo</h1>
    <div class="container mx-auto" v-if="courses.result">
      <div
        class="border"
        v-for="c in courses.result.value?.courses"
        :key="c.id"
      >
        <h2>
          {{ c.name }}
        </h2>
        <div v-if="c.isAccessible" class="bg-green-400">tick</div>
        <button @click="addToCart(c.id, c.name || '')" v-else>
          add to cart
        </button>
        <br />
        <nuxt-link :to="'/courses/' + c.id">view course</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useContext, useStore } from '@nuxtjs/composition-api'
import COURCES from '@/apollo/q/courses.gql'
import { CoursesQuery } from '@/types/types'
import { useQuery } from '@vue/apollo-composable/dist'
import { GeneralApiResponse } from '../../../api/data/types'
import { showGeneralApiMessage } from '~/data/utils'

let prvPage: string
const ctx = useContext()
const store = useStore()

const courses = useQuery<CoursesQuery>(COURCES)

async function addToCart(cid: string, cname: string) {
  if (store.getters.isLoggedIn) {
    await ctx.$axios.post<GeneralApiResponse>('/cart-item', {
      cid,
    })
  } else {
    // @ts-ignore

    ctx.$izitoast.error({ title: 'fa:: first login to watch => ' + cname })
  }
}
</script>
