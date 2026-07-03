// ======================================
// SMARTMONEY MARKET ENGINE V5
// ======================================

let ihsg = 7245.23;

// ======================================
// MARKET ANOMALY
// ======================================

let anomaly = null;

// ======================================
// MARKET SENTIMENT
// ======================================

let marketSentiment = 0;

setInterval(()=>{

    marketSentiment += (Math.random()-0.5)*0.3;

    marketSentiment = Math.max(-1,Math.min(1,marketSentiment));

},30000);

// ======================================
// TICK SIZE BEI
// ======================================

function getTick(price){

    if(price<200) return 1;
    if(price<500) return 2;
    if(price<2000) return 5;
    if(price<5000) return 10;

    return 25;

}

// ======================================
// AUTO REJECTION
// ======================================

function getARA(price){

    if(price<=200) return 0.35;
    if(price<=5000) return 0.25;

    return 0.20;

}
// ======================================
// LIMIT ARA / ARB
// ======================================

function getUpperLimit(stock){

    const limit = getARA(stock.previousClose);

    return Math.round(

        stock.previousClose * (1 + limit)

        / getTick(stock.previousClose * (1 + limit))

    ) * getTick(stock.previousClose * (1 + limit));

}

function getLowerLimit(stock){

    const limit = getARA(stock.previousClose);

    return Math.round(

        stock.previousClose * (1 - limit)

        / getTick(stock.previousClose * (1 - limit))

    ) * getTick(stock.previousClose * (1 - limit));

}

// ======================================
// APPLY RULES
// ======================================

function applyRules(stock,newPrice){

    if(newPrice<50){

        newPrice=50;

    }

    const limit = getARA(stock.previousClose);

const ara = stock.previousClose * (1 + limit);

const arb = stock.previousClose * (1 - limit);

    if(newPrice>ara){

        newPrice=ara;

    }

    if(newPrice<arb){

        newPrice=arb;

    }

    if(newPrice<50){

        newPrice=50;

    }

    const tick=getTick(newPrice);

    return Math.round(newPrice/tick)*tick;

}

// ======================================
// GENERATE MOVEMENT
// ======================================

function generateMovement(stock){

    const m=stock.market;

    // Momentum bergerak perlahan
    m.momentum += (Math.random()-0.5)*4;

    m.momentum=Math.max(5,Math.min(95,m.momentum));

    let percent=0;

    // Pengaruh market global
    percent += marketSentiment*0.35;

    // Trend saham
    if(m.trend=="bullish"){

        percent += Math.random()*0.35;

        if(Math.random()<0.35){

            percent -= Math.random()*0.7;

        }

    }

    else if(m.trend=="bearish"){

        percent -= Math.random()*0.35;

        if(Math.random()<0.35){

            percent += Math.random()*0.7;

        }

    }

    else{

        percent += (Math.random()-0.5)*0.6;

    }

    // Momentum
    percent += ((m.momentum-50)/50)*0.25;

    // Volatility
    percent += (Math.random()-0.5)*(m.volatility/35);

    // Support
    if(m.support){

        if(stock.price<=m.support*1.02){

            percent += Math.random()*0.35;

        }

    }

    // Resistance
    if(m.resistance){

        if(stock.price>=m.resistance*0.98){

            percent -= Math.random()*0.35;

        }

    }// ======================================
// NEWS EFFECT
// ======================================

if(activeNews){

    if(
        activeNews.sector === "ALL" ||
        activeNews.sector === stock.sector
    ){

        let newsEffect =
            activeNews.min +
            Math.random() *
            (activeNews.max - activeNews.min);

        // Pengaruh berdasarkan impact
        let multiplier = 1;

        switch(activeNews.impact){

            case "Low":
                multiplier = 0.4;
                break;

            case "Medium":
                multiplier = 0.7;
                break;

            case "High":
                multiplier = 1;
                break;

            case "Extreme":
                multiplier = 1.5;
                break;

        }

        newsEffect *= multiplier;

        percent += newsEffect;

    }

}

    return percent;

}

 // ======================================
// GENERATE MARKET ANOMALY
// ======================================


// ======================================
// RENDER ANOMALY
// ======================================

function renderAnomaly(){

    const box = document.getElementById("anomalyNews");

    if(!box) return;

    if(!anomaly){

        box.innerHTML = "";

        return;

    }

    if(!anomaly.used){

        box.innerHTML = `

        🚨 <b>MARKET ALERT</b><br><br>

        <b>${anomaly.stock}</b><br>

        Bandar sedang melakukan akumulasi.

        <br><br>

        ⏳ Potensi ARA dalam

        <b>${anomaly.countdown}</b>

        detik.

        `;

    }else{

        box.innerHTML = `

        🚀 <b>${anomaly.stock}</b>

        BERHASIL ARA!

        `;

    }

}
function generateAnomaly(){

    // Masih ada anomaly
    if(anomaly) return;

    // Peluang 10%
    if(Math.random() > 0.90) return;

    const stock =
        stocks[Math.floor(Math.random()*stocks.length)];

    anomaly = {

        stock: stock.code,

        duration:30,

        countdown:10,

        used:false

    };

    renderAnomaly();

}

// ======================================
// UPDATE MARKET
// ======================================

function updateMarket(){
    if(marketStatus!="OPEN"){

    return;

}

    generateAnomaly();

    // ======================================
// UPDATE COUNTDOWN & ANOMALY
// ======================================

if(anomaly){

    anomaly.duration--;

    if(anomaly.countdown > 0){

        anomaly.countdown--;

        document.getElementById("anomalyNews").innerHTML = `

        🚨 <b>MARKET ALERT</b><br><br>

        <b>${anomaly.stock}</b> sedang mengalami
        Bandar Accumulation.

        <br><br>

        ⏳ Potensi ARA dalam
        <b>${anomaly.countdown}</b> detik.

        `;

    }

    if(anomaly.duration <= 0){

        anomaly = null;

        document.getElementById("anomalyNews").innerHTML = "";

    }

}

  stocks.forEach(stock=>{

    // ============================
    // SAHAM SEDANG LOCK ARA / ARB
    // ============================

    if(stock.lockType){

        stock.lockTimer--;

       if(stock.lockTimer <= 0){

    // ===========================
    // LEPAS ARA
    // ===========================

    if(stock.lockType=="ARA"){

        const tick = getTick(stock.price);

        // Turun 1-3 tick
        stock.price -= tick * (Math.floor(Math.random()*3)+1);

    }

    // ===========================
    // LEPAS ARB
    // ===========================

    else if(stock.lockType=="ARB"){

        const tick = getTick(stock.price);

        // Naik 1-3 tick
        stock.price += tick * (Math.floor(Math.random()*3)+1);

    }

    stock.lockType = null;

    stock.status = "NORMAL";

}

        // Selama lock harga tidak bergerak
        else{

            return;

        }

    }

    const oldPrice = stock.price;

    let percent = generateMovement(stock);

   // Kalau sedang terkena anomaly (hanya sekali)
if(
    anomaly &&
    anomaly.stock===stock.code &&
    anomaly.countdown<=0 &&
    !anomaly.used
){

    // Bandar mendorong harga sekitar 16-18%
    percent += 16 + Math.random()*2;

    anomaly.used = true;

    renderAnomaly();

}

    let newPrice =
    oldPrice * (1 + percent/100);

    newPrice =
    applyRules(stock,newPrice);
    
    stock.price = newPrice;

 stock.change =
Number((((newPrice-stock.previousClose)/stock.previousClose)*100).toFixed(2));
   // ======================================
// CEK ARA / ARB
// ======================================

const upperLimit = getUpperLimit(stock);
const lowerLimit = getLowerLimit(stock);

// Kena ARA
if(stock.price >= upperLimit){

    stock.price = upperLimit;

    stock.lockType = "ARA";

    stock.status = "ARA";

    // lock antara 5-20 menit
    stock.lockTimer =
        Math.floor(Math.random()*15)+5;

}

// Kena ARB
else if(stock.price <= lowerLimit){

    stock.price = lowerLimit;

    stock.lockType = "ARB";

    stock.status = "ARB";

    stock.lockTimer =
        Math.floor(Math.random()*15)+5;

}

// Hitung ulang persen setelah harga final
stock.change = Number(
    (
        (stock.price - stock.previousClose)
        /
        stock.previousClose
    *100).toFixed(2)
);

});
    // ======================================
    // UPDATE IHSG
    // ======================================

    ihsg += marketSentiment*1.5;

    ihsg += (Math.random()-0.5)*2;

    document.getElementById("ihsg").innerHTML=
    ihsg.toFixed(2);

    // ======================================
    // WATCHLIST
    // ======================================

    loadWatchlist();

    // ======================================
    // PORTFOLIO
    // ======================================

    portfolio.forEach(item=>{

        const stock=
        stocks.find(s=>s.code===item.code);

        if(stock){

            item.lastPrice=stock.price;

        }

    });

    renderPortfolio();

    updateAccount();

    updateStockInfo();

    // ======================================
    // UPDATE CHART SEMUA SAHAM
    // ======================================

    stocks.forEach(stock=>{

        updateChart(stock);

    });

}

setInterval(updateMarket,1000);