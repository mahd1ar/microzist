<template>
  <div class="flex min-h-screen w-full flex-col">
    <Nuxt />
  </div>
</template>

<script>
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
  clip-path: circle(140% at 0 50%);
}

.layout-enter-active {
  transition: all 1.5s;
}
.layout-leave-active {
  transition: all 0.5s;
}
.layout-enter {
  opacity: 0;
  clip-path: circle(0% at 0 50%);
}
.layout-leave-active {
  opacity: 0;
  /* transform: translateX(100%); */
}

#__nuxt::before {
  content: 'ZistDialogue';
  position: absolute;
  color: rgb(243, 243, 243);
  top: 50%;
  left: 50%;
  font-size: 48px;
  letter-spacing: 12px;
  font-weight: 700;
  text-transform: uppercase;
  transform: translate(-50%, -50%);
  z-index: -1;
}
</style>
