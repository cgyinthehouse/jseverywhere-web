import React from 'react'
import ReactMarkdown from 'react-markdown'
import { formatInTimeZone } from 'date-fns-tz'
import styled from 'styled-components'

import { useQuery } from '@apollo/client'
import NoteUser from './NoteUser'

import { IS_LOGGED_IN } from '../gql/query'

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: flex-start;
  }
`
const MetaInfo = styled.div`
  padding-right: 1em;
`
const UserActions = styled.div`
  margin-left: auto;
`

const Note = ({ note }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {formatInTimeZone(
            new Date(note.createdAt),
            'Asia/Taipei',
            'MMM do yyyy'
          )}
        </MetaInfo>
        {/* only show author the edit link when they are logged in*/}
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <ReactMarkdown>{note.content}</ReactMarkdown>
    </StyledNote>
  )
}

export default Note
