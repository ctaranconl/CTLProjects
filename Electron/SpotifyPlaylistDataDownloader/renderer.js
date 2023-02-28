const { downloadPlaylistData } = require('./playlist.js');

async function downloadPlaylist() {
    const playlistUrl = document.getElementById("playlist-input").value;
    const songs = await downloadPlaylistData(playlistUrl);
      
    updateTable(songs);
};

function updateTable(songs) {
    
    const playlistTable = document.getElementById('playlist-table');
    const playlistName = songs[1]
    document.getElementById("playlist-title").innerHTML = playlistName
    const table_header = document.getElementById('table-header');
    table_header.innerHTML = 
    '<tr>'+
    '    <th>#</th>'+
    '    <th>TITLE</th>'+
    '    <th>ALBUM</th>'+
    '</tr>';
    playlistTable.appendChild(table_header)
    songs[0].forEach((track, index) => {

        const albumImageUrl = track.track.album.images[0].url || 'album.jpg';
        //console.log(albumImageUrl)
        //const albumImageUrl = track.album || 'album.jpg';
        
        const songTitle = track.track.name;
        const songAlbum = track.track.album.name;
        const artistName = track.track.artists[0].name;
        const duration = track.track.album.duration_ms;

        const row = document.createElement('tr');
        row.setAttribute("id", "table-row")
        const indexCell = document.createElement('td');
        const title = document.createElement('td');
        const album = document.createElement('td');

        song_artist_cell = 
                
                    '<div id="row-title-container">'+
                        '<div id="album-list-images">'+
                            '<img src=' + `"${albumImageUrl}"`+'>'+
                        '</div>'+
                        '<div>'+
                            '<p id="song-title-text">' + `"${songTitle}"`+'</p>'+
                            '<p id="artist-text">' + `"${artistName}"`+'</p>'+
                        '</div>'+
                    '</div>'                
        ;

        indexCell.innerText = index + 1
        title.innerHTML = song_artist_cell;
        //artist.innerText = track.track.artists.map(artist => artist.name).join(', ');
        album.innerText = songAlbum;

        row.appendChild(indexCell);
        row.appendChild(title);
        row.appendChild(album);

        playlistTable.appendChild(row);
    });

    showSlideIn();
}

//function showExportButton(){
//    const mainContainer = document.getElementsByClassName('container1')[0]
//    const exportButton = document.createElement('div')
//    exportButton.setAttribute('id', 'export-button-container')
//
//    exportButton.innerHTML = 
//        '<div id="export-button-container">'+
//        '    <button id="export-button" type="button" onclick="showSlideIn()">Export Data</button>'+
//        '</div>';
//    
//    mainContainer.appendChild(exportButton)
//}

function exportPlaylistData(){
    const exportWindow = window.open('', 'Export', 'width=500,height=500');



    exportWindow.document.body.innerHTML = `
    <div id="export-container">
      <select id="format-select">
        <option value="csv">CSV</option>
        <option value="excel">Excel</option>
      </select>
      <input type="text" id="export-path-input" placeholder="Export path">
      <button id="execute-export-button">Export</button>
    </div>
  `;
}

function showSlideIn() {
    const slideIn = document.querySelector('.container1');
    const slideIn2 = document.querySelector('.container2');
    slideIn.classList.add('show');
    slideIn2.classList.add('show');
  }