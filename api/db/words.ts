const cors = require("micro-cors")()
import mongoose from "mongoose"

import { connectToDatabase } from "../../db/connectToDB"
/* 
//* db schema
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

const wordSchema = new Schema({
  word: {
    type: String,
    unique: true,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
})

//* setup
function connectToDatabase(uri = "mongodb://localhost/demo") {
  // If the database connection is cached,
  // use it instead of creating a new connection
  const Word = mongoose.model("word", wordSchema)
  // If no connection is cached, create a new one
  mongoose.Promise = global.Promise
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Cache the database connection and return the connection

  return { mongoose, Word }
} */

//* model
const allWords = async () => {
  const { Word } = connectToDatabase()

  const words = await Word.find({}).select("word")
  //@ts-ignore
  return words.map(({ word }) => word)
}

//* controller
export const getWords = async (req, res) => {
  try {
    const response = await allWords()
    res.send(response)
  } catch (error) {
    console.error(error.message)
    res.status(400).send(error)
  }
}

module.exports = cors(getWords)
