import { db } from '../database/database.connection.js'
// import bcrypt from 'bcrypt'
// import { v4 as uuid } from 'uuid'
import { nanoid } from 'nanoid'

export async function createShorten(req, res) {
  const { url } = req.body

  if (!url) {
    return res.status(400).send({ message: 'URL não fornecida.' })
  }

  const shortUrl = nanoid(7)

  try {
    const result = await db.query(
      'INSERT INTO url (original_url, short_url) VALUES ($1, $2) RETURNING id',
      [url, shortUrl]
    )

    const id = result.rows[0].id

    res.status(201).send({ id, shortUrl })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
