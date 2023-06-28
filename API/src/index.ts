import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import Deck from './models/Deck'
import cors from 'cors'

require('dotenv').config()

const PORT = 5000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
  res.send('hey')
})

app.get('/decks', async (req: Request, res: Response) => {
  const allDecks = await Deck.find()
  res.json(allDecks)
})

app.post('/decks', async (req: Request, res: Response) => {
  const deckTitle = req.body.title
  console.log(deckTitle)
  const newDeck = new Deck({
    title: deckTitle,
  })
  const createdDeck = await newDeck.save()
  res.json(createdDeck)
})

const db = mongoose.connect(process.env.MONGO_URL ?? '').then(() => {
  console.log(`listening on port ${PORT}`)
  app.listen(PORT)
})
