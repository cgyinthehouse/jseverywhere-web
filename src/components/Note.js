import React from 'react'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import styled from 'styled-components'

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
  format(note.createdAt, 'MMM Do YYYY')
  return (
    <article>
      <img
        src={note.author.avatar}
        alt={`${note.author.username} avatar`}
        height="50px"
      />
      {`
            ${note.author.username} ${note.createdAt} ${note.favoriteCount}
          `}
      <ReactMarkdown>{note.content}</ReactMarkdown>
    </article>
  )
}

export default Note
