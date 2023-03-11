import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import our GraphQL dependencies
import { useQuery, useMutation } from '@apollo/client'

// import the Note component
import NoteForm from '../components/NoteForm'

// our note query, which accepts an ID variable
import { GET_NOTE, GET_ME } from '../gql/query'
import { EDIT_NOTE } from '../gql/mutation'

const EditNote = () => {
  const { id } = useParams()
  const redirect = useNavigate()

  //  query note info
  const noteQuery = useQuery(GET_NOTE, { variables: { id } })
  // query the current user's info
  const meQuery = useQuery(GET_ME)

  // get the mutation function
  const [editnote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      redirect(`/note/${id}`)
    }
  })

  if (noteQuery.loading || meQuery.loading) return <p>Loading...</p>
  if (noteQuery.error) return <p>Error! Note not found</p>
  if (meQuery.error) return <p>Error: {`${meQuery.error}`}</p>

  const note = noteQuery.data.note
  const me = meQuery.data.me
  if (me.id !== note.author.id) {
    return <p>You do not have access to edit this note</p>
  }
  return <NoteForm content={note.content} action={editnote} />
}

export default EditNote
