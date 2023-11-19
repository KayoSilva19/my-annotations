export function GridNotes({ notes }) {
  return (
    <ul>
      {notes.map((note) => {
        return <li key={note.id}>{note.annotation}</li>
      })}
    </ul>
  )
}
