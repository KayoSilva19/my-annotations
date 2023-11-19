export function FomrNote() {
  const stylesContainerInput =
    'flex flex-col gap-1 text-zinc-900 font-medium max-[768px]:w-[100%]'

  const stylesInput =
    'h-10 bg-zinc-300 rounded p-2 text-zinc-800 font-regular md:min-w-[25rem] outline-none focus:outline-yellow-300 mt-1 '
  const stylesSelect =
    'h-10  bg-zinc-300 rounded p-2 text-zinc-800 font-regular md:min-w-[100%] outline-none focus:outline-yellow-300 mt-1 cursor-pointer font-regular'

  const optionType = ['Notas', 'Trabalho', 'Estudos', 'Lembretes', 'Lazer']
  const optionStatus = ['Status', 'Urgente', 'Intermediáro', 'Normal']
  return (
    <>
      <h1 className="mt-8 font-medium text-[1.3rem] bg-yellow-300 w-fit drop-shadow-md text-zinc-950">
        Crie Sua anotação
      </h1>
      <form className=" mt-4 flex flex-col bg-white  min-h-[10rem] rounded-md drop-shadow-md pt-8 p-4 flex-wrap    w-full gap-6 ">
        <div className="flex gap-8 items-end flex-wrap">
          <div className={stylesContainerInput}>
            <label className="text-zinc-900 font-normal">
              Nome da anotação
            </label>
            <input type="text" className={stylesInput} />
          </div>
          <div className={stylesContainerInput}>
            <select className={stylesSelect} name="" id="">
              {optionType.map((option, i) => {
                return <option key={i}>{option}</option>
              })}
            </select>
          </div>
          <div className={stylesContainerInput}>
            <select className={stylesSelect} name="" id="">
              {optionStatus.map((option, i) => {
                return <option key={i}>{option}</option>
              })}
            </select>
          </div>
        </div>
        <div>
          <div>
            <textarea
              name=""
              id=""
              cols="30"
              rows={10}
              placeholder="sua anotação"
              className="w-full max-h-[480px] resize-none rounded bg-zinc-200 p-4 outline-none "
            ></textarea>
          </div>
        </div>
      </form>
    </>
  )
}
