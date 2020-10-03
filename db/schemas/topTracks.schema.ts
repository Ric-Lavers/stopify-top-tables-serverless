import mongoose from "mongoose"

const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const topTracksSchema = new Schema({
  group_id: {
    type: String,
  },
  user: Object,
  time_range: String,
  items: Object,
  created_on: {
    type: Date,
    default: Date.now(),
  },
})
