import React from 'react'
import GlobalStyle from './components/GlobalStyle'
import { createRoot } from 'react-dom/client'
import Pages from './pages'

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <Pages />
    </div>
  )
}

const root = createRoot(document.querySelector('#root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
