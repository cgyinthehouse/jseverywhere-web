import React from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import styled from 'styled-components'

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #b9c2c8;
`
const NoteFeed = ({ notes }) => {
  return (
    <div>
      {notes.map((note) => (
        <NoteWrapper key={note.id}>
          <Note note={note} />
          <Link to={`/note/${note.id}`}>Permalink</Link>
        </NoteWrapper>
      ))}
    </div>
  )
}

export default NoteFeed
