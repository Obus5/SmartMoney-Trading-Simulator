// ======================================
// SMARTMONEY ACCOUNT
// ======================================

const account={

    cash:100000000,
    equity:100000000,

    profit:0,
    realized:0,
    unrealized:0,

    loan:0,
    interest:0,

    buyingPower:100000000,

    marginLevel:999

};

function updateAccount(){

    account.unrealized = 0;
    account.equity = account.cash;

    portfolio.forEach(item=>{

        const marketValue =
            item.lastPrice * item.lot * 100;

        account.equity += marketValue;

        account.unrealized +=
            (item.lastPrice-item.avgPrice)
            * item.lot * 100;

    });

    account.profit =
        account.realized +
        account.unrealized;
        

    // ======================================
    // LOAN LIMIT
    // ======================================

    const maxLoan = account.equity;

    account.buyingPower =
        account.cash +
        (maxLoan-account.loan);
        // ======================
        // Margin Level
        // ======================

    if(account.loan>0){

        account.marginLevel =
            (account.equity/account.loan)*100;

    }else{

        account.marginLevel = 999;

    }

    // ======================================
    // CURRENT RATE
    // ======================================

    let currentRate = "-";

    if(account.loan > 0){

        const rate = getDailyInterestRate();

        currentRate =
            (rate*100).toFixed(2) + "% / Day";

    }

    // ======================================
    // UPDATE ACCOUNT
    // ======================================

    const cashEl = document.getElementById("cash");
    if(cashEl){
        cashEl.innerHTML =
        "Rp " + Math.round(account.cash).toLocaleString("id-ID");
    }

    const equityEl = document.getElementById("equity");
    if(equityEl){
        equityEl.innerHTML =
        "Rp " + Math.round(account.equity).toLocaleString("id-ID");
    }

    const loanEl = document.getElementById("loan");
    if(loanEl){
        loanEl.innerHTML =
        "Rp " + Math.round(account.loan).toLocaleString("id-ID");
    }

    const currentRateEl =
        document.getElementById("currentRate");

    if(currentRateEl){

        currentRateEl.innerHTML =
        currentRate;

    }

    const buyingPowerEl =
        document.getElementById("buyingPower");

    if(buyingPowerEl){
        buyingPowerEl.innerHTML =
        "Rp " + Math.round(account.buyingPower).toLocaleString("id-ID");
    }

    const profitEl =
        document.getElementById("profit");

    if(profitEl){
        profitEl.innerHTML =
        "Rp " + Math.round(account.profit).toLocaleString("id-ID");
    }

    const maxLoanEl =
        document.getElementById("maxLoan");

    if(maxLoanEl){
        maxLoanEl.innerHTML =
        "Rp " + Math.round(maxLoan).toLocaleString("id-ID");
    }

    const availableLoanEl =
        document.getElementById("availableLoan");

    if(availableLoanEl){
        availableLoanEl.innerHTML =
        "Rp " + Math.round(maxLoan-account.loan).toLocaleString("id-ID");
    }
        // ======================
        // Margin Level
        // ======================

    const marginEl =
    document.getElementById("marginLevel");

    if(marginEl){

        marginEl.innerHTML =
            account.loan>0
            ? account.marginLevel.toFixed(1)+"%"
            : "-";

    }
    // ======================
    // Margin Status
    // ======================

const marginStatus =
document.getElementById("marginStatus");

if(marginStatus){

    if(account.loan<=0){

        marginStatus.innerHTML = "SAFE";
        marginStatus.className = "green";

    }

    else if(account.marginLevel >= 150){

        marginStatus.innerHTML = "SAFE";
        marginStatus.className = "green";

    }

    else if(account.marginLevel >= 130){

        marginStatus.innerHTML = "WARNING";
        marginStatus.className = "yellow";

    }

    else if(account.marginLevel >= 110){

        marginStatus.innerHTML = "MARGIN CALL";
        marginStatus.className = "orange";

    }

    else{

        marginStatus.innerHTML = "FORCE SELL";
        marginStatus.className = "red";

    }

}
    // ======================
    // Check Margin Call
    // ======================

    if(typeof checkMarginCall === "function"){

        checkMarginCall();

    }

}