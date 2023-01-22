<template>    
    <CategoryWithCategoryPage :id="id" />
</template>

<script lang="ts" setup>
import { useRoute , computed, useContext } from '@nuxtjs/composition-api';
import CategoryWithCategoryPage from '~/components/page/CategoryWithCategoryPage.vue';
const route = useRoute()
const ctx = useContext()
const q = route.value.query as {fa:string , en : string};

const id = computed(() => {
    return ctx.i18n.locale === 'fa' ? q.fa : q.en
})
</script>