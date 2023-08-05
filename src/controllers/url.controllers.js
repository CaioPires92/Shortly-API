import { db } from '../database/database.connection.js'
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

export async function getUrlsById(req, res) {
  const { id } = req.params

  try {
    const response = await db.query('SELECT * FROM url WHERE id =$1', [id])

    if (response.rowCount === 0) {
      return res.status(404).send({ message: 'URL encurtada não encontrada.' })
    }

    const urlInfo = response.rows[0]

    res.status(200).send({
      id: urlInfo.id,
      shortUrl: urlInfo.short_url,
      originalUrl: urlInfo.original_url
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
