const btn = document.getElementById("closeWelcome");

btn.addEventListener("click", () => {

    document.getElementById("welcomeModal").style.display = "none";

    simulatorStarted = true;

});