import mongoose from "mongoose";

const Schema = mongoose.Schema;
// mongoose.set("useCreateIndex", true);

const trackSchema = new Schema(
  {
    spotify_id: String,
    // the position from user top tables
    rank: {
      type: Number,
      default: 0,
    },
    // the number of duplicates
    count: {
      type: Number,
      default: 1,
    },
  },
  { toJSON: { virtuals: true } }
);
// used to determine the position in the playlist,
// lowest to highest
trackSchema.virtual("score").get(function () {
  return this.rank / this.count;
});

export const topTracksPlaylistSchema = new Schema(
  {
    users_ids: [{ type: String, unique: true }],

    tracks: [trackSchema],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
