import mongoose from "mongoose"

const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const trackSchema = new Schema({
  id: String,
  track: {
    type: Object,
    unique: true,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
})
