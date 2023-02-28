import React, { useEffect } from 'react'

const Mynotes = () => {
  useEffect(() => {
    document.title = 'My Notes -- Notedly'
  })
  return (
    <div>
      <h1>Notedly</h1>
      <p>These are my notes</p>
    </div>
  )
}

export default Mynotes
