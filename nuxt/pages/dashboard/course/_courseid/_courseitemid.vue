<template>
  <div class="container mx-auto">
    <div v-if="courseItem.result.value?.courseItem">
      <div v-if="courseItem.result.value.courseItem?.video?.video?.url">
        <video width="320" height="240" controls>
          <source
            :src="courseItem.result.value.courseItem?.video.video.url"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2 class="text-xl">{{ courseItem.result.value?.courseItem?.name }}</h2>
      <hr />
      <client-only>
        <form @submit.prevent="submitComment">
          <input type="text" v-model="comment" />
          <button type="submit">submit</button>
        </form>
      </client-only>
      <div>
        <h2 class="text-2xl">Comments</h2>
        <div
          v-for="c in courseItem.result.value.courseItem.comments || []"
          :key="c.id"
          class="flex gap-2"
        >
          <div>{{ c.comment }}</div>
          by:
          <div>{{ c.user?.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import COU_ITEM from '@/apollo/q/course-item.gql'
import CREATE_COMMENT from '@/apollo/m/create-comment.gql'
import {
  CourseItemQuery,
  CourseItemQueryVariables,
  CreateCommentMutation,
  CreateCommentMutationVariables
} from '@/types/types'
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'
import { useQuery, useMutation } from '@vue/apollo-composable/dist'

export default defineComponent({
  middleware: ['auth'],
  setup () {
    const comment = ref('')
    const ctx = useContext()
    const commentQuery = useMutation<
      CreateCommentMutation,
      CreateCommentMutationVariables
    >(CREATE_COMMENT)
    const courseItem = useQuery<CourseItemQuery, CourseItemQueryVariables>(
      COU_ITEM,
      {
        id: ctx.route.value.params.courseitemid
      }
    )

    commentQuery.onDone(() => {
      // TODO toast
      alert('fa:: Comment saved')
    })

    function submitComment () {
      if (comment.value.trim() !== '') {
        commentQuery.mutate({
          comment: comment.value,
          courseItem: ctx.route.value.params.courseitemid
        })
      }
    }

    return { courseItem, submitComment, comment }
  }
})
</script>
