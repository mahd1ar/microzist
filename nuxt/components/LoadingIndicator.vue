<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="isLoading" :key="11" class="m-2 relative">
        <div class="w-full p-4 flex-center rounded-lg text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-dasharray="15"
              stroke-dashoffset="15"
              stroke-linecap="round"
              stroke-width="2"
              d="M12 3C16.9706 3 21 7.02944 21 12"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="15;0"
              />
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
        </div>

        <div class="w-full p-4 flex-center rounded-lg text-primary-light absolute top-0 ">
          <svg
            class="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-dasharray="15"
              stroke-dashoffset="15"
              stroke-linecap="round"
              stroke-width="2"
              d="M12 3C16.9706 3 21 7.02944 21 12"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="15;0"
              />
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
        </div>
      </div>
      <div v-else :key="22">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isLoading: { type: Boolean, required: true },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
  /* background-color: blueviolet; */
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
