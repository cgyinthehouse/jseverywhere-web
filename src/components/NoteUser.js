import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import DeleteNote from './DeleteNote'
import FavoriteNote from './FavoriteNote'

import { GET_ME } from '../gql/query'

const NoteUser = ({ note }) => {
  const { loading, error, data } = useQuery(GET_ME)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <>
      <FavoriteNote
        me={data.me}
        noteID={note.id}
        favoriteCount={note.favoriteCount}
      />
      <br />
      {data.me.id == note.author.id && (
        <>
          <Link to={`/edit/${note.id}`}>Edit</Link> <br />
          <DeleteNote id={note.id} /> <br />
        </>
      )}
    </>
  )
}

export default NoteUser
