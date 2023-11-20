export function GridFilter({ onFilter }) {
  const styleButtonDefault =
    'py-2 px-4 rounded font-medium text-white transition-colors'

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
    </>
  )
}
