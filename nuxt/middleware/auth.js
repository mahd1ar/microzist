import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import fa from '~/lang/fa'

export default defineNuxtMiddleware(ctx => {
    // do stuff
    if (ctx.store.getters.isLoggedIn === false) {
        ctx.app.router.push('/login')
    }

})