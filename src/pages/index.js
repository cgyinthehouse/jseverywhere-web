import React from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

// Route components
import Favorites from './favorites'
import Mynotes from './mynotes'
import Home from './home'
import NotePage from './note'
import SignUp from './signup'
import SignIn from './signin'
import NewNote from './new'
import EditNote from './edit'

// Layout component
import Layout from '../components/Layout'

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`

const PrivateRoute = ({ children }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  return data.isLoggedIn === true ? children : <Navigate to="/signin" />
}

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/mynotes"
            element={
              <PrivateRoute>
                <Mynotes />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/new"
            element={
              <PrivateRoute>
                <NewNote />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditNote />
              </PrivateRoute>
            }
          />
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default Pages
