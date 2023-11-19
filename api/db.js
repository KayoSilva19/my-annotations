import mysql from 'mysql'

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kyo179!!!',
  database: 'note'
})