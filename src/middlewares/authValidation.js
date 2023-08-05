import { db } from '../database/database.connection.js'

export async function authValidation(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer ', '')
  if (!token) return res.sendStatus(401)

  try {
    const response = await db.query('SELECT * FROM sessions WHERE token = $1', [
      token
    ])

    console.log(response.rowCount)

    if (response.rowCount <= 0) return res.sendStatus(401)

    const session = response.rows[0]

    res.locals.session = session

    next()
  } catch (err) {
    res.status(500).send(err.message)
  }
}
