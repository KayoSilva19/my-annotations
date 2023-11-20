import { PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'

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
    const urgency = e.target.value

    if (urgency === 'Todos') return setFilterNote([...notes])

    const filteredArray = notes.filter((filter) => filter.urgency === urgency)
    setFilterNote(filteredArray)
  }

  return (
    <>
      <div className="mt-16 flex flex-col gap-4 min-[768px]:flex-row  min-[768px]:justify-between min-[768px]:items-center  ">
        <h1 className="font-medium text-[1.3rem] bg-red-400 w-fit text-zinc-900 drop-shadow-md">
          Anotações
        </h1>
        <div className="flex flex-wrap gap-4">
          <button
            value="Urgente"
            onClick={onFilter}
            className={`${styleButtonDefault} bg-red-400 hover:bg-red-500 `}
          >
            Urgente
          </button>
          <button
            value="Intermediário"
            onClick={onFilter}
            className={`${styleButtonDefault} bg-yellow-400 hover:bg-yellow-500`}
          >
            Intermediário
          </button>
          <button
            value="Normal"
            onClick={onFilter}
            className={`${styleButtonDefault} bg-emerald-400 hover:bg-emerald-500`}
          >
            Normal
          </button>
          <button
            value="Todos"
            onClick={onFilter}
            className={`${styleButtonDefault} bg-blue-400 hover:bg-blue-500`}
          >
            Todos
          </button>
        </div>
      </div>
      <ul className="flex flex-col gap-4 mt-8 mb-10">
        {filterNote.map((note) => {
          return (
            <li className={styleLi} key={note.id}>
              <div className="flex flex-col gap-2 ">
                <span>
                  <strong className="text-[14px] font-medium">Nome:</strong>
                  {note.nome}
                </span>
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
