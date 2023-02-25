//useComp.js

//import ref function to define reactive properties
import { useContext, computed } from '@nuxtjs/composition-api'
export default function useTabIndex() {
  const ctx = useContext()
  const index = computed(() =>
    typeof ctx.route.value.query.tabIndex === 'string'
      ? +ctx.route.value.query.tabIndex
      : 0
  )

  return {
    tabIndex: index,
  }
}
