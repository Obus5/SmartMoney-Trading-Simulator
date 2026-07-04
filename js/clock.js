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

    let color="#ffffff";

    switch(marketStatus){

        case "PRE OPEN":
            color="#facc15";
            break;

        case "OPEN":
            color="#22c55e";
            break;

        case "CLOSED":
            color="#ef4444";
            break;

    }

    clock.innerHTML=`

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

    marketHour=8;
    marketMinute=30;

    marketStatus="PRE OPEN";

    // Reset News
    if(typeof activeNews!="undefined"){

        activeNews=null;
        newsTimer=0;

        if(typeof renderNews=="function"){

            renderNews();

        }

    }

    // Reset Anomaly
    if(typeof anomaly!="undefined"){

        anomaly=null;

        if(typeof renderAnomaly=="function"){

            renderAnomaly();

        }

    }

    // Reset Status Saham
    if(typeof stocks!="undefined"){

        stocks.forEach(stock=>{

            stock.previousClose=stock.price;
            stock.lockType=null;
            stock.status="NORMAL";

        });

    }

    document.getElementById("nextDayBtn").style.display="none";

    // ======================================
    // DAILY LOAN INTEREST
    // ======================================

    if(account.loan>0){

        const dailyRate=getDailyInterestRate();

        const interest=account.loan*dailyRate;

        account.interest=interest;

        account.loan+=interest;

        tradeHistory.push({

            code:"LOAN",

            action:"INTEREST",

            lot:"-",

            buyPrice:"-",

            sellPrice:"-",

            gross:interest,

            fee:0,

            profit:0,

            percent:0,

            time:`DAY ${tradingDay}`

        });

        renderHistory();

    }

    updateAccount();

    renderClock();

}

// ======================================
// CLOCK LOOP
// ======================================

setInterval(()=>{

    // Simulator belum dimulai
    if(!simulatorStarted){

        return;

    }

    // Market sudah tutup
    if(marketStatus=="CLOSED"){

        return;

    }

    marketMinute++;

    if(marketMinute>=60){

        marketMinute=0;
        marketHour++;

    }

    // PRE OPEN
    if(marketHour<9){

        marketStatus="PRE OPEN";

    }

    // OPEN
    else if(marketHour<16){

        marketStatus="OPEN";

    }

    // CLOSED
    else{

        marketStatus="CLOSED";

        document.getElementById("nextDayBtn").style.display="block";

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