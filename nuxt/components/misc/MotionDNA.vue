<template>
  <!-- bg-[#161616] -->
  <div
    :style="{
      '--strand-color-alt': props.color || '#059669'
    }"
    class="relative flex  items-center justify-center "
  >
    <div class="dna" style="--strands: 16">
      <div class="strand" style="--s: 0"></div>
      <div class="strand" style="--s: 1"></div>
      <div class="strand" style="--s: 2"></div>
      <div class="strand" style="--s: 3"></div>
      <div class="strand" style="--s: 4"></div>
      <div class="strand" style="--s: 5"></div>
      <div class="strand" style="--s: 6"></div>
      <div class="strand" style="--s: 7"></div>
      <div class="strand" style="--s: 8"></div>
      <div class="strand" style="--s: 9"></div>
      <div class="strand" style="--s: 10"></div>
      <div class="strand" style="--s: 11"></div>
      <div class="strand" style="--s: 12"></div>
      <div class="strand" style="--s: 13"></div>
      <div class="strand" style="--s: 14"></div>
      <div class="strand" style="--s: 15"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String
  }
})
</script>
<style lang="scss">
:root {
  //   --background-color: #161616;
  --strand-color: #e6e6e6;
  // --strand-color-alt: #059669;
  --strand-width: 2.5rem;
  --strand-height: 0.5rem;
  --strand-line: 0.125rem;
  --strand-ball: calc(var(--strand-height) * 0.75);
  --animation-duration: 0.5s;
  --animation-delay: calc(
    var(--animation-duration) * -0.375
  ); // make this negative so the offset operates immediately
}

.dna {
  width: var(--strand-width);
}

.strand {
  position: relative;
  width: var(--strand-width);
  height: var(--strand-height);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  &:nth-child(3n) {
    // Add a bit of variation
    --strand-color: var(--strand-color-alt);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: var(--strand-color);
    animation-duration: calc(var(--animation-duration));
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
    animation-delay: calc(var(--s) * var(--animation-delay));
  }

  &::before {
    left: calc(var(--strand-ball) / 2);
    top: calc((var(--strand-height) - var(--strand-line)) / 2);
    width: calc(var(--strand-width) - var(--strand-ball));
    height: var(--strand-line);
    animation-name: line;
    will-change: transform;
  }

  &::after {
    top: calc((var(--strand-height) - var(--strand-ball)) / 2);
    width: var(--strand-ball);
    height: var(--strand-ball);
    border-radius: 50%;
    box-shadow: calc(var(--strand-width) - var(--strand-ball)) 0 0
      var(--strand-color);
    animation-name: ball;
    will-change: transform, box-shadow;
  }
}

@keyframes line {
  to {
    transform: scaleX(0);
  }
}

@keyframes ball {
  to {
    transform: translateX(calc((var(--strand-width) - var(--strand-ball)) / 2));
    box-shadow: 0 0 0 var(--strand-color);
  }
}
</style>
