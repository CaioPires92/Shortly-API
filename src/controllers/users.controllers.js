import { db } from '../database/database.connection.js'

export async function currentUserDetails(req, res) {
  const { user_id } = res.locals.session

  try {
    const queryUsersAndUrls = `   
                  SELECT
                  users.id AS id,
                  users.name AS name,
                  CAST(SUM(urls.visitors) AS INTEGER) AS visitCount,
                  json_agg(json_build_object(
                    'id', urls.id,
                    'shortUrl', urls.short_url,
                    'url', urls.original_url,
                    'visitCount', urls.visitors
                  )) AS shortenedUrls
                FROM users
                LEFT JOIN urls ON users.id = urls.user_id
                WHERE users.id = $1
                GROUP BY users.id;
          `

    const response = await db.query(queryUsersAndUrls, [user_id])

    const user = response.rows[0]

    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getRanking(req, res) {
  try {
    const query = `
            SELECT
            users.id AS id,
            users.name AS name,
            COUNT(urls.id) AS linksCount,
            COALESCE(SUM(urls.visitors), 0) AS visitCount
        FROM
            users
        LEFT JOIN
            urls ON users.id = urls.user_id
        GROUP BY
            users.id
        ORDER BY
            COALESCE(SUM(urls.visitors), 0) DESC
        LIMIT 10;

    `

    const response = await db.query(query)

    const ranking = response.rows

    res.status(200).send(ranking)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
