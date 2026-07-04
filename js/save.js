// ======================================
// SMARTMONEY SAVE SYSTEM
// ======================================

const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");

if(saveBtn){
    saveBtn.addEventListener("click", saveGame);
}

if(resetBtn){
    resetBtn.addEventListener("click", resetGame);
}

// ======================================
// SAVE
// ======================================

function saveGame(){

    const saveData = {

        account,
        portfolio,
        tradeHistory,
        stocks,

        tradingDay,
        marketHour,
        marketMinute,
        marketStatus

    };

    localStorage.setItem(
        "SmartMoneySave",
        JSON.stringify(saveData)
    );

    showNotification(
        "💾",
        "Game Saved",

`
<div class="save-row">
    <span>📅 Day</span>
    <b>DAY ${tradingDay}</b>
</div>

<div class="save-row">
    <span>💰 Cash</span>
    <b>Rp ${Math.round(account.cash).toLocaleString("id-ID")}</b>
</div>

<div class="save-row">
    <span>📈 Total Profit</span>
    <b>Rp ${Math.round(account.profit).toLocaleString("id-ID")}</b>
</div>

<div class="save-row">
    <span>🏦 Outstanding Loan</span>
    <b>Rp ${Math.round(account.loan).toLocaleString("id-ID")}</b>
</div>

<div class="save-row">
    <span>📦 Portfolio</span>
    <b>${portfolio.length} Stocks</b>
</div>

<div class="save-row">
    <span>📝 Trading History</span>
    <b>${tradeHistory.length} Transactions</b>
</div>

<div class="save-time">
    Saved at<br>
    ${new Date().toLocaleString("id-ID")}
</div>
`
    );

} // <-- YANG KEMARIN HILANG

// ======================================
// LOAD
// ======================================

function loadGame(){

    const data = localStorage.getItem("SmartMoneySave");

    if(!data) return;

    const save = JSON.parse(data);

    Object.assign(account, save.account);

    portfolio.length = 0;
    portfolio.push(...save.portfolio);

    tradeHistory.length = 0;
    tradeHistory.push(...save.tradeHistory);

    stocks.length = 0;
    stocks.push(...save.stocks);

    tradingDay = save.tradingDay;
    marketHour = save.marketHour;
    marketMinute = save.marketMinute;
    marketStatus = save.marketStatus;

    updateAccount();
    renderPortfolio();
    renderHistory();

    loadWatchlist();
    loadDropdown();
    updateStockInfo();

    renderClock();

}

// ======================================
// RESET
// ======================================

function resetGame(){

    showNotification(

        "⚠️",
        "Reset Progress",

`
Are you sure you want to reset all progress?

This action cannot be undone.
`,

        ()=>{

            localStorage.removeItem("SmartMoneySave");
            location.reload();

        }

    );

}

// ======================================
// AUTO LOAD
// ======================================

window.addEventListener("load", loadGame);