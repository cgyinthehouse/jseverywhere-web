import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'

import styled from 'styled-components'
import logo from '../img/logo.svg'
import ButtonAsLink from './ButtonAsLink'

const UserState = styled.div`
  margin-left: auto;
`
const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`
const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`

const Header = () => {
  const { data, client } = useQuery(IS_LOGGED_IN)
  const redirect = useNavigate()
  return (
    <HeaderBar>
      <img src={logo} alt="notedly logo" height="40"></img>
      <LogoText>Notedly</LogoText>
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={async () => {
              localStorage.removeItem('token')
              // clear all stored local cache
              client.resetStore()
              // write the login state to false into local cache
              client.writeQuery({
                query: gql`
                  query IsLoggedIn {
                    isLoggedIn
                  }
                `,
                data: {
                  isLoggedIn: false
                }
              })
              redirect('/')
            }}
          >
            Log Out
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  )
}

export default Header
