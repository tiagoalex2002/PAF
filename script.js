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