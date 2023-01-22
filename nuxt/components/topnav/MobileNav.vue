<template>
  <nav
    class="mobile-nav fixed top-0 z-20 flex h-full w-full flex-col items-start justify-center bg-gradient-to-tr from-black to-gray-900/90"
  >
    <div
      class="absolute left-0 top-5 flex w-full  px-4 text-white"
    >
  

      <button
        id="btn"
        ref="crossIcon"
        class="h-10 w-10 ml-auto"
        @click="close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="m7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884L7.116 8z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <ul class="relative left-10 flex flex-col text-3xl text-primary">
      <li
        v-for="(i, index) in navItems"
        :key="i.id"
        @click="close"
        class="py-4 px-2"
        v-motion
        :initial="{
          scale: 1.5,
          y: 100, //* ( index % 2 === 0 ? 1 : -1),
          opacity: 0,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 250,
            damping: 25,
            mass: 0.5,
            delay: index * 70,
          },
        }"
      >
        <nuxt-link :to="i.link" v-text="i.label"></nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { RootState } from '@/store/index'
import { PropType } from 'vue'

const { navItems = [] } = defineProps({
  navItems: {
    type: Array as PropType<RootState['navItem']>,
  },
})

const emit = defineEmits(['close'])

function close(){
  emit('close')
}
</script>

<style lang="scss">
.mobile-nav .nuxt-link-exact-active {
  @apply relative flex flex-row-reverse items-center justify-end gap-2;

  &::after {
    content: '';
    @apply w-6 rounded border-b-4 border-primary-light transition-all ease-out;
  }
}

button#btn {
  animation-name: rotate;
  animation-duration: 300ms;
  animation-fill-mode: forwards;
}

@keyframes rotate {
  from {
    transform: rotate(45deg) translateX(3px);
  }

  to {
    transform: rotate(0deg) translateX(3px);
  }
}
</style>
