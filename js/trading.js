// ======================================
// SMARTMONEY TRADING ENGINE
// ======================================

const buyBtn = document.getElementById("buyBtn");
const sellBtn = document.getElementById("sellBtn");

const lotInput = document.querySelector("input[type='number']");

// Fee broker
const BUY_FEE = 0.0015;
const SELL_FEE = 0.0025;


// ======================================
// BUY
// ======================================

buyBtn.addEventListener("click",()=>{

    const lot = parseInt(lotInput.value);

    if(isNaN(lot) || lot <= 0){

        showNotification(

    "⚠️",

    "Invalid Order",

    "Please enter the number of lots."

);

        return;

    }

    const value = selectedStock.price * lot * 100;

    const fee = value * BUY_FEE;

    const total = value + fee;

    if(account.cash < total){

        showNotification(

    "❌",

    "Insufficient Cash",

    "Your available cash is not enough to complete this transaction."

);

        return;

    }

    account.cash -= total;

    let stock = portfolio.find(p=>p.code===selectedStock.code);

    if(stock){

        const oldValue =
            stock.avgPrice * stock.lot * 100;

        const newValue =
            selectedStock.price * lot * 100;

       stock.avgPrice = Math.round(
    (oldValue + newValue) /
    ((stock.lot + lot) * 100)
);

        stock.lot += lot;

        stock.lastPrice = selectedStock.price;

    }else{

        portfolio.push({

            code:selectedStock.code,

            lot:lot,

            avgPrice:selectedStock.price,

            lastPrice:selectedStock.price

        });

    }

    tradeHistory.push({

    code:selectedStock.code,

    action:"BUY",

    lot:lot,

    buyPrice:Math.round(selectedStock.price),

    sellPrice:"-",

    gross:0,

    fee:Math.round(fee),

    profit:0,

    percent:0,

    time:new Date().toLocaleTimeString("id-ID")

});

renderHistory();

updateAccount();

renderPortfolio();

lotInput.value="";

showNotification(

    "🟢",

    "BUY Success",

    `Successfully purchased

${selectedStock.code}

${lot} Lot

Price : Rp ${Math.round(selectedStock.price).toLocaleString("id-ID")}

Total : Rp ${Math.round(total).toLocaleString("id-ID")}`

);

});
// ======================================
// SELL
// ======================================

sellBtn.addEventListener("click",()=>{

    const lot = parseInt(lotInput.value);

    if(isNaN(lot) || lot<=0){

        alert("Masukkan jumlah lot.");
        return;

    }

    let stock = portfolio.find(p=>p.code===selectedStock.code);

    if(!stock){

        showNotification(

    "⚠️",

    "No Holdings",

    "You do not own this stock."

);
        return;

    }

    if(stock.lot < lot){

        showNotification(

    "⚠️",

    "Insufficient Shares",

    "You don't have enough lots to sell."

);
        return;

    }

    const sellValue = selectedStock.price * lot * 100;
    const buyValue  = stock.avgPrice * lot * 100;

    const buyFee  = buyValue * BUY_FEE;
    const sellFee = sellValue * SELL_FEE;

    const totalFee = buyFee + sellFee;

    const grossProfit = sellValue - buyValue;

    const netProfit = grossProfit - totalFee;

    account.cash += sellValue - sellFee;

    account.realized += netProfit;

    const percent = (grossProfit / buyValue) * 100;

    tradeHistory.push({

        code: selectedStock.code,

        action: "SELL",

        lot: lot,

        buyPrice: Math.round(stock.avgPrice),

        sellPrice: Math.round(selectedStock.price),

        gross: Math.round(grossProfit),

        fee: Math.round(totalFee),

        profit: Math.round(netProfit),

        percent: percent,

        time: new Date().toLocaleTimeString("id-ID")

    });

    stock.lot -= lot;

    stock.lastPrice = selectedStock.price;

    if(stock.lot <= 0){

        portfolio = portfolio.filter(p=>p.code!==selectedStock.code);

    }

    renderHistory();
    updateAccount();
    renderPortfolio();

    lotInput.value="";

    showNotification(

    "💰",

    "SELL Success",

    `Successfully sold

${selectedStock.code}

${lot} Lot

Net Profit

Rp ${Math.round(netProfit).toLocaleString("id-ID")}`

);

});