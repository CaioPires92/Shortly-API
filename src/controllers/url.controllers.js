import { db } from '../database/database.connection.js'
import { nanoid } from 'nanoid'

export async function createShorten(req, res) {
  const { url } = req.body
  const { user_id } = res.locals.session

  if (!url) {
    return res.status(400).send({ message: 'URL não fornecida.' })
  }

  const shortUrl = nanoid(7)

  try {
    const result = await db.query(
      'INSERT INTO urls (original_url, short_url, user_id) VALUES ($1, $2, $3) RETURNING id',
      [url, shortUrl, user_id]
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
    const response = await db.query('SELECT * FROM urls WHERE id =$1', [id])

    if (response.rowCount === 0) {
      return res.status(404).send({ message: 'URL encurtada não encontrada.' })
    }

    const urlInfo = response.rows[0]

    res.status(200).send({
      id: urlInfo.id,
      shortUrl: urlInfo.short_url,
      url: urlInfo.original_url
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params

  try {
    const response = await db.query('SELECT * FROM urls WHERE short_url = $1', [
      shortUrl
    ])

    if (response.rowCount === 0) {
      return res.status(404).send({ message: 'Short URL não encontrada.' })
    }

    const shortUrlInfo = response.rows[0]
    const originalUrl = shortUrlInfo.original_url
    const visitors = shortUrlInfo.visitors + 1

    await db.query('UPDATE urls SET visitors = $1 WHERE short_url = $2', [
      visitors,
      shortUrl
    ])

    res.redirect(originalUrl)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deleteUrlById(req, res) {
  const { id } = req.params
  const { user_id } = res.locals.session

  try {
    const response = await db.query(
      'SELECT * FROM urls where id=$1 AND user_id =$2',
      [id, user_id]
    )

    if (response.rowCount === 0) {
      return res
        .status(401)
        .send({ message: 'URL não encontrada ou não pertence ao usuário.' })
    }

    await db.query('DELETE FROM urls WHERE id = $1', [id])
    res.status(204).send({ message: 'URL deletada com sucesso.' })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
