const url = require("url")
const MongoClient = require("mongodb").MongoClient
const { trackSchema } = require("./schemas")
const mongoose = require("mongoose")
import wordSchema from "./schemas/word.schema"

// Create cached connection variable
let cachedDb = null

export async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  console.log("cachedDb", !!cachedDb)
  if (cachedDb) {
    return cachedDb
  }
  console.log(uri)
  try {
    // If no connection is cached, create a new one
    console.log("!!!")

    // const client = await MongoClient.connect(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // })
    const client = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log({ client })

    const Word = mongoose.model("word", wordSchema)

    const getWords = async (req, res) => {
      try {
        const words = await Word.find({}).select("word")
        console.log(words)

        const response = words.map(({ word }) => word)

        // res.send(response)
      } catch (error) {
        console.error(error.message)
        // res.status(400).send(error)
      }
    }
    getWords(null, null)

    // const Track = client.model("track", trackSchema)

    // Select the database through the connection,
    // using the database path of the connection string
    const db = await client.db(url.parse(uri).pathname.substr(1))

    // Cache the database connection and return the connection
    cachedDb = db
    return { db, Word }
  } catch (error) {
    console.log("error")
  }
}
