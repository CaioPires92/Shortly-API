import { db } from '../database/database.connection.js'
// import bcrypt from 'bcrypt'
// import { v4 as uuid } from 'uuid'
import { nanoid } from 'nanoid'

export async function createShorten(req, res) {
  const { url } = req.body
  const { userId } = res.locals.session

  if (!url) {
    return res.status(400).send({ message: 'URL não fornecida.' })
  }

  const shortUrl = nanoid(7)

  try {
    await db.query(
      'INSERT INTO urls (original_url, short_url) VALUES ($1, $2)',
      [url, shortUrl]
    )

    res.status(200).send({ userId, shortUrl })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
