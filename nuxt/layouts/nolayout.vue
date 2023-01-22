<template>

<div class="min-h-screen w-full flex flex-col" >

  <Nuxt />
</div>
  
</template>

<script >
  export default {
    layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  }
  }

</script>

<style>
  .layout-enter-active,
.layout-leave-active {
  transition: all 0.5s;
}
.layout-enter{

  transform: translateX(-100%);
}
.layout-leave-active {
  transform: translateX(100%);
}

</style>