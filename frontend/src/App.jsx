import { useState } from 'react'
import { Wrapper } from './components/Wrapper'
import { FomrNote } from './components/FomrNote'
import { GridNotes } from './components/GridNotes'

function App() {
  return (
    <Wrapper>
      <FomrNote />
      <GridNotes />
    </Wrapper>
  )
}

export default App
