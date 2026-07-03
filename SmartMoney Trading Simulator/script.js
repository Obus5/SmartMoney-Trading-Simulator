setInterval(() => {

stocks.forEach(stock => {

let random = (Math.random()-0.5) * stock.volatility;

stock.price += Math.round(random * 20);

});

renderTable();

},2000);

const news = [

{
title:"BI Turunkan Suku Bunga",
effect:"BANK"
},

{
title:"Harga Emas Naik",
effect:"GOLD"
},

{
title:"Harga Batu Bara Turun",
effect:"COAL"
}

];