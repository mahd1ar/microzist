<template>
  <section dir="ltr" class="">
    <div class="container " >
        <div class="grid grid-cols-2 gap-2" >
            <div v-for="(card ) in cards" :key="card.id"  >
                <GeneralBtn :icon="card.linkIcon">{{ card.linkLabel }}</GeneralBtn>
                <hr class="my-4 ml-40 border " >
                <p class="text-gray-600" > {{ card.text }} </p>
            </div>
        </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PropType } from '@nuxtjs/composition-api'
import GeneralBtn from './GeneralBtn.vue';

type GeneralBtnProps = InstanceType<typeof GeneralBtn>["$props"];

const { cards = [] } = defineProps({
  cards: {
    type: Array as PropType<
      {
        text: string
        id: string
        link : string
        linkLabel : string
        linkIcon : GeneralBtnProps['icon']
      }[]
    >,
  },
})
</script>
