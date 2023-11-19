import { useEffect, useState } from 'react'
import { Wrapper } from './components/Wrapper'
import { FomrNote } from './components/FomrNote'
import { GridNotes } from './components/GridNotes'
import axios from 'axios'
import { toast } from 'react-toastify'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getUser()
  }, [notes])

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/notes')
      setNotes(response.data)
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <Wrapper>
      <FomrNote />
      <GridNotes notes={notes} />
    </Wrapper>
  )
}

export default App
