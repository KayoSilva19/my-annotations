import axios from 'axios'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'

export function FomrNote({ getUser, setOnEdit, onEdit }) {
  const stylesContainerInput =
    'flex flex-col gap-1 text-zinc-900 font-medium max-[768px]:w-[100%]'

  const stylesInput =
    'h-10 bg-zinc-300 rounded p-2 text-zinc-800 font-regular md:min-w-[25rem] outline-none focus:outline-yellow-300 mt-1 '
  const stylesSelect =
    'h-10  bg-zinc-300 rounded p-2 text-zinc-800 font-regular md:min-w-[100%] outline-none focus:outline-yellow-300 mt-1 cursor-pointer font-regular'

  const optionType = ['Notas', 'Trabalho', 'Estudos', 'Lembretes', 'Lazer']
  const optionStatus = ['Status', 'Urgente', 'Intermediário', 'Normal']

  const ref = useRef()

  useEffect(() => {
    if (onEdit) {
      const note = ref.current

      note.nome.value = onEdit.nome
      note.type.value = onEdit.type
      note.status.value = onEdit.urgency
      note.annotation.value = onEdit.annotation
    }
  }, [onEdit])

  async function addNote(e) {
    e.preventDefault()

    const note = ref.current

    if (
      !note.nome.value ||
      !note.type.value ||
      !note.status.value ||
      !note.annotation.value
    ) {
      return toast.warn('Preencha todos os campos!')
    }

    if (onEdit) {
      await axios
        .put(`http://localhost:8000/notes/${onEdit.id}`, {
          nome: note.nome.value,
          type: note.type.value,
          urgency: note.status.value,
          annotation: note.annotation.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data))
    } else {
      await axios
        .post('http://localhost:8000/notes', {
          nome: note.nome.value,
          type: note.type.value,
          urgency: note.status.value,
          annotation: note.status.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data))
    }

    note.nome.value = ''
    note.type.value = ''
    note.status.value = ''
    note.annotation.value = ''

    setOnEdit(null)
    getUser()
  }
  return (
    <>
      <h1 className="mt-8 font-medium text-[1.3rem] bg-yellow-300 w-fit drop-shadow-md text-zinc-950">
        Crie Sua anotação
      </h1>
      <form
        ref={ref}
        onSubmit={addNote}
        className="mt-4 flex flex-col bg-white  min-h-[10rem] rounded-md drop-shadow-md pt-8 p-4 flex-wrap    w-full gap-6"
      >
        <div className="flex gap-8 items-end flex-wrap">
          <div className={stylesContainerInput}>
            <label className="text-zinc-900 font-normal">
              Nome da anotação
            </label>
            <input name="nome" type="text" className={stylesInput} />
          </div>
          <div className={stylesContainerInput}>
            <select className={stylesSelect} name="type" id="">
              {optionType.map((option, i) => {
                return <option key={i}>{option}</option>
              })}
            </select>
          </div>
          <div className={stylesContainerInput}>
            <select className={stylesSelect} name="status" id="">
              {optionStatus.map((option, i) => {
                return <option key={i}>{option}</option>
              })}
            </select>
          </div>
        </div>
        <div>
          <textarea
            name="annotation"
            id=""
            cols="30"
            rows={10}
            placeholder="sua anotação"
            className="w-full max-h-[480px] resize-none rounded bg-zinc-200 p-4 outline-none "
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-400 py-2 px-4 rounded font-medium text-white w-fit hover:bg-red-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </>
  )
}
