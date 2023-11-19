import { db } from '../db.js'

export const getNotes = (req, res) => {
  const q = 'SELECT * FROM user_notes'
  db.query(q, (err, data) => {
    if(err) return res.json(err)

    return res.status(200).json(data)
  })
}

export const addNote = () => {
  
}

export const updateNote = () => {
  
}

export const deleteNote = () => {
  
} 
