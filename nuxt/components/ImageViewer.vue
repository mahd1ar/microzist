<template>
  <div v-show="open">
    <transition name="scale-up" @after-leave="closeViewer" @enter="enter">
      <div
        v-show="show"
        class="flex-center fixed top-0 left-0 z-20 h-full w-full"
      >
        <!-- overlay -->
        <div
          class="flex-center absolute top-0 left-0 h-full w-full select-none bg-gray-700 bg-opacity-90"
        ></div>

        <!-- For mobile -->
        <div v-if="$device.isMobile" class="relative w-full">
          <div class="flex w-full snap-x snap-mandatory overflow-auto">
            <div
              v-for="(img, index) in imgs"
              ref="image-item"
              :key="index"
              :style="{ '--count': index }"
              class="w-11/12 flex-shrink-0 snap-center"
            >
              <img class="m-auto w-full" :src="img" />
            </div>
          </div>
        </div>

        <!-- for desktop -->
        <div v-else class="relative w-full select-none">
          <div class="movable mx-auto h-5/6 w-10/12" :style="{ '--count': 3 }">
            <img
              :style="{ transform: `scale(${scale})` }"
              class="mx-auto max-h-full max-w-full object-cover transition-all duration-500 will-change-transform"
              :src="imgs[imgIndex + diff]"
              alt=""
            />
          </div>
        </div>

        <!-- buttons -->
        <div
          class="absolute top-4 right-4 cursor-pointer p-5 text-gray-500"
          @click="hide"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="h-10 w-10"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"
            />
          </svg>
        </div>

        <div
          v-if="$device.isDesktop"
          @click="next"
          class="absolute right-4 cursor-pointer p-5 text-gray-500"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="h-10 w-10"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10.02 6L8.61 7.41L13.19 12l-4.58 4.59L10.02 18l6-6l-6-6z"
            />
          </svg>
        </div>

        <div
          @click="prv"
          v-if="$device.isDesktop"
          class="absolute left-4 cursor-pointer p-5 text-gray-500"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="h-10 w-10 rotate-180 transform"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10.02 6L8.61 7.41L13.19 12l-4.58 4.59L10.02 18l6-6l-6-6z"
            />
          </svg>
        </div>

        <div
          v-if="$device.isDesktop"
          class="absolute bottom-4 translate-x-1/2 transform cursor-pointer border border-l-0 bg-white bg-opacity-20 p-5 text-white"
          @click="zoomIn"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="h-5 w-5"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509c-148-148.1-388.4-148.1-537 0c-148.1 148.6-148.1 389 0 537c139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0c-118.7-118.8-118.7-311.2 0-430c118.8-118.7 311.2-118.7 430 0c118.7 118.8 118.7 311.2 0 430z"
            />
          </svg>
        </div>

        <div
          v-if="$device.isDesktop"
          class="absolute bottom-4 -translate-x-1/2 transform cursor-pointer border border-r-0 bg-white bg-opacity-20 p-5 text-white"
          @click="zoomOut"
        >
          <svg
            aria-hidden="true"
            role="img"
            class="h-5 w-5"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509c-148-148.1-388.4-148.1-537 0c-148.1 148.6-148.1 389 0 537c139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0c-118.7-118.8-118.7-311.2 0-430c118.8-118.7 311.2-118.7 430 0c118.7 118.8 118.7 311.2 0 430z"
            />
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    open: {
      type: Boolean,
      required: true
    },
    imgs: {
      type: Array as PropType<string[]>
    },
    imgIndex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      show: false,
      scale: 1,
      diff: 0
    }
  },
  //   watch {
  // shadow(nval){
  //     if(nval===false)
  //     this.scale =0
  //     else
  //     this.scale = 1
  // }
  //   },

  watch: {
    open (nval: boolean) {
      if (nval) {
        // this.imgIndex
        this.show = true
      }
    }
  },
  mounted () {
    // document.onkeydown = checkKey;

    document.addEventListener('keydown', this.checkKey)
  },
  destroyed () {
    document.removeEventListener('keydown', this.checkKey)
  },
  methods: {
    checkKey (e: KeyboardEvent) {
      if (this.show === false) return

      e = e || window.event
      if (e.key === 'Escape') {
        // scaped
        this.show = false
      } else if (e.keyCode === 38) {
        // up arrow
      } else if (e.keyCode === 40) {
        // down arrow
      } else if (e.keyCode === 37) {
        // left arrow
        this.prv()
      } else if (e.keyCode === 39) {
        // right arrow
        this.next()
      }
    },
    enter () {
      if (this.imgIndex > -1 && this.$device.isMobile) {
        const divs = this.$refs['image-item'] as HTMLDivElement[]

        divs[this.imgIndex].scrollIntoView({
          // behavior: 'smooth',
          inline: 'center'
        })
      }
    },
    next () {
      this.diff++
    },
    prv () {
      this.diff--
    },
    hide () {
      this.show = false
    },
    closeViewer () {
      this.$emit('update:open', false)
      this.diff = 0
    },
    zoomIn () {
      if (this.scale < 3) this.scale += 1
    },
    zoomOut () {
      if (this.scale > 0.5) {
        if (this.scale > 1) this.scale -= 1
        else this.scale -= 0.2
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.scale-up-enter-active,
.scale-up-leave-active {
  transition: all 1s;
  transition-delay: 200ms;
  transform: scale(1);
  .snap-center,
  .movable {
    transition: all 0.4s;
    transition-delay: calc(var(--count) * 100ms);
  }
}
.scale-up-enter,
.scale-up-leave-to {
  .snap-center,
  .movable {
    // transform: scale(0);
    transform: perspective(150px) rotateX(50deg) scale(0.2);
    opacity: 0;
  }
  opacity: 0;
}
</style>
