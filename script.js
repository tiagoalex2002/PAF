if (sessionStorage.getItem("playlists") == null){
    sessionStorage.setItem("playlists",JSON.stringify([]))
};

if (sessionStorage.getItem("songs") == null){
  var arr = []
  const songs = document.getElementsByClassName("myslides fade");
  for (i=0; i<songs.length; i++){
    var element = '<div class="myslides fade">' + songs[i].innerHTML + '</div>'
    arr.push(element);
  }
  sessionStorage.setItem("songs",JSON.stringify(arr));
};

function buttonClick(btn) {
    const activeBtn = document.querySelector(".active");
    if (activeBtn !== null) {
        activeBtn.classList.remove("active");
    }
    btn.classList.add("active");
    if (document.getElementsByClassName("setime")[0].firstElementChild.firstElementChild.innerHTML !== "Set time"){
        const playBtn = document.getElementById("play");
        const saveBtn = document.getElementById("save");
        playBtn.disabled=false;
        playBtn.classList.remove("inactive");
        saveBtn.disabled=false;
        saveBtn.classList.remove("inactive");
    }
};

if(document.getElementById("save")){
    document.getElementById("save").onclick=  function() {
    let mood = document.getElementsByClassName("active")[0];
    if (typeof mood !== 'undefined') {
        const time = document.getElementsByClassName("setime")[0].firstElementChild.firstElementChild.innerHTML;

        const popup = document.getElementById("popup");
        const popupTxt = document.createTextNode("Your playlist has been saved as " + mood.id + "_" + time + ".");
        popup.appendChild(popupTxt);
        console.log(popup.innerHTML)
        popup.classList.add("open-popup");
        setTimeout(function(){ popup.classList.remove("open-popup") ; popup.removeChild(popup.firstChild)},2000);

        var data = JSON.parse(sessionStorage.getItem("playlists"));
        console.log(data)
        const newPlaylist = {"name": mood.id + "_" + time, "mood": mood.id, "time": time}
        data.push(newPlaylist);
        sessionStorage.setItem("playlists", JSON.stringify(data));
    } else {
        alert("Please select a mood");
    }
};}
var buttonplay = document.getElementById("play-pause");
function playpause() {
  let icon = buttonplay.querySelector(".icons");
  let name = icon.getAttribute("name");
  if (name == 'caret-forward-outline'){
    icon.setAttribute("name","pause-outline");
  }
  else {
    icon.setAttribute("name","caret-forward-outline");
  }
};

function openPlaylists(){
    const data = sessionStorage.getItem("playlists");
    console.log(data)
    const playlists = JSON.parse(data);
    console.log(playlists)
    if (playlists.length == 0){
      let text = document.createTextNode("No playlists were created.");
      document.getElementById("playlists").appendChild(text);

      let a = document.createElement("a");
      let btn = document.createElement("button");
      let createTxt = document.createTextNode("Create playlist");
      btn.appendChild(createTxt);
      a.setAttribute("href","create.html");
      a.appendChild(btn);
      document.getElementById("playlists").appendChild(a);
    }
    else {
      for (i=0; i<playlists.length; i++){
        let p = playlists[i].name;

        let text = document.createTextNode(p);
        let a = document.createElement("a");
        a.setAttribute("href","playlistsongs.html");

        let btn = document.createElement("button");

        btn.appendChild(text);
        btn.setAttribute("onclick","choosePlaylist(this)");

        a.appendChild(btn);

        document.getElementById("playlists").appendChild(a);
      }
    }
};

//HORAS

function display_c(){
    var refresh=1000;
    mytime=setTimeout('display_ct()',refresh);
};
    
function display_ct() {
    var x = new Date()
    var hour=x.getHours();
    var minute=x.getMinutes();
    if(hour < 10 ) {hour='0'+hour;}
    if(minute < 10 ) {minute='0' + minute;}
    var x1 = hour+':'+minute;
    document.getElementById("hour").innerHTML = x1;
    display_c();
};


// Hour numbers
const hourNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// Minute numbers
const minuteNumbers = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

// Default state
let isHourSelected = true;
if(document.querySelector("#clock")){
    showHourNumbers();

    // Click event listener for clock face
    document.querySelector("#clock").addEventListener("click", (event) => {
        const centerX = event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2;
        const centerY = event.currentTarget.offsetTop + event.currentTarget.offsetHeight / 2;
        const angle = Math.atan2(event.pageY - centerY, event.pageX - centerX);
        const degrees = angle * (180 / Math.PI) + 100;
        const normalizedDegrees = (degrees + 360) % 360;
  
        document.getElementById("hand").style.transform = 'translateX(-50%) rotate(' + Math.floor(normalizedDegrees / 30) * 30 +'deg)';
        if (isHourSelected) {
          const hour = Math.floor(normalizedDegrees / 30);
          selectedHour = hourNumbers[hour];
          showMinuteNumbers();
        } else {
            const minute = Math.floor(normalizedDegrees / 30);
            selectedMinute = minuteNumbers[minute];
            sessionStorage.setItem("selectedHour", selectedHour);
            sessionStorage.setItem("selectedMinute", selectedMinute);
            window.location.href = 'create.html';
        }
  });
    
}

const setimeButton = document.querySelector(".setime button");
if (setimeButton && sessionStorage.getItem("selectedHour")) {
    setimeButton.textContent = sessionStorage.getItem("selectedHour") + ':' + sessionStorage.getItem("selectedMinute");
}

// Shows the hour numbers on the clock face
function showHourNumbers() {
    isHourSelected = true;
    document.querySelector("#numbers").innerHTML = "";
    hourNumbers.forEach((hour, index) => {
      const numberElement = document.createElement("div");
      numberElement.classList.add("number");
      numberElement.innerText = hour;
      numberElement.style.position = 'absolute';
      numberElement.style.transform = `translate(-16px, -16px) rotate(${index * 30}deg) translate(0, -350%) rotate(-${index * 30}deg)`;
      document.querySelector("#numbers").appendChild(numberElement);
    });
  }
  
  // Shows the minute numbers on the clock face
  function showMinuteNumbers() {
    isHourSelected = false;
    document.querySelector("#numbers").innerHTML = "";
    minuteNumbers.forEach((minute, index) => {
      const numberElement = document.createElement("div");
      numberElement.classList.add("number");
      numberElement.innerText = minute;
      numberElement.style.position = 'absolute';
      numberElement.style.transform = `translate(-16px, -16px) rotate(${index * 30}deg) translate(0, -350%) rotate(-${index * 30}deg)`;
      document.querySelector("#numbers").appendChild(numberElement);
    });
  }

var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    if (n==1){
      const data = sessionStorage.getItem("songs");
      const songs = JSON.parse(data);
      songs.push(songs.splice(0,1)[0]);
      sessionStorage.setItem("songs",JSON.stringify(songs));
    }
    else{
      const data = sessionStorage.getItem("songs");
      const songs = JSON.parse(data);
      songs.unshift(songs.pop());
      sessionStorage.setItem("songs",JSON.stringify(songs));
    }
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("myslides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
    slides[slideIndex-1].style.display = "block";

    dots[slideIndex-1].className += " active";
  }

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
      for (i=0; i<playlists.length; i++){
        if (playlists[i].name == name){
          playlists.splice(i,1);
          sessionStorage.setItem("playlists", JSON.stringify(playlists));
        }
      }
      window.location.replace("playlists.html");
    }
    closeConfirmBox();
  };

function choosePlaylist(btn){
    const name = btn.innerHTML;
    sessionStorage.setItem("playlistname",JSON.stringify(name));
};

function openPlaylistSongs(){
  let playlistname = sessionStorage.getItem("playlistname");
  document.getElementById("playlisttitle").innerHTML = playlistname;

  const data = sessionStorage.getItem("playlists");
  const playlists = JSON.parse(data);

  let name = JSON.parse(playlistname);

  for (i=0; i<playlists.length; i++){
    if (playlists[i].name==name){
      document.getElementById("duration").innerHTML = "Duration: " + playlists[i].time;
    }
  }
};

function openSongs(){
  var data = sessionStorage.getItem("songs");
  var songs = JSON.parse(data);
  let element= document.getElementById("music").innerHTML
  for (i=0; i<songs.length;i++){
    element += songs[i];
  }
};
