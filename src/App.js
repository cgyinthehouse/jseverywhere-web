import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import GlobalStyle from './components/GlobalStyle'
import Pages from './pages'

const uri = process.env.API_URI
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache()

// check if user has the jwt then pass the header to the context
// https://www.apollographql.com/docs/react/api/link/apollo-link-context
const authLink = setContext((_, { headers }) => {
  return {
    headers: { ...headers, authorization: localStorage.getItem('token') || '' }
  }
})

// create an apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
})

const writeLoginCache = () => {
  // then write login state to the local cache (happens when app first loaded)
  cache.writeQuery({
    query: gql`
      query IsLoggedIn {
        isLoggedIn
      }
    `,
    data: {
      // 雙驚歎號：反轉再反轉，意思是把falsy或truthy value 轉成單純的boolean
      isLoggedIn: !!localStorage.getItem('token') // check if local has the token
    }
  })
}
writeLoginCache()

// after reset the cache, set the login state again as like the initial one
client.onResetStore(() => writeLoginCache())

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}

const root = createRoot(document.querySelector('#root'))
root.render(<App />)
