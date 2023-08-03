import { db } from '../database/database.connection.js'

export async function createUser(req, res) {
  try {
    //
    res.sendStatus(200)
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
