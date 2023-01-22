<template>
  <img
    @click="preview"
    v-show="isImageLoaded"
    class="w-full h-full object-cover"
    :style="{ objectFit: obj }"
    :src="src"
    alt=""
    @load="imageLoaded"
  />
</template>

<script lang="ts" setup>
import {
  PropType,
  ref,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'

const router = useRouter()
const route = useRoute()
const isImageLoaded = ref(false)
const { localePath } = useContext()
function imageLoaded() {
  console.log('imageLoaded')
  isImageLoaded.value = true
}
const { obj = 'cover', src } = defineProps({
  src: { type: String, required: true },
  obj: {
    type: String as PropType<'cover' | 'contain'>,
  },
})

const preview = () => {
  router.push({
    path: localePath('/viewer'),
    query: {
      src,
      ref: route.value.fullPath,
    },
  })
}
</script>
