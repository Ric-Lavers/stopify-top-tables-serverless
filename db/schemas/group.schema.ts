import mongoose from "mongoose"

const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const groupSchema = new Schema({
  name: { type: String, unique: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  track_short_term: [[{ type: mongoose.Schema.Types.ObjectId, ref: "track" }]],
  track_medium_term: [[{ type: mongoose.Schema.Types.ObjectId, ref: "track" }]],
  track_long_term: [[{ type: mongoose.Schema.Types.ObjectId, ref: "track" }]],
  artist_short_term: [
    [{ type: mongoose.Schema.Types.ObjectId, ref: "artist" }],
  ],
  artist_medium_term: [
    [{ type: mongoose.Schema.Types.ObjectId, ref: "artist" }],
  ],
  artist_long_term: [[{ type: mongoose.Schema.Types.ObjectId, ref: "artist" }]],

  created_on: {
    type: Date,
    default: Date.now(),
  },
})
