if (sessionStorage.getItem("playlists") == null){
    sessionStorage.setItem("playlists",JSON.stringify([]))
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
        const newPlaylist = mood.id + "_" + time;
        data.push(newPlaylist);
        sessionStorage.setItem("playlists", JSON.stringify(data));
    } else {
        alert("Please select a mood");
    }
};}
var buttonplay = document.getElementById("play-pause");
function playpause() {
    let inner= buttonplay.innerHTML;
    console.log(inner)
    if (inner == '<ion-icon name="caret-forward-outline" class="icons md hydrated" role="img" aria-label="caret forward outline"></ion-icon>'){
        buttonplay.innerHTML = '<ion-icon name="pause-outline" class="icons"></ion-icon>';
    }
    else {
        buttonplay.innerHTML = '<ion-icon name="caret-forward-outline" class="icons"></ion-icon>';
    }
    
};

function openPlaylists(){
    const data = sessionStorage.getItem("playlists");
    console.log(data)
    const playlists = JSON.parse(data);
    console.log(playlists)
    for (i=0; i<playlists.length; i++){
        let p = playlists[i];
        let text = document.createTextNode(p);
        let btn = document.createElement("button");

        btn.appendChild(text);

        document.getElementById("playlists").appendChild(btn);
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