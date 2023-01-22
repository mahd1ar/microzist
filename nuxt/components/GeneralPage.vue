<template>
  <div>
    <div class="w-full">
      <img :src="src" alt="" />
    </div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { imgSrc: src = 'https://dummyimage.com/600x400/594ae0/fff' } =
  defineProps({
    imgSrc: {
      type: String,
    },
  })
</script>
