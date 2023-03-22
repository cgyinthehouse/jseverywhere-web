import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import ButtonAsLink from '../components/ButtonAsLink'

import { DELETE_NOTE } from '../gql/mutation'
import { GET_MY_NOTES, GET_NOTES } from '../gql/query'

const DeleteNote = ({ id }) => {
  const redirect = useNavigate()
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: { id },
    // refetch notes after the note has been deleted
    refetchQueries: [{ query: GET_NOTES, GET_MY_NOTES }],
    onCompleted: () => redirect('/mynotes')
  })

  return (
    <ButtonAsLink
      onClick={() => {
        if (confirm('Are you sure to delete this note?')) {
          deleteNote()
        }
      }}
    >
      Delete Note
    </ButtonAsLink>
  )
}

export default DeleteNote
