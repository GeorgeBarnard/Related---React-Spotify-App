let prod = true;

const scopes = "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played";
const redirectURI = prod ? "https://calm-fjord-61683.herokuapp.com/" : "http://localhost:3000/";

export const clientID = "3dbf0bf935864a60b4dd00aec0930702";
export const clientSecret = "3c139e27cf864effadacc48ce2133ffd";
export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID
}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
export const spotifyProfileURL = "https://api.spotify.com/v1/me?access_token=";
export const spotifyPlaylistURL = "https://api.spotify.com/v1/me/playlists?access_token=";
export const spotifySearchURL = "https://api.spotify.com/v1/search?q=";
export const spotifyArtistURL = "https://api.spotify.com/v1/artists/";
export const spotifyAlbumURL = "https://api.spotify.com/v1/albums/";
