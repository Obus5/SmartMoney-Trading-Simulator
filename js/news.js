// ======================================
// SMARTMONEY NEWS ENGINE
// ======================================

let activeNews = null;
let newsTimer = 0;

// ======================================
// RANDOM NEWS
// ======================================

function pickRandomNews(){

    activeNews =
        newsDatabase[
            Math.floor(Math.random()*newsDatabase.length)
        ];

    newsTimer = activeNews.duration;

    renderNews();

}

// ======================================
// RENDER NEWS
// ======================================

function renderNews(){

    const box = document.getElementById("news");

    // Sebelum jam 09:30
    if(
        marketHour < 9 ||
        (marketHour == 9 && marketMinute < 30)
    ){

        box.innerHTML = `
            <small>
            📰 News akan dimulai pukul <b>09:30</b>
            </small>
        `;
        return;
    }

    // Setelah market tutup
    if(marketHour >= 16){

        box.innerHTML = `
            <small>
            📌 Market Closed
            </small>
        `;
        return;
    }

    if(!activeNews) return;

    box.innerHTML = `

        <h4>${activeNews.title}</h4>

        <br>

        <b>Sector :</b> ${activeNews.sector}<br>

        <b>Impact :</b> ${activeNews.impact}<br>

        <b>Effect :</b>

        ${
            activeNews.effect=="bullish"
            ? "🟢 Bullish"
            : "🔴 Bearish"
        }

        <br><br>

        <small>

        Berlaku ${newsTimer} detik

        </small>

    `;

}

// ======================================
// TIMER
// ======================================

setInterval(()=>{

    if(!simulatorStarted){
        return;
    }

    // Belum jam news
    if(
        marketHour < 9 ||
        (marketHour==9 && marketMinute<30) ||
        marketHour>=16
    ){

        renderNews();

        return;

    }

    if(!activeNews){

        pickRandomNews();

        return;

    }

    newsTimer--;

    if(newsTimer<=0){

        pickRandomNews();

    }

    renderNews();

},1000);

// ======================================

renderNews();