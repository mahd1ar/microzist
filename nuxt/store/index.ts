import { GetterTree, ActionTree, MutationTree } from 'vuex'
import AUTHITEM from '@/apollo/q/authitem.gql'
import { AuthitemQuery } from '@/types/types'
import { Context, NuxtAppOptions } from '@nuxt/types'
type NavItem = {
  label: string
  link: string
  id: string
  lang: string
}

export const state = () => ({
  navItem: [] as NavItem[],
  showNav: true,
  showSearch: false,
  user: {
    id: '',
    name: '',
    lastName: '',
    email: '',
  },
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  navItems: (state) => state.navItem,
  showNav: (state) => state.showNav,
  showSearch: (state) => state.showSearch,
  isLoggedIn: (state) => !!state.user.id,
  user: (state) => state.user,
}

export const mutations: MutationTree<RootState> = {
  ADD_NAV: (state, newNav: NavItem[]) => {
    newNav.forEach((i) => state.navItem.push(i))
  },
  TOGGLE_NAV: (state, newNav: boolean) => {
    state.showNav = newNav
  },
  TOGGLE_SEARCH: (state, newNav: boolean) => {
    state.showSearch = newNav
  },
  TOGGLE_LOGGIN: (state, user: RootState['user'] | false) => {
    if (user) {
      state.user.id = user.id
      state.user.name = user.name
      state.user.lastName = user.lastName
      state.user.email = user.email
    } else {
      state.user.id = ''
    }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }, ctx: Context) {
    
    if (ctx.route.path !== '/auth-item')
      ctx.redirect('/auth-item?go=' + encodeURIComponent(ctx.route.path))
    // const { data } = await ctx.app.$axios.post('/auth-item', {
    //   withCredentials: true,
    // })
    // console.log({ data })
    // if (data) {
    //   // user is logged in
    //   const user: RootState['user'] = {
    //     id: data.id,
    //     email: data.email || '',
    //     name: data.name || '',
    //     lastName: data.lastName || '',
    //   }
    //   await dispatch('toggleUser', user)
    // } else {
    //   await dispatch('toggleUser', false)
    // }
    // const data = res.data as MainNavQuery
    // const navItem: NavItem[] = data
    //   .menus!.edges!.map((e) =>
    //     e!.node!.menuItems!.edges!.map((ed) => ({
    //       label: ed!.node!.label || '',
    //       id: ed!.node!.id || '',
    //       lang: e!.node!.name!.search(/-en$/) > -1 ? 'en' : 'fa',
    //       link: ed!.node!.uri || '',
    //     }))
    //   )
    //   .flat()
    // commit('ADD_NAV', navItem)
  },
  async addNav({ commit }, newlang: NavItem[]) {
    commit('ADD_NAV', newlang)
  },
  async toggleNav({ commit }, newval: boolean) {
    commit('TOGGLE_NAV', newval)
  },
  async toggleSearch({ commit }, newval: boolean) {
    commit('TOGGLE_SEARCH', newval)
  },
  async toggleUser({ commit }, user: RootState['user'] | false) {
    commit('TOGGLE_LOGGIN', user)
  },
}
