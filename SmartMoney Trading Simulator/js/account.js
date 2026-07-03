// ======================================
// SMARTMONEY ACCOUNT
// ======================================

const account = {

    cash:100000000,
    equity:100000000,
    profit:0,
    realized:0,
    unrealized:0

};

function updateAccount(){

    account.unrealized=0;

    account.equity=account.cash;

    portfolio.forEach(item=>{

        const marketValue=
        item.lastPrice*item.lot*100;

        account.equity+=marketValue;

        account.unrealized+=

        (item.lastPrice-item.avgPrice)
        *item.lot*100;

    });

    account.profit=
    account.realized+
    account.unrealized;

    document.getElementById("cash").innerHTML=
    "Rp "+Math.round(account.cash).toLocaleString("id-ID");

    document.getElementById("equity").innerHTML=
    "Rp "+Math.round(account.equity).toLocaleString("id-ID");

    document.getElementById("profit").innerHTML=
    "Rp "+Math.round(account.profit).toLocaleString("id-ID");

}