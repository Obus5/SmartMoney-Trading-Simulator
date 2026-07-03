// ======================================
// SMARTMONEY CLOCK ENGINE V2
// ======================================

let tradingDay = 1;

// Market dimulai dari 08:30
let marketHour = 8;
let marketMinute = 30;

// PRE OPEN | OPEN | CLOSED
let marketStatus = "PRE OPEN";

// ======================================
// RENDER CLOCK
// ======================================

function renderClock(){

    const clock = document.getElementById("marketClock");

    if(!clock) return;

    let color = "#ffffff";

    switch(marketStatus){

        case "PRE OPEN":
            color = "#facc15";
            break;

        case "OPEN":
            color = "#22c55e";
            break;

        case "CLOSED":
            color = "#ef4444";
            break;

    }

    clock.innerHTML = `

        <div style="color:${color};font-weight:700;line-height:1.6;">

            DAY ${tradingDay}

            <br>

            ${String(marketHour).padStart(2,"0")}:${String(marketMinute).padStart(2,"0")}

            <br>

            ${marketStatus}

        </div>

    `;

}

// ======================================
// NEXT DAY
// ======================================

function nextDay(){

    tradingDay++;

    marketHour = 8;
    marketMinute = 30;

    marketStatus = "PRE OPEN";

    // reset news
    if(typeof activeNews !== "undefined"){

        activeNews = null;
        newsTimer = 0;

        if(typeof renderNews === "function"){

            renderNews();

        }

    }

    // reset anomaly
    if(typeof anomaly !== "undefined"){

        anomaly = null;

        if(typeof renderAnomaly === "function"){

            renderAnomaly();

        }

    }

    // reset lock ARA / ARB
    if(typeof stocks !== "undefined"){

        stocks.forEach(stock=>{

    // Harga penutupan hari ini menjadi acuan besok
    stock.previousClose = stock.price;

    // Reset status ARA / ARB
    stock.lockType = null;

    // Reset status saham
    stock.status = "NORMAL";

});

    }

    document.getElementById("nextDayBtn").style.display = "none";

    renderClock();

}

// ======================================
// CLOCK LOOP
// ======================================

setInterval(()=>{

    // Kalau market sudah tutup tunggu tombol NEXT DAY
    if(marketStatus == "CLOSED"){

        return;

    }

    marketMinute++;

    if(marketMinute >= 60){

        marketMinute = 0;
        marketHour++;

    }

    // ==========================
    // PRE OPEN
    // ==========================

    if(marketHour < 9){

        marketStatus = "PRE OPEN";

    }

    // ==========================
    // OPEN
    // ==========================

    else if(marketHour < 16){

        marketStatus = "OPEN";

    }

    // ==========================
    // CLOSED
    // ==========================

    else{

        marketStatus = "CLOSED";

        document.getElementById("nextDayBtn").style.display = "block";

    }

    renderClock();

},1000);

// ======================================
// INIT
// ======================================

renderClock();

document
.getElementById("nextDayBtn")
.addEventListener("click",nextDay);