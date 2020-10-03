const allPermisions = [
  "streaming",
  "user-follow-modify",
  "playlist-read-private",
  "user-modify-playback-state",
  "user-read-private",
  "user-read-birthdate",
  "user-library-read",
  "playlist-modify-private",
  "app-remote-control",
  "user-follow-read",
  "user-top-read",
  "playlist-read-collaborative",
  "user-read-email",
  "playlist-modify-public",
  "user-read-playback-state",
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-library-modify"
].join(' ')
const topTablePermissions = [
  "user-top-read",
  "user-read-email"
]

module.exports = {
  allPermisions,
  topTablePermissions
}