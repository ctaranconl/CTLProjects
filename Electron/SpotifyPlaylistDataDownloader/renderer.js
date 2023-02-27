const { downloadPlaylistData } = require('./playlist.js');

async function downloadPlaylist() {
    const playlistUrl = document.getElementById("playlist-input").value;
    const songs = await downloadPlaylistData(playlistUrl);
      
    updateTable(songs);
};

function updateTable(songs) {
    const playlistTable = document.getElementById('playlist-table');
    
    songs.tracks.items.forEach((track, index) => {
        const row = document.createElement('tr');
        const indexCell = document.createElement('td');
        const title = document.createElement('td');
        const album = document.createElement('td');

        indexCell.innerText = index + 1
        title.innerText = track.track.name;
        //artist.innerText = track.track.artists.map(artist => artist.name).join(', ');
        album.innerText = track.track.album.name;

        row.appendChild(indexCell);
        row.appendChild(title);
        row.appendChild(album);

        playlistTable.appendChild(row);
    });
}