import { PencilSimpleLine, Trash } from '@phosphor-icons/react'

export function GridNotes({ notes }) {
  const styleLi =
    'bg-zinc-100 p-4 rounded flex justify-between items-center text-zinc-900 relative hover:bg-white text-colors cursor-pointer drop-shadow '

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
  return (
    <>
      <h1 className="mt-16 font-medium text-[1.3rem] bg-red-400 w-fit text-zinc-900">
        Anotações
      </h1>
      <ul className="flex flex-col gap-4 mt-8">
        {notes.map((note) => {
          return (
            <li className={styleLi} key={note.id}>
              <div className="flex flex-col gap-2 ">
                <span>
                  <strong className="text-[14px] font-medium">Nome:</strong>{' '}
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
                <button className="bg-emerald-500 p-2 rounded text-white hover:scale-110 duration-150">
                  <PencilSimpleLine size={24} />
                </button>
                <button className="bg-red-500 p-2 rounded text-white hover:scale-110 duration-150">
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
