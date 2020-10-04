import mongoose from "mongoose"

const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const userSchema = new Schema({
  name: { type: String, unique: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  topTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "topTracks" }],

  created_on: {
    type: Date,
    default: Date.now(),
  },
})
