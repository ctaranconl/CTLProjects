


async function downloadPlaylistData(playlistUrl) {

    const SpotifyWebApi = require('spotify-web-api-node');
    const playlistId = playlistUrl.split('/playlist/')[1].split('?')[0];
    const spotifyApi = new SpotifyWebApi({
        clientId: '1e5dd61308534114a7bfc0b649fa569a',
        clientSecret: '1829d37152904ffeacba298185a00da4'
    });

    await spotifyApi.clientCredentialsGrant().then(
        function(data) {
        console.log('The access token is ' + data.body['access_token']);
        // Save the access token to the SpotifyWebApi object
        spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err) {
        console.log('Something went wrong!', err);
        }
    );
    //return spotifyApi.getPlaylist(playlistId, { 'fields': 'name,tracks.items(track(name, id, artists(name),album(name),album(images), duration_ms))' })
    return spotifyApi.getPlaylist(playlistId)
    .then(function(data) {
        return data.body;
    }, function(err) {
        console.log('Something went wrong!', err);
    });

}

module.exports = { downloadPlaylistData };