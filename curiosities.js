var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    if (n == 1) {
        const data = sessionStorage.getItem("songs");
        const songs = JSON.parse(data);
        songs.push(songs.splice(0, 1)[0]);
        sessionStorage.setItem("songs", JSON.stringify(songs));
    }
    else {
        const data = sessionStorage.getItem("songs");
        const songs = JSON.parse(data);
        songs.unshift(songs.pop());
        sessionStorage.setItem("songs", JSON.stringify(songs));
    }
    showSlides(slideIndex += n);
};

function currentSlide(n) {
    showSlides(slideIndex = n);
};

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("myslides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex - 1].className += " active";
};