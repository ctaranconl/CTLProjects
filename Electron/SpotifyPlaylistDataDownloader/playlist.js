


//async function downloadPlaylistData(playlistUrl) {
//
//    const SpotifyWebApi = require('spotify-web-api-node');
//    const playlistId = playlistUrl.split('/playlist/')[1].split('?')[0];
//    const spotifyApi = new SpotifyWebApi({
//        clientId: '1e5dd61308534114a7bfc0b649fa569a',
//        clientSecret: '1829d37152904ffeacba298185a00da4'
//    });
//
//    await spotifyApi.clientCredentialsGrant().then(
//        function(data) {
//        console.log('The access token is ' + data.body['access_token']);
//        // Save the access token to the SpotifyWebApi object
//        spotifyApi.setAccessToken(data.body['access_token']);
//        },
//        function(err) {
//        console.log('Something went wrong!', err);
//        }
//    );
//    //return spotifyApi.getPlaylist(playlistId, { 'fields': 'name,tracks.items(track(name, id, artists(name),album(name),album(images), duration_ms))' })
//    return spotifyApi.getPlaylist(playlistId)
//    .then(function(data) {
//        return data.body;
//    }, function(err) {
//        console.log('Something went wrong!', err);
//    });
//
//}

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
    let allTracks = [];
    let offset = 0;
    let limit = 100;
    playlistName = "";

    while (true) {
        const response = await spotifyApi.getPlaylist(
            playlistId,
            { 'offset': offset, 'limit': limit, 'fields': 'name,tracks.items(track(name, id, artists(name),album(name),album(images), duration_ms))' }
        );
        allTracks = allTracks.concat(response.body.tracks.items);
        console.log(response.body.tracks.items.length)
        if (response.body.tracks.items.length < limit) {
            playlistName = response.body.name;
            break;
        } else {
            offset += limit;
            console.log(offset)
        }
    }

    return [allTracks, playlistName];

}

module.exports = { downloadPlaylistData };