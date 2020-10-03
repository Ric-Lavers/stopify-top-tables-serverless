import mongoose from "mongoose"

const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const trackSchema = new Schema({
  id: String,
  album: Object,
  artists: Object,
  disc_number: Number,
  duration_ms: Number,
  explicit: Boolean,
  external_ids: Object,
  external_urls: Object,
  href: String,
  name: String,
  popularity: Number,
  preview_url: String,
  track_number: Number,
  type: String,
  uri: String,

  created_on: {
    type: Date,
    default: Date.now(),
  },
})
