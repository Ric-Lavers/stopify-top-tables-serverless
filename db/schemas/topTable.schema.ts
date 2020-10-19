import mongoose from "mongoose"
import { trackSchema } from "./track.schema"
import { userSchema } from "./user.schema"
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const topTableSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  time_range: {
    type: String,
    enum: ["short_term", "medium_term", "long_term"],
  },
  table_type: {
    type: String,
    enum: ["track", "artist"],
  },
  // groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "group" },],

  ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ["track", "artist"],
    },
  ],

  created_on: {
    type: Date,
    default: Date.now(),
  },
})
