import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Route components
import Favorites from './favorites'
import Mynotes from './mynotes'
import Home from './home'

// Layout component
import Layout from '../components/Layout'

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/mynotes" element={<Mynotes />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default Pages
