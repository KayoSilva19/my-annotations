import express from "express";
import { getNotes, addNote, updateNote, deleteNote } from '../controllers/notes.js'

const router = express.Router();

router.get('/notes', getNotes) 
router.post('/notes', addNote) 
router.put('/notes/:id', updateNote) 
router.delete('/notes/:id', deleteNote) 

export default router