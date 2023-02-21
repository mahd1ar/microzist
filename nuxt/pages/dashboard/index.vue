<template>
  <div>
    <div class="container mx-auto">
      <div>hi dashboard</div>

      <div v-for="c in myCources.result.value?.user?.courses || []" :key="c.id">
        <div class="w-1/6 border">
          {{ c.name }}
          <br /><br />
          <nuxt-link :to="'/dashboard/course/' + c.id">VIEW</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MYCOURSES from '@/apollo/q/my-courses.gql'
import { MyCoursesQuery, MyCoursesQueryVariables } from '@/types/types'
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'

export default defineComponent({
  // middleware: ['auth'],
  layout: 'dashboard',
  setup() {
    const ctx = useContext()
    const myCources = useQuery<MyCoursesQuery, MyCoursesQueryVariables>(
      MYCOURSES,
      { id: ctx.store.getters.user.id }
    )

    return { myCources }
  },
})
</script>
