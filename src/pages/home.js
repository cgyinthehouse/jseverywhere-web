import React from 'react'
import { useQuery, gql } from '@apollo/client'

import NoteFeed from '../components/NoteFeed'
import { LoadMoreButton } from '../components/Button'

const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
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
  }
`
const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  return (
    <>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <LoadMoreButton data={data} fetchMore={fetchMore}></LoadMoreButton>
      )}
    </>
  )
}

export default Home
