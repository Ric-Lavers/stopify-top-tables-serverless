import mongoose from "mongoose"

const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

export const userSchema = new Schema({
  birthdate: String,
  country: String,
  display_name: String,
  email: String,
  explicit_content: Object,
  external_urls: Object,
  followers: Object,
  href: String,
  id: String,
  images: [Object],
  product: String,
  type: String,
  uri: String,

  color: {
    type: String,
  },

  created_on: {
    type: Date,
    default: Date.now(),
  },
})
