// ======================================
// SMARTMONEY LOAN SYSTEM
// ======================================

const borrowBtn = document.getElementById("borrowBtn");
const repayBtn = document.getElementById("repayBtn");
// ======================================
// MARGIN CALL
// ======================================

let marginCallShown = false;

borrowBtn.addEventListener("click", borrowMoney);
repayBtn.addEventListener("click", repayMoney);

function borrowMoney(){

    const amount =
        Number(document.getElementById("borrowInput").value);

    if(amount <= 0){

        showNotification(
    "⚠️",
    "Invalid Amount",
    "Please enter a valid borrowing amount."
);

        return;

    }

    // Melebihi limit
   if(account.loan + amount > account.equity){

        showNotification(
    "❌",
    "Loan Rejected",
    "Loan exceeds your maximum borrowing limit."
);

        return;

    }

    // Tambahkan loan
    account.loan += amount;

    // Tambahkan cash
    account.cash += amount;
    tradeHistory.push({

    code:"LOAN",

    action:"BORROW",

    lot:"-",

    buyPrice:"-",

    sellPrice:"-",

    gross:amount,

    fee:0,

    profit:0,

    percent:0,

    time:new Date().toLocaleTimeString("id-ID",{

        hour:"2-digit",

        minute:"2-digit"

    })

});

renderHistory();

    // Reset input
    document.getElementById("borrowInput").value = "";

    // Refresh account
    updateAccount();
    updateLoanStatus();

   showNotification(
    "🏦",
    "Loan Approved",
    `Amount : Rp ${amount.toLocaleString("id-ID")}`
);
}
// ======================================
// REPAY MONEY
// ======================================

function repayMoney(){

    const amount =
        Number(document.getElementById("repayInput").value);

    // Input tidak valid
    if(amount <= 0){

        showNotification(
    "⚠️",
    "Invalid Amount",
    "Please enter a valid repayment amount."
);

        return;

    }

    // Tidak punya hutang
    if(account.loan <= 0){

        showNotification(
    "ℹ️",
    "No Outstanding Loan",
    "You don't have any active loan."
);

        return;

    }

    // Cash tidak cukup
    if(account.cash < amount){

        showNotification(
    "❌",
    "Insufficient Cash",
    "Your cash balance is not enough to repay the loan."
);

        return;

    }

    // Tidak boleh bayar melebihi hutang
    if(amount > account.loan){

        showNotification(
    "⚠️",
    "Invalid Repayment",
    "Repayment amount exceeds your outstanding loan."
);

        return;

    }

    // Kurangi cash
account.cash -= amount;

// Kurangi hutang
account.loan -= amount;

// Kalau hutang sudah lunas
if(account.loan <= 0){

    account.loan = 0;
    account.interest = 0;

}

// Tambahkan ke history
tradeHistory.push({

    code:"LOAN",

    action:"REPAY",

    lot:"-",

    buyPrice:"-",

    sellPrice:"-",

    gross:amount,

    fee:0,

    profit:0,

    percent:0,

    time:new Date().toLocaleTimeString("id-ID",{

        hour:"2-digit",

        minute:"2-digit"

    })

});

renderHistory();

document.getElementById("repayInput").value="";

updateAccount();
updateLoanStatus();

  showNotification(
    "💰",
    "Loan Repaid",
    `Amount : Rp ${amount.toLocaleString("id-ID")}`
);
}
// ======================================
// DAILY INTEREST RATE
// ======================================

function getDailyInterestRate(){

    if(account.loan <= 50000000){

        return 0.0003; // 0.03%

    }

    if(account.loan <= 200000000){

        return 0.0005; // 0.05%

    }

    if(account.loan <= 500000000){

        return 0.0008; // 0.08%

    }

    return 0.0012; // 0.12%

}
// ======================================
// LOAN STATUS
// ======================================

function updateLoanStatus(){

    const rateElement =
        document.getElementById("interestRate");

    if(!rateElement) return;

    if(account.loan <= 50000000){

        rateElement.innerHTML = "0.03% / Day";

    }

    else if(account.loan <= 200000000){

        rateElement.innerHTML = "0.05% / Day";

    }

    else if(account.loan <= 500000000){

        rateElement.innerHTML = "0.08% / Day";

    }

    else{

        rateElement.innerHTML = "0.12% / Day";

    }

}

// ======================================
// CHECK MARGIN CALL
// ======================================

function checkMarginCall(){

    // Tidak ada pinjaman
    if(account.loan <= 0){

        marginCallShown = false;

        return;

    }

    // ===============================
    // SAFE / WARNING
    // ===============================

    if(account.marginLevel >= 130){

        marginCallShown = false;

        return;

    }

    // ===============================
    // MARGIN CALL
    // ===============================

    if(account.marginLevel >= 110){

        if(marginCallShown) return;

        marginCallShown = true;

        showNotification(

            "⚠️",

            "Margin Call",

            `
            Your Margin Level has fallen below <b>130%</b>.

            <br><br>

            Please do one of the following:

            <br><br>

            • Deposit more cash

            <br>

            • Repay your outstanding loan

            <br>

            • Sell some stocks

            <br><br>

            Otherwise your account may be liquidated.
            `

        );

        return;

    }

    // ===============================
    // LIQUIDATION
    // ===============================

    autoLiquidation();

}
// ======================================
// AUTO LIQUIDATION
// ======================================

function autoLiquidation(){

    if(portfolio.length==0) return;

    showNotification(

        "🚨",

        "Automatic Liquidation",

        "Your Margin Level has fallen below 110%.\n\nThe broker is selling your positions until your account becomes safe."

    );

    // Urutkan saham terbesar
    portfolio.sort((a,b)=>{

        return (b.lastPrice*b.lot) -
               (a.lastPrice*a.lot);

    });

    while(

        account.marginLevel < 130 &&
        portfolio.length > 0

    ){

        liquidateStock(portfolio[0]);

    }

}
// ======================================
// LIQUIDATE STOCK
// ======================================

function liquidateStock(stock){

    const sellValue =
        stock.lastPrice * stock.lot * 100;

    const buyValue =
        stock.avgPrice * stock.lot * 100;

    const grossProfit =
        sellValue-buyValue;

    // Tambah cash hasil jual
    account.cash += sellValue;

    // Bayar loan
    const payment =
        Math.min(account.loan,account.cash);

    account.cash -= payment;

    account.loan -= payment;

    account.realized += grossProfit;

    tradeHistory.push({

        code:stock.code,

        action: "FORCE SELL",

        lot:stock.lot,

        buyPrice:Math.round(stock.avgPrice),

        sellPrice:Math.round(stock.lastPrice),

        gross:Math.round(grossProfit),

        fee:0,

        profit:Math.round(grossProfit),

        percent:
        ((stock.lastPrice-stock.avgPrice)
        /stock.avgPrice)*100,

        time:new Date().toLocaleTimeString("id-ID")

    });

    portfolio =
        portfolio.filter(
            p=>p.code!==stock.code
        );

    renderHistory();

    renderPortfolio();

    updateAccount();

}