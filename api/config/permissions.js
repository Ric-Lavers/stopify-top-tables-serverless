const allPermisions = [
  "streaming",
  "user-follow-modify",
  "user-modify-playback-state",
  "user-read-private",
  "user-read-birthdate",
  "user-library-read",
  "app-remote-control",
  "user-follow-read",
  "user-top-read",
  "user-read-email",
  "user-read-playback-state",
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-library-modify",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
].join(" ")

const topTablePermissions = [
  "user-top-read",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-private",
]

module.exports = {
  allPermisions,
  topTablePermissions,
}
