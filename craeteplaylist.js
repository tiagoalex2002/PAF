function buttonClick(btn) {

    const activeBtn = document.querySelector(".active");
    if (btn.className != "setime") {
        if (activeBtn !== null) {
            activeBtn.classList.remove("active");
        }
        btn.classList.add("active");
    }
    if (document.getElementById("set-time").value != '') {
        const playBtn = document.getElementById("play");
        const saveBtn = document.getElementById("save");
        playBtn.disabled = false;
        playBtn.classList.remove("inactive");
        saveBtn.disabled = false;
        saveBtn.classList.remove("inactive");
    }
};


document.getElementById("save").onclick = function () {
    let mood = document.getElementsByClassName("active")[0];
    if (typeof mood !== 'undefined') {
        const time = document.getElementById("set-time").value;

        const popup = document.getElementById("popup");
        const popupTxt = document.createTextNode("Your playlist has been saved as " + mood.id + "_" + time + ".");
        popup.appendChild(popupTxt);
        console.log(popup.innerHTML)
        popup.classList.add("open-popup");
        setTimeout(function () { popup.classList.remove("open-popup"); popup.removeChild(popup.firstChild) }, 2000);

        var data = JSON.parse(sessionStorage.getItem("playlists"));
        console.log(data)
        const newPlaylist = { "name": mood.id + "_" + time, "mood": mood.id, "time": time }
        data.push(newPlaylist);
        sessionStorage.setItem("playlists", JSON.stringify(data));
    } else {
        alert("Please select a mood");
    }
};
