import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { GET_NOTES, GET_MY_NOTES } from '../gql/query'

import NoteForm from '../components/NoteForm'

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`
const NewNote = () => {
  const redirect = useNavigate()
  useEffect(() => {
    document.title = 'New Note -- Notedly'
  })

  const [new_note, { loading, error }] = useMutation(NEW_NOTE, {
    // becasue apollo client automatically cache ours queries
    // means that if we update, then it will still look up data in the cache
    // which is not been updated yet, we can update our cache using "refetchQueries".
    // this will refetch the queries after mutations occurs
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: (data) => {
      redirect(`/note/${data.newNote.id}`)
    }
  })
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={new_note} />
    </>
  )
}

export default NewNote
