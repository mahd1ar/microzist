<template>
  <div dir="ltr">
    <div
      class="fixed z-50 top-0 left-0 w-full h-full bg-opacity-75 bg-black flex justify-center items-center"
    >
      <div class="container mx-auto relative">
        <div class="relative">
          <button
            @click="closeDialog"
            class="absolute text-black -top-full left-0 w-10 h-10 bg-white bg-opacity-75 rounded-sm z-50"
          >
            <!-- {{props.selectedItem}} -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 36 36"
            >
              <path
                fill="currentColor"
                d="m19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41Z"
                class="clr-i-outline clr-i-outline-path-1"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
          </button>
        </div>

        <section class="splide" aria-label="Splide">
          <div class="splide__track">
            <ul class="splide__list">
              <li
                v-for="(i, index) in props.images"
                :key="index"
                class="splide__slide flex-center"
              >
                <img :src="i.src" :alt="i.alt || ''" class="object-cover" />
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Splide from '@splidejs/splide'
import {
  watch,
  onMounted,
  onUnmounted,
  PropType
} from '@nuxtjs/composition-api'
import { onKeyStroke } from '@vueuse/core'

let splide: Splide | null = null
const props = defineProps({
  images: {
    type: Array as PropType<
      {
        src: string
        alt?: string
      }[]
    >
  },
  selectedItem: { type: Number }
})
// property : { type : String as PropType<string | undefined> }

const emit = defineEmits(['update:selectedItem'])

onMounted(() => {
  splide = new Splide('.splide', {
    height: '100vh'
  })

  splide.on('mounted', () => {
    splide?.go(props.selectedItem || 0)
  })

  splide.on('moved', () => {
    splide && emit('update:selectedItem', splide.index)
  })

  splide.mount()
})

onUnmounted(() => {
  splide?.destroy()
})

watch(
  () => props.selectedItem,
  nval => {
    splide?.go(nval || 0)
  }
)

const closeDialog = () => {
  emit('update:selectedItem', -1)
}

onKeyStroke(['escape', 'Escape', 'ESC', 'Esc'], e => {
  closeDialog()
})

onKeyStroke(['ArrowLeft'], e => {
  e.preventDefault()
  if (props.selectedItem && props.selectedItem !== 0)
    emit('update:selectedItem', props.selectedItem - 1)
})

onKeyStroke(['ArrowRight'], e => {
  e.preventDefault()
  if (props.images && props.selectedItem! + 1 < props.images.length)
    emit('update:selectedItem', props.selectedItem! + 1)
})
</script>

<style>
.splide__container {
  box-sizing: border-box;
  position: relative;
}

.splide__list {
  backface-visibility: hidden;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

.splide.is-initialized:not(.is-active) .splide__list {
  display: block;
}

.splide__pagination {
  -ms-flex-align: center;
  align-items: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0;
  pointer-events: none;
}

.splide__pagination li {
  display: inline-block;
  line-height: 1;
  list-style-type: none;
  margin: 0;
  pointer-events: auto;
}

.splide:not(.is-overflow) .splide__pagination {
  display: none;
}

.splide__progress__bar {
  width: 0;
}

.splide {
  position: relative;
  visibility: hidden;
}

.splide.is-initialized,
.splide.is-rendered {
  visibility: visible;
}

.splide__slide {
  backface-visibility: hidden;
  box-sizing: border-box;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  list-style-type: none !important;
  margin: 0;
  position: relative;
}

.splide__slide img {
  vertical-align: bottom;
}

.splide__spinner {
  animation: splide-loading 1s linear infinite;
  border: 2px solid #999;
  border-left-color: transparent;
  border-radius: 50%;
  bottom: 0;
  contain: strict;
  display: inline-block;
  height: 20px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
}

.splide__sr {
  clip: rect(0 0 0 0);
  border: 0;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.splide__toggle.is-active .splide__toggle__play,
.splide__toggle__pause {
  display: none;
}

.splide__toggle.is-active .splide__toggle__pause {
  display: inline;
}

.splide__track {
  overflow: hidden;
  position: relative;
  z-index: 0;
}

@keyframes splide-loading {
  0% {
    transform: rotate(0);
  }

  to {
    transform: rotate(1turn);
  }
}

.splide__track--draggable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.splide__track--fade > .splide__list > .splide__slide {
  margin: 0 !important;
  opacity: 0;
  z-index: 0;
}

.splide__track--fade > .splide__list > .splide__slide.is-active {
  opacity: 1;
  z-index: 1;
}

.splide--rtl {
  direction: rtl;
}

.splide__track--ttb > .splide__list {
  display: block;
}

.splide__arrow {
  -ms-flex-align: center;
  align-items: center;
  background: #ccc;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: -ms-flexbox;
  display: flex;
  height: 2em;
  -ms-flex-pack: center;
  justify-content: center;
  opacity: 0.7;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2em;
  z-index: 1;
}

.splide__arrow svg {
  fill: #000;
  height: 1.2em;
  width: 1.2em;
}

.splide__arrow:hover:not(:disabled) {
  opacity: 0.9;
}

.splide__arrow:disabled {
  opacity: 0.3;
}

.splide__arrow:focus-visible {
  outline: 3px solid #0bf;
  outline-offset: 3px;
}

.splide__arrow--prev {
  left: 1em;
}

.splide__arrow--prev svg {
  transform: scaleX(-1);
}

.splide__arrow--next {
  right: 1em;
}

.splide.is-focus-in .splide__arrow:focus {
  outline: 3px solid #0bf;
  outline-offset: 3px;
}

.splide__pagination {
  bottom: 0.5em;
  left: 0;
  padding: 0 1em;
  position: absolute;
  right: 0;
  z-index: 1;
}

.splide__pagination__page {
  background: #ccc;
  border: 0;
  border-radius: 50%;
  display: inline-block;
  height: 8px;
  margin: 3px;
  opacity: 0.7;
  padding: 0;
  position: relative;
  transition: transform 0.2s linear;
  width: 8px;
}

.splide__pagination__page.is-active {
  background: #fff;
  transform: scale(1.4);
  z-index: 1;
}

.splide__pagination__page:hover {
  cursor: pointer;
  opacity: 0.9;
}

.splide__pagination__page:focus-visible {
  outline: 3px solid #0bf;
  outline-offset: 3px;
}

.splide.is-focus-in .splide__pagination__page:focus {
  outline: 3px solid #0bf;
  outline-offset: 3px;
}

.splide__progress__bar {
  background: #ccc;
  height: 3px;
}

.splide__slide {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.splide__slide:focus {
  outline: 0;
}

@supports (outline-offset: -3px) {
  .splide__slide:focus-visible {
    outline: 3px solid #0bf;
    outline-offset: -3px;
  }
}

@media screen and (-ms-high-contrast: none) {
  .splide__slide:focus-visible {
    border: 3px solid #0bf;
  }
}

@supports (outline-offset: -3px) {
  .splide.is-focus-in .splide__slide:focus {
    outline: 3px solid #0bf;
    outline-offset: -3px;
  }
}

@media screen and (-ms-high-contrast: none) {
  .splide.is-focus-in .splide__slide:focus {
    border: 3px solid #0bf;
  }

  .splide.is-focus-in .splide__track > .splide__list > .splide__slide:focus {
    border-color: #0bf;
  }
}

.splide__toggle {
  cursor: pointer;
}

.splide__toggle:focus-visible {
  outline: 3px solid #0bf;
  outline-offset: 3px;
}

.splide.is-focus-in .splide__toggle:focus {
  outline: 3px solid #0bf;
  outline-offset: 3px;
}

.splide__track--nav > .splide__list > .splide__slide {
  border: 3px solid transparent;
  cursor: pointer;
}

.splide__track--nav > .splide__list > .splide__slide.is-active {
  border: 3px solid #000;
}

.splide__arrows--rtl .splide__arrow--prev {
  left: auto;
  right: 1em;
}

.splide__arrows--rtl .splide__arrow--prev svg {
  transform: scaleX(1);
}

.splide__arrows--rtl .splide__arrow--next {
  left: 1em;
  right: auto;
}

.splide__arrows--rtl .splide__arrow--next svg {
  transform: scaleX(-1);
}

.splide__arrows--ttb .splide__arrow {
  left: 50%;
  transform: translate(-50%);
}

.splide__arrows--ttb .splide__arrow--prev {
  top: 1em;
}

.splide__arrows--ttb .splide__arrow--prev svg {
  transform: rotate(-90deg);
}

.splide__arrows--ttb .splide__arrow--next {
  bottom: 1em;
  top: auto;
}

.splide__arrows--ttb .splide__arrow--next svg {
  transform: rotate(90deg);
}

.splide__pagination--ttb {
  bottom: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  left: auto;
  padding: 1em 0;
  right: 0.5em;
  top: 0;
}
</style>
