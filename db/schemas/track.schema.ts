import mongoose from "mongoose"

const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const trackSchema = new Schema({
  id: String,
  track: {
    type: Object,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
})
