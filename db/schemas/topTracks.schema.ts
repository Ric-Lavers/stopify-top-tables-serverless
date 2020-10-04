import mongoose from "mongoose"
import { trackSchema } from "./track.schema"
import { userSchema } from "./user.schema"
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const topTracksSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  top_tables: {
    track_short_term: trackSchema,
    track_medium_term: trackSchema,
    track_long_term: trackSchema,
    artist_short_term: trackSchema,
    artist_medium_term: trackSchema,
    artist_long_term: trackSchema,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
})
