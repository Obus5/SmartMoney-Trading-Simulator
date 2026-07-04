// ======================================
// SMARTMONEY NOTIFICATION
// ======================================

let notifyAction = null;
let notificationLoaded = false;

// ======================================
// LOAD HTML
// ======================================

fetch("notification.html")
.then(res => res.text())
.then(html=>{

    document.body.insertAdjacentHTML("beforeend",html);

    notificationLoaded = true;

    document
    .getElementById("notifyButton")
    .addEventListener("click",closeNotification);

    document
    .getElementById("notifyCancel")
    .addEventListener("click",hideNotification);

});

// ======================================
// SHOW
// ======================================

function showNotification(
    icon,
    title,
    text,
    action=null,
    buttonText="Continue",
    showCancel=false
){

    if(!notificationLoaded) return;

    notifyAction = action;

    document.getElementById("notifyIcon").innerHTML = icon;
    document.getElementById("notifyTitle").innerHTML = title;
    document.getElementById("notifyText").innerHTML = text;

    document.getElementById("notifyButton").innerHTML = buttonText;

    document.getElementById("notifyCancel").style.display =
        showCancel ? "block" : "none";

    document.getElementById("notifyModal").style.display="flex";

}

// ======================================
// CONTINUE
// ======================================

function closeNotification(){

    document.getElementById("notifyModal").style.display="none";

    if(notifyAction){

        notifyAction();

        notifyAction=null;

    }

}

// ======================================
// CANCEL
// ======================================

function hideNotification(){

    document.getElementById("notifyModal").style.display="none";

    notifyAction=null;

}