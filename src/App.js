import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import GlobalStyle from './components/GlobalStyle'
import { createRoot } from 'react-dom/client'
import Pages from './pages'

const uri = process.env.API_URI
const cache = new InMemoryCache()
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true
})
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
