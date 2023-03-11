import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import UserForm from '../components/UserForm'

// user sign up gql query
const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`

const SignUp = (props) => {
  useEffect(() => {
    document.title = 'Sign Up -- Notedly'
  })

  const redirect = useNavigate()

  // with this hook we can directly access the apollo client instance
  const client = useApolloClient()

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: async (data) => {
      // save token
      localStorage.setItem('token', data.signUp)
      // update the cache
      client.writeQuery({
        query: gql`
          query IsLoggedIn {
            isLoggedIn
          }
        `,
        data: { isLoggedIn: true }
      })
      redirect('/')
    }
  })

  return (
    <>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error crating an account!</p>}
    </>
  )
}

export default SignUp
