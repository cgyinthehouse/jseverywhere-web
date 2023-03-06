import React from 'react'
import { useParams } from 'react-router-dom'
// import our GraphQL dependencies
import { useQuery, gql } from '@apollo/client'

// import the Note component
import Note from '../components/Note'

// our note query, which accepts an ID variable
const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`

const NotePage = () => {
  // store the id found in the url as a variable
  const { id } = useParams()

  // query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! Note not found</p>

  return <Note note={data.note} />
}

export default NotePage
