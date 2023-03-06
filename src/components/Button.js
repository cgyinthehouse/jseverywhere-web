import React from 'react'
import styled from 'styled-components'

export const Button = styled.button`
  display: block;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
  background-color: #0077cc;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    background-color: #005fa3;
  }
`

export const LoadMoreButton = ({ fetchMore, data }) => {
  const onClick = () => {
    // https://www.apollographql.com/docs/react/data/queries/#fetchmore
    fetchMore({
      variables: { cursor: data.noteFeed.cursor },
      updateQuery(previousResult, { fetchMoreResult }) {
        return {
          noteFeed: {
            cursor: fetchMoreResult.noteFeed.cursor,
            hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
            notes: [
              ...previousResult.noteFeed.notes,
              ...fetchMoreResult.noteFeed.notes
            ],
            __typename: 'noteFeed'
          }
        }
      }
    })
  }
  return <Button onClick={onClick}>Load More</Button>
}
