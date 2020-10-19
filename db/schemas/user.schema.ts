import mongoose from "mongoose"

import { topTableSchema } from "./topTable.schema"
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const userSchema = new Schema({
  birthdate: String,
  country: String,
  display_name: String,
  email: String,
  external_urls: Object,
  followers: Object,
  href: String,
  id: String,
  images: [Object],
  product: String,
  type: String,
  uri: String,

  // track_short_term: [{ type: mongoose.Schema.Types.ObjectId, ref: "topTable" }],
  // track_medium_term: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: "topTable" },
  // ],
  // track_long_term: [{ type: mongoose.Schema.Types.ObjectId, ref: "topTable" }],
  // artist_short_term: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: "topTable" },
  // ],
  // artist_medium_term: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: "topTable" },
  // ],
  // artist_long_term: [{ type: mongoose.Schema.Types.ObjectId, ref: "topTable" }],

  track_short_term: [{ type: mongoose.Schema.Types.ObjectId, ref: "track" }],
  track_medium_term: [{ type: mongoose.Schema.Types.ObjectId, ref: "track" }],
  track_long_term: [{ type: mongoose.Schema.Types.ObjectId, ref: "track" }],
  artist_short_term: [{ type: mongoose.Schema.Types.ObjectId, ref: "artist" }],
  artist_medium_term: [{ type: mongoose.Schema.Types.ObjectId, ref: "artist" }],
  artist_long_term: [{ type: mongoose.Schema.Types.ObjectId, ref: "artist" }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "group" }],
  color: {
    type: String,
  },

  created_on: {
    type: Date,
    default: Date.now(),
  },
})
