import { db } from '../db.js'

export const getNotes = (req, res) => {
  const q = 'SELECT * FROM user_notes'
  db.query(q, (err, data) => {
    if(err) return res.json(err)

    return res.status(200).json(data)
  })
}

export const addNote = (req, res) => {
  const q = 'INSERT INTO user_notes(`nome`, `type`, `urgency`, `annotation`) VALUES(?)'

  const values = [
    req.body.nome,
    req.body.type,
    req.body.urgency,
    req.body.annotation,
  ];
  
  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
}

export const updateNote = (req, res) => {
  const q =
    "UPDATE user_notes SET `nome` = ?, `type` = ?, `urgency` = ?, `annotation` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.type,
    req.body.urgency,
    req.body.annotation,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};
export const deleteNote = (req, res) => {
  const q = 'DELETE FROM user_notes WHERE `id` = ? '

  db.query(q, [req.params.id], (err) => {
    if(err) return res.json(err)

    return res.status(200).json('Usuário deletado com sucesso.')
  })
  
} 
