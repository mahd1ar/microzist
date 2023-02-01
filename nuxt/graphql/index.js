import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default (ctx) => {
  const ssrMiddleware = setContext((_, { headers }) => {
    if (process.client) return headers
    return {
      headers,
    }
  })
  const httpLink = new HttpLink({
    // TODO get from .env
    uri: 'http://localhost:3030/api/graphql', //process.env.nuxtApiUrl,
    credentials: 'omit',
  })
  const link = from([ssrMiddleware, httpLink])
  const cache = new InMemoryCache()

  return {
    link,
    cache,
    defaultHttpLink: false,
  }
}