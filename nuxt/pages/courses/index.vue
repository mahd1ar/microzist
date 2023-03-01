<template>
  <div>
    <h1>Courses</h1>
    <div class="container mx-auto" v-if="courses?.courses">
      <div class="grid grid-cols-3 gap-2">
        <CourseCart
          v-for="ci in courses?.courses"
          :key="ci.id"
          :id="ci.id"
          :image="ci.image?.url"
          :price="ci.price || 0"
          :sessions-count="12"
          :teacher-name="ci.teacher?.name || ''"
          :title="ci.name || ''"
          :teacher-picture="ci.teacher?.image?.id || ''"
          :url="'/courses/' + ci.id"
        />
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

let prvPage: string
const ctx = useContext()
const store = useStore()

const { result: courses } = useQuery<CoursesQuery>(COURCES)

async function addToCart (cid: string, cname: string) {
  if (store.getters.isLoggedIn) {
    await ctx.$axios.post<GeneralApiResponse>('/cart-item', {
      cid
    })
  } else {
    // @ts-ignore

    ctx.$izitoast.error({ title: 'fa:: first login to watch => ' + cname })
  }
}
</script>
