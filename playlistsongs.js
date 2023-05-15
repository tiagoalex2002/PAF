function openPlaylistSongs() {
    let playlistname = sessionStorage.getItem("playlistname");
    document.getElementById("playlisttitle").innerHTML = playlistname;

    const data = sessionStorage.getItem("playlists");
    const playlists = JSON.parse(data);

    let name = JSON.parse(playlistname);

    for (i = 0; i < playlists.length; i++) {
        if (playlists[i].name == name) {
            document.getElementById("duration").innerHTML = "Duration: " + playlists[i].time;
        }
    }
};

// function openSongs(){
//     var data = sessionStorage.getItem("songs");
//     var songs = JSON.parse(data);
//     let element = document.getElementById("music").innerHTML
//     console.log(element)
//     element = ''
//     console.log(songs)
//     console.log(slideIndex)
//     for (let i = 0; i < songs.length; i++) {
//         element += songs[i]
//     }
//     console.log(element)
    //if (slideIndex==0){
    // for (i=0; i<songs.length;i++){
    //   element += songs[i];
    //  }
    //}
    //else if( slideIndex==1){
    // for (i=1; i<songs.length;i++){
    //   element += songs[i];
    //  }
    // element += songs[0]
    //}
    //else if(slideIndex==2){
    // element += songs[2]
    //  for (i=0; i<(songs.length-1);i++){
    //   element += songs[i];
    // }
    //}
//};
