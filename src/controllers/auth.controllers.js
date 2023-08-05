import { db } from '../database/database.connection.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export async function createUser(req, res) {
  const { name, email, password } = req.body

  try {
    const response = await db.query('SELECT * FROM users WHERE email=$1', [
      email
    ])
    if (response.rowCount > 0)
      return res.status(409).send({ message: 'esse usuario já foi cadastrado' })

    const hash = await bcrypt.hash(password, 10)

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
  try {
    //
    res.send(newCustomers)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
