//https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel
const url = require("url")
const MongoClient = require("mongodb").MongoClient
const { trackSchema } = require("./schemas")
const mongoose = require("mongoose")
import wordSchema from "./schemas/word.schema"

// Create cached connection variable
let cachedDb = null

//* setup
export function connectToDatabase(uri = "mongodb://localhost/demo") {
  // attach schemas
  const Track = mongoose.model("track", trackSchema)
  const Word = mongoose.model("word", wordSchema)
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }
  // If no connection is cached, create a new one
  mongoose.Promise = global.Promise
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Cache the database connection and return the connection
  cachedDb = { mongoose, Word, Track }

  return cachedDb
}
