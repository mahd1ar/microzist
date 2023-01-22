<template>
  <div class="content">
    <div v-if="isProtected === false || isLoggedIn">
      <div v-html="purgedContent || html"></div>
    </div>
    <div v-else>
      <span
        class="flex-center flex-col gap-4 rounded border border-red-100 bg-red-50 p-2 text-sm text-red-500"
      >
        <div class="flex gap-2">
          <span> محتوا محافظت شده </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="h-5 w-5"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <g fill="currentColor">
              <path
                d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856a.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533c.12.057.218.095.293.118a.55.55 0 0 0 .101.025a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118c.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453a7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625a11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43A62.456 62.456 0 0 1 5.072.56z"
              />
              <path
                d="M7.001 11a1 1 0 1 1 2 0a1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"
              />
            </g>
          </svg>
        </div>
        <div>
          <nuxt-link class="underline" :to="'/login?redirect=' + $route.path">
            برای مشاهده ی این مطلب وارد شوید
          </nuxt-link>
        </div>
        <!-- TODO nuxt-link to=login -->
      </span>
    </div>

    <div
      v-if="imgs.length > 0 && includeGallery"
      class="w-full grid grid-cols-2 sm:grid-cols-3"
    >
      <div
        v-for="(img, index) in imgs"
        :key="index"
        class="w-full h-full"
        @click="openImage(index)"
      >
        <img
          class="hover:scale-110 w-full h-full object-cover transition-all will-change-transform transform cursor-pointer"
          loading="lazy"
          :src="img"
        />
      </div>
    </div>

    <image-viewer
      v-if="includeGallery"
      :img-index="selectedImage"
      :imgs="imgs"
      :open.sync="isPlayerOpen"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapGetters } from 'vuex'
import ImageViewer from './ImageViewer.vue'

export default Vue.extend({
  name: 'ContentField',
  components: { ImageViewer },
  props: {
    html: {
      type: String,
      default: '',
    },

    removeTags: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    includeGallery: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      isPlayerOpen: false,
      selectedImage: -1,
      imgs: [] as string[],
      isProtected: false,
      purgedContent: '',
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'authentication/isLoggedIn',
    }),
  },
  watch: {
    html(nval: string) {
      if (nval) this.purge()
    },
  },
  created() {
    // if (this.removeTags.length === 0) return
    if (this.html !== '') this.purge()
  },
  mounted() {
    this.isProtected = this.html.search('Login to read more') !== -1

    const div = document.createElement('div')
    div.innerHTML = this.html
  },

  methods: {
    openImage(index: number) {
      this.selectedImage = index
      this.isPlayerOpen = true
    },
    // closePlayer(){

    //   this.selectedImage = -1
    //   this.isPlayerOpen = false
    // },
    purge() {
      let purgedContent = this.html

      this.removeTags.forEach((tagName) => {
        const reg = new RegExp(`<${tagName}.*</${tagName}>`, 'g')
        purgedContent = purgedContent.replace(reg, '')
      })

      if (!purgedContent) purgedContent = ' '

      // strip images
      this.imgs.splice(0, this.imgs.length)
      if (this.includeGallery)
        purgedContent.match(/<img.*?src="(.*?)".*?>/gm)?.forEach((imagetag) => {
          try {
            // console.log(imagetag)
            const [, src] = imagetag.match(/src="(.*?)"/)!
            purgedContent = purgedContent.replace(imagetag, '')

            this.imgs.push(src)
          } catch (error) {
            console.error(error)
          }
        })

      this.purgedContent = purgedContent
    },
  },
})
</script>

<style lang="scss">
/* WP */
.content {
  direction: rtl;
  * {
    @apply my-3;
  }
  p {
    @apply text-lg leading-8;
  }

  a {
    @apply underline underline-offset-1;
  }
  hr {
    @apply my-6;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply my-6;
  }
  h1 {
    @apply text-4xl md:text-5xl;
  }

  h2 {
    @apply text-3xl md:text-4xl;
  }

  h3 {
    @apply text-2xl md:text-3xl;
  }

  h4 {
    @apply text-xl md:text-2xl;
  }

  h5 {
    @apply text-lg md:text-xl;
  }

  h6 {
    @apply text-base md:text-lg;
  }
}
// .content .wp-block-columns {
//   @apply flex flex-col sm:flex-row;
// }
.wp-block-columns {
  display: flex;
  margin-bottom: 1.75em;
  box-sizing: border-box;
  flex-wrap: wrap !important;
  align-items: normal !important;
}
@media (min-width: 782px) {
  .wp-block-columns {
    flex-wrap: nowrap !important;
  }
}
.wp-block-columns.are-vertically-aligned-top {
  align-items: flex-start;
}
.wp-block-columns.are-vertically-aligned-center {
  align-items: center;
}
.wp-block-columns.are-vertically-aligned-bottom {
  align-items: flex-end;
}
@media (max-width: 781px) {
  .wp-block-columns:not(.is-not-stacked-on-mobile) > .wp-block-column {
    flex-basis: 100% !important;
  }
}
@media (min-width: 782px) {
  .wp-block-columns:not(.is-not-stacked-on-mobile) > .wp-block-column {
    flex-basis: 0;
    flex-grow: 1;
  }
  .wp-block-columns:not(.is-not-stacked-on-mobile)
    > .wp-block-column[style*='flex-basis'] {
    flex-grow: 0;
  }
}
.wp-block-columns.is-not-stacked-on-mobile {
  flex-wrap: nowrap !important;
}
.wp-block-columns.is-not-stacked-on-mobile > .wp-block-column {
  flex-basis: 0;
  flex-grow: 1;
}
.wp-block-columns.is-not-stacked-on-mobile
  > .wp-block-column[style*='flex-basis'] {
  flex-grow: 0;
}
:where(.wp-block-columns.has-background) {
  padding: 1.25em 2.375em;
}
.wp-block-column {
  flex-grow: 1;
  min-width: 0;
  word-break: break-word;
  overflow-wrap: break-word;
}
.wp-block-column.is-vertically-aligned-top {
  align-self: flex-start;
}
.wp-block-column.is-vertically-aligned-center {
  align-self: center;
}
.wp-block-column.is-vertically-aligned-bottom {
  align-self: flex-end;
}
.wp-block-column.is-vertically-aligned-bottom,
.wp-block-column.is-vertically-aligned-center,
.wp-block-column.is-vertically-aligned-top {
  width: 100%;
}

.wp-block-separator {
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.wp-block-separator.is-style-dots {
  background: none !important;
  border: none;
  text-align: center;
  line-height: 1;
  height: auto;
}
.wp-block-separator.is-style-dots:before {
  content: '···';
  color: currentColor;
  font-size: 1.5em;
  letter-spacing: 2em;
  padding-left: 2em;
  font-family: serif;
}
.wp-block-separator.has-css-opacity {
  opacity: 0.4;
}
.wp-block-separator {
  border: none;
  border-bottom: 2px solid;
  margin-right: auto;
  margin-left: auto;
}
.wp-block-separator.has-alpha-channel-opacity {
  opacity: 1;
}
.wp-block-separator:not(.is-style-wide):not(.is-style-dots) {
  width: 100px;
}
.wp-block-separator.has-background:not(.is-style-dots) {
  border-bottom: none;
  height: 1px;
}
.wp-block-separator.has-background:not(.is-style-wide):not(.is-style-dots) {
  height: 2px;
}

.content .wp-block-column {
  flex-grow: 1;
}

/**
  table
  */
.wp-block-table {
  margin: 0 0 1em;
  overflow-x: auto;
}
.wp-block-table table {
  border-collapse: collapse;
  width: 100%;
}
.wp-block-table .has-fixed-layout {
  table-layout: fixed;
  width: 100%;
}
.wp-block-table .has-fixed-layout td,
.wp-block-table .has-fixed-layout th {
  word-break: break-word;
}
.wp-block-table.aligncenter,
.wp-block-table.alignleft,
.wp-block-table.alignright {
  display: table;
  width: auto;
}
.wp-block-table.aligncenter td,
.wp-block-table.aligncenter th,
.wp-block-table.alignleft td,
.wp-block-table.alignleft th,
.wp-block-table.alignright td,
.wp-block-table.alignright th {
  word-break: break-word;
}
.wp-block-table .has-subtle-light-gray-background-color {
  background-color: #f3f4f5;
}
.wp-block-table .has-subtle-pale-green-background-color {
  background-color: #e9fbe5;
}
.wp-block-table .has-subtle-pale-blue-background-color {
  background-color: #e7f5fe;
}
.wp-block-table .has-subtle-pale-pink-background-color {
  background-color: #fcf0ef;
}
.wp-block-table.is-style-stripes {
  border-spacing: 0;
  border-collapse: inherit;
  background-color: transparent;
  border-bottom: 1px solid #f0f0f0;
}
.wp-block-table.is-style-stripes tbody tr:nth-child(odd) {
  background-color: #f0f0f0;
}
.wp-block-table.is-style-stripes.has-subtle-light-gray-background-color
  tbody
  tr:nth-child(odd) {
  background-color: #f3f4f5;
}
.wp-block-table.is-style-stripes.has-subtle-pale-green-background-color
  tbody
  tr:nth-child(odd) {
  background-color: #e9fbe5;
}
.wp-block-table.is-style-stripes.has-subtle-pale-blue-background-color
  tbody
  tr:nth-child(odd) {
  background-color: #e7f5fe;
}
.wp-block-table.is-style-stripes.has-subtle-pale-pink-background-color
  tbody
  tr:nth-child(odd) {
  background-color: #fcf0ef;
}
.wp-block-table.is-style-stripes td,
.wp-block-table.is-style-stripes th {
  border-color: transparent;
}
.wp-block-table .has-border-color > *,
.wp-block-table .has-border-color td,
.wp-block-table .has-border-color th,
.wp-block-table .has-border-color tr {
  border-color: inherit;
}
.wp-block-table table[style*='border-style'] > *,
.wp-block-table table[style*='border-style'] td,
.wp-block-table table[style*='border-style'] th,
.wp-block-table table[style*='border-style'] tr {
  border-style: inherit;
}
.wp-block-table table[style*='border-width'] > *,
.wp-block-table table[style*='border-width'] td,
.wp-block-table table[style*='border-width'] th,
.wp-block-table table[style*='border-width'] tr {
  border-width: inherit;
  border-style: inherit;
}
.wp-block-table thead {
  border-bottom: 3px solid;
}
.wp-block-table tfoot {
  border-top: 3px solid;
}
.wp-block-table td,
.wp-block-table th {
  padding: 0.5em;
  border: 1px solid;
  word-break: normal;
}
.wp-block-table figcaption {
  color: #555;
  font-size: 13px;
  text-align: center;
}
.is-dark-theme .wp-block-table figcaption {
  color: hsla(0, 0%, 100%, 0.65);
}

.content img {
  @apply p-2;
}
</style>
