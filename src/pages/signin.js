import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApolloClient, useMutation, gql } from '@apollo/client'
import UserForm from '../components/UserForm'

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`
const SignIn = () => {
  useEffect(() => {
    document.title = 'Sign In -- Notedly'
  })
  const client = useApolloClient()
  const redirect = useNavigate()

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: async (data) => {
      localStorage.setItem('token', data.signIn)
      client.writeQuery({
        query: gql`
          query IsLoggedIn {
            isLoggedIn
          }
        `,
        data: {
          isLoggedIn: true
        }
      })
      redirect('/')
    }
  })
  return (
    <>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in.</p>}
    </>
  )
}

export default SignIn
