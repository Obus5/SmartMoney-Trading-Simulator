fetch("update.html")
.then(res => res.text())
.then(html => {

    document.getElementById("updateContainer").innerHTML = html;

    const btn = document.getElementById("updateBtn");
    const panel = document.getElementById("updatePanel");

    btn.addEventListener("click", function(e){

        e.stopPropagation();

        if(panel.style.display === "block"){

            panel.style.display = "none";

        }else{

            panel.style.display = "block";

        }

    });

    document.addEventListener("click", function(){

        panel.style.display = "none";

    });

    panel.addEventListener("click", function(e){

        e.stopPropagation();

    });

});