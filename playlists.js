function openPlaylists() {
    const data = sessionStorage.getItem("playlists");
    console.log(data)
    const playlists = JSON.parse(data);
    console.log(playlists)
    if (playlists.length == 0) {
        let text = document.createTextNode("No playlists were created.");
        document.getElementById("playlists").appendChild(text);

        let a = document.createElement("a");
        let btn = document.createElement("button");
        btn.setAttribute("style", "font-family: 'Nunito', Times, serif")
        let createTxt = document.createTextNode("Create playlist");
        btn.appendChild(createTxt);
        a.setAttribute("href", "create.html");
        a.appendChild(btn);
        document.getElementById("playlists").appendChild(a);
    }
    else {
        for (i = 0; i < playlists.length; i++) {
            let p = playlists[i].name;

            let text = document.createTextNode(p);
            let a = document.createElement("a");
            a.setAttribute("href", "playlistsongs.html");

            let btn = document.createElement("button");

            btn.appendChild(text);
            btn.setAttribute("onclick", "choosePlaylist(this)");

            a.appendChild(btn);

            document.getElementById("playlists").appendChild(a);
        }
    }
};

function showConfirmBox() {
    document.getElementById("overlay").style.visibility = "visible";
}
function closeConfirmBox() {
    document.getElementById("overlay").style.visibility = "hidden";
}

function isConfirm(answer) {
    if (answer) {
        const title = sessionStorage.getItem("playlistname");
        const data = sessionStorage.getItem("playlists");

        const name = JSON.parse(title);
        const playlists = JSON.parse(data);
        for (i = 0; i < playlists.length; i++) {
            if (playlists[i].name == name) {
                playlists.splice(i, 1);
                sessionStorage.setItem("playlists", JSON.stringify(playlists));
            }
        }
        window.location.replace("playlists.html");
    }
    closeConfirmBox();
};

function choosePlaylist(btn) {
    const name = btn.innerHTML;
    sessionStorage.setItem("playlistname", JSON.stringify(name));
};

// function openPlaylistSongs() {
//     let playlistname = sessionStorage.getItem("playlistname");
//     document.getElementById("playlisttitle").innerHTML = playlistname;

//     const data = sessionStorage.getItem("playlists");
//     const playlists = JSON.parse(data);

//     let name = JSON.parse(playlistname);

//     for (i = 0; i < playlists.length; i++) {
//         if (playlists[i].name == name) {
//             document.getElementById("duration").innerHTML = "Duration: " + playlists[i].time;
//         }
//     }
// };
