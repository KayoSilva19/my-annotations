export function Wrapper({ children }) {
  return (
    <div className="w-full min-h-screen bg-zinc-200 flex flex-col items-center px-8">
      {children}
    </div>
  )
}
