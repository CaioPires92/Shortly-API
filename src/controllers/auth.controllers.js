import { db } from '../database/database.connection.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export async function signUp(req, res) {
  const { name, email, password } = req.body

  try {
    const response = await db.query('SELECT * FROM users WHERE email=$1', [
      email
    ])
    if (response.rowCount > 0)
      return res.status(409).send({ message: 'esse usuario já foi cadastrado' })

    const hash = bcrypt.hashSync(password, 10)

    await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hash]
    )

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function login(req, res) {
  const { email, password } = req.body

  try {
    const response = await db.query('SELECT * FROM users WHERE email=$1', [
      email
    ])

    if (response.rowCount <= 0) {
      return res.status(401).send({ message: 'Usuario não cadastrado!' })
    }

    const user = response.rows[0]

    const isPasswordCorrect = bcrypt.compareSync(password, user.password)

    if (!isPasswordCorrect)
      return res.status(401).send({ message: 'Senha incorreta' })

    const token = uuid()

    await db.query('INSERT INTO sessions (token, user_id) VALUES ($1, $2)', [
      token,
      user.id
    ])

    res.send({ token })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
