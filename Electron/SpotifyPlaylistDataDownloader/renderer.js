const { downloadPlaylistData } = require('./playlist.js');

async function downloadPlaylist() {
    const playlistUrl = document.getElementById("playlist-input").value;
    const songs = await downloadPlaylistData(playlistUrl);
      
    updateTable(songs);
};

function updateTable(songs) {
    const playlistTable = document.getElementById('playlist-table');
    playlistTable.innerHTML = ""
    
    songs.tracks.items.forEach((track) => {
        const row = document.createElement('tr');
        const song = document.createElement('td');
        const artist = document.createElement('td');
        const album = document.createElement('td');

        song.innerText = track.track.name;
        artist.innerText = track.track.artists.map(artist => artist.name).join(', ');
        album.innerText = track.track.album.name;

        row.appendChild(song);
        row.appendChild(artist);
        row.appendChild(album);

        playlistTable.appendChild(row);
    });
}