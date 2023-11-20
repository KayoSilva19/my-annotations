import { useEffect, useState } from 'react'
import { Wrapper } from './components/Wrapper'
import { FomrNote } from './components/FomrNote'
import { GridNotes } from './components/GridNotes'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [notes, setNotes] = useState([])
  const [onEdit, setOnEdit] = useState(null)
  useEffect(() => {
    getUser()
  }, [setNotes])

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/notes')
      setNotes(response.data)
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <>
      <Wrapper>
        <div className="max-w-7xl">
          <FomrNote getUser={getUser} setOnEdit={setOnEdit} onEdit={onEdit} />
          {notes.length === 0 ? (
            <GridNotes
              notes={notes}
              setNotes={setNotes}
              setOnEdit={setOnEdit}
            />
          ) : (
            ''
          )}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
    </>
  )
}

export default App
