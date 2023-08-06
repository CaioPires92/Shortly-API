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

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params

  try {
    const response = await db.query('SELECT * FROM url WHERE short_url = $1', [
      shortUrl
    ])

    if (response.rowCount === 0) {
      return res.status(404).send({ message: 'Short URL não encontrada.' })
    }

    const shortUrlInfo = response.rows[0]
    const originalUrl = shortUrlInfo.original_url
    const visitors = shortUrlInfo.visitantes + 1

    await db.query('UPDATE url SET visitantes = $1 WHERE short_url = $2', [
      visitors,
      shortUrl
    ])

    res.redirect(originalUrl)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
