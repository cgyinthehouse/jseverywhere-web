import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;

  @media (max-width: 700px) {
    padding-top: 64px;
  }

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
  }
`
const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;

  a {
    text-decoratin: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }
  a:visited {
    #color: #333;
  }
  a:hover,
  a:focus {
    color: #0077cc;
  }
`
const activeStyle = {
  fontWeight: 'bold',
  textDecoration: 'underline'
}
const Navigation = () => {
  const style = ({ isActive }) => {
    return isActive ? activeStyle : { textDecoration: 'none' }
  }
  return (
    <Nav>
      <NavList>
        <li>
          <NavLink to="/" style={style}>
            <span aria-hidden="true" role="img">
              🏠
            </span>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="mynotes" style={style}>
            <span aria-hidden="true" role="img">
              📓
            </span>
            My Notes
          </NavLink>
        </li>
        <li>
          <NavLink to="favorites" style={style}>
            <span aria-hidden="true" role="img">
              🌟
            </span>
            Favorites
          </NavLink>
        </li>
      </NavList>
    </Nav>
  )
}

export default Navigation
