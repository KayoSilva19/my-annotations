import { PencilSimpleLine, Siren, Trash } from '@phosphor-icons/react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { GridFilter } from './GridFilter'

export function GridNotes({ notes, setNotes, setOnEdit }) {
  const styleLi =
    'bg-zinc-100 p-4 rounded flex justify-between items-center text-zinc-900 relative hover:bg-white text-colors cursor-pointer drop-shadow'

  const styleButtonDefault =
    'py-2 px-4 rounded font-medium text-white transition-colors'

  function colorStatus(status, pluss) {
    if (status === 'Urgente' && pluss === '+') {
      return 'bg-red-500'
    } else if (status === 'Urgente') {
      return 'bg-red-400'
    }
    if (status === 'Intermediário' && pluss === '+') {
      return 'bg-yellow-500'
    } else if (status === 'Intermediário') {
      return 'bg-yellow-400'
    }
    if (status === 'Normal' && pluss === '+') {
      return 'bg-emerald-500'
    } else if (status === 'Normal') {
      return 'bg-emerald-400'
    }
  }

  const [filterNote, setFilterNote] = useState([...notes])
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    setFilterNote([...notes])
    setIsEmpty(false)
  }, [notes])

  function handleOnEdit(item) {
    setOnEdit(item)
  }

  async function onDelete(id) {
    axios
      .delete(`http://localhost:8000/notes/${id}`)
      .then(({ data }) => {
        const newArrayNote = notes.filter((mapId) => mapId.id !== id)
        setNotes(newArrayNote)
        toast.success(data)
      })
      .catch(({ data }) => toast.error(data))
    setOnEdit(null)
  }

  function onFilter(e) {
    setIsEmpty(false)
    const urgency = e.target.value

    if (urgency === 'Todos') return setFilterNote([...notes])

    const filteredArray = notes.filter((filter) => filter.urgency === urgency)

    setFilterNote(filteredArray)
    if (filteredArray.length === 0) return setIsEmpty(true)
  }

  return (
    <>
      <GridFilter onFilter={onFilter} />
      <ul className="flex flex-col gap-4 mt-8 mb-10">
        {isEmpty && (
          <li className={styleLi}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Siren size={32} className="text-red-500" />
              <span className="text-[1.1rem]">
                Você não tem tarefas com este status!
              </span>
            </div>
          </li>
        )}
        {filterNote.map((note) => {
          return (
            <li className={styleLi} key={note.id}>
              <div className="flex flex-col gap-2 ">
                <div className="flex gap-2 flex-wrap">
                  <span>
                    <strong className="text-[14px] font-medium">Nome:</strong>
                    {note.nome}
                  </span>

                  <span>
                    <strong className="text-[14px] font-medium">Tipo:</strong>
                    {note.type}
                  </span>
                </div>
                <span>{note.annotation}</span>
              </div>
              <div className="flex gap-4">
                <span className="absolute top-[-.5rem] right-0 flex h-4 w-4">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorStatus(
                      note.urgency,
                    )}`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-4 w-4 ${colorStatus(
                      note.urgency,
                      '+',
                    )}`}
                  ></span>
                </span>
                <button
                  onClick={() => handleOnEdit(note)}
                  className="bg-emerald-500 p-2 rounded text-white hover:scale-110 hover:bg-emerald-600  trasnsition-all duration-150"
                >
                  <PencilSimpleLine size={24} />
                </button>
                <button
                  onClick={() => onDelete(note.id)}
                  className="bg-red-500 p-2 rounded text-white hover:scale-110 hover:bg-red-600  trasnsition-all duration-150"
                >
                  <Trash size={24} />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
