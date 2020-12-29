import mongoose from "mongoose";

const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

export const artistSchema = new Schema({
  id: String,
  external_urls: Object,
  href: String,
  name: String,
  popularity: Number,
  type: String,
  uri: String,
  followers: Object,
  genres: [String],
  images: [Object],

  created_on: {
    type: Date,
    default: Date.now(),
  },
});
