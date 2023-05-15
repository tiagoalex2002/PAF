if (sessionStorage.getItem("playlists") == null) {
    sessionStorage.setItem("playlists", JSON.stringify([]))
};

if (sessionStorage.getItem("slideIndex") == null) {
    sessionStorage.setItem("slideIndex", JSON.stringify(1))
};

if (sessionStorage.getItem("songs") == null) {
    var arr = []
    const songs = document.getElementsByClassName("myslides fade");
    for (i = 0; i < songs.length; i++) {
        var element = '<div class="myslides fade">' + songs[i].innerHTML + '</div>'
        arr.push(element);
    }
    sessionStorage.setItem("songs", JSON.stringify(arr));
};

if (sessionStorage.getItem("playlistname") != null){
    var playlist = sessionStorage.playlistname;
    var playlistClean = playlist.substring(1,playlist.length-1);
    document.getElementById('playing').innerHTML = "Playlist: " + playlistClean;
}

var buttonplay = document.getElementById("play-pause");
function playpause() {
    let icon = buttonplay.querySelector(".icons");
    let name = icon.getAttribute("name");
    if (name == 'caret-forward-outline') {
        icon.setAttribute("name", "pause-outline");
    }
    else {
        icon.setAttribute("name", "caret-forward-outline");
    }
};

var slideIndex = JSON.parse(sessionStorage.getItem("slideIndex"));
document.getElementById("curiosities").setAttribute("href",slideIndex.toString()+".html");
showSlides(slideIndex);

function plusSlides(n) {
    var index = JSON.parse(sessionStorage.getItem("slideIndex"));
    var slides = document.getElementsByClassName("myslides");
    index += n;
    if (index > slides.length) { index = 1 }
    if (index < 1) { index = slides.length }
    
    sessionStorage.setItem("slideIndex", JSON.stringify(index));

    document.getElementById("curiosities").setAttribute("href",index.toString()+".html");

    showSlides(slideIndex += n);
};

function currentSlide(n) {
    showSlides(slideIndex = n);
};

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("myslides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
};
