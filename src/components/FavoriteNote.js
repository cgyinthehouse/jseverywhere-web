import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import ButtonAsLink from './ButtonAsLink'
import { TOGGLE_FAVORITE } from '../gql/mutation'
import { GET_MY_FAVORITES } from '../gql/query'

const FavoriteNote = ({ noteID, me, favoriteCount }) => {
  const [count, setCount] = useState(favoriteCount)
  // Note:
  // the way GET_ME query defines seems like it returns an user id and an array of note id(favorites),
  // it is actually not returning note ids but the objects contains an id property and a __typename property,
  // so the argument of the filter function has to passed an object
  // which we defined as note here (we can't pass just the note id)
  // So this means that we can't use the 'includes' method
  const [favorited, setFavorited] = useState(
    me.favorites.filter((note) => note.id === noteID).length > 0
  )
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: noteID },
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  })
  return (
    <>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            setFavorited(false)
            setCount(count - 1)
            toggleFavorite()
          }}
        >
          Remove Favorite
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            setFavorited(true)
            setCount(count + 1)
            toggleFavorite()
          }}
        >
          Add Favorite
        </ButtonAsLink>
      )}
      <br /> likes : {count}
    </>
  )
}

export default FavoriteNote
