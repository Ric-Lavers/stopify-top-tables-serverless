import mongoose from "mongoose"

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

export default wordSchema
