// ======================================
// SMARTMONEY CHART V3
// ======================================

const chartContainer = document.getElementById("chart");

const chart = LightweightCharts.createChart(chartContainer, {

    width: chartContainer.clientWidth,
    height: 420,

    layout:{
        background:{ color:"#1e293b" },
        textColor:"#94a3b8"
    },

    grid:{
        vertLines:{ color:"rgba(255,255,255,.05)" },
        horzLines:{ color:"rgba(255,255,255,.05)" }
    },

    rightPriceScale:{
        borderColor:"#334155"
    },

    timeScale:{
        borderColor:"#334155",
        timeVisible:true
    }

});

const candleSeries = chart.addCandlestickSeries({

    upColor:"#22c55e",
    downColor:"#ef4444",

    borderUpColor:"#22c55e",
    borderDownColor:"#ef4444",

    wickUpColor:"#22c55e",
    wickDownColor:"#ef4444"

});

// ======================================
// DATABASE CANDLE
// ======================================

let chartData = {};

// ======================================
// INIT DATA
// ======================================

function createChartData(stock){

    const candles=[];

    let price=stock.price;

    let time=Math.floor(Date.now()/1000)-6000;

    for(let i=0;i<100;i++){

        const open=price;

        const close=open+(Math.random()-0.5)*(stock.price*0.002);

        const high=Math.max(open,close)+stock.price*0.001;

        const low=Math.min(open,close)-stock.price*0.001;

        candles.push({

            time,

            open,

            high,

            low,

            close

        });

        price=close;

        time+=60;

    }

    chartData[stock.code]=candles;

}

stocks.forEach(createChartData);

// ======================================
// PINDAH SAHAM
// ======================================

function generateChart(stock){

    if(!chartData[stock.code]) return;

    candleSeries.setData(chartData[stock.code]);

    // reset skala harga
    chart.priceScale("right").applyOptions({
        autoScale: true
    });

    chart.timeScale().fitContent();

}

// ======================================
// UPDATE CANDLE
// ======================================

function updateChart(stock){
    if(stock.lockType){

    return;

}

    const candles = chartData[stock.code];

    if(!candles) return;

    let last = candles[candles.length - 1];

    // update candle yang sedang berjalan
    last.high = Math.max(last.high, stock.price);

    last.low = Math.min(last.low, stock.price);

    last.close = stock.price;

    // kalau chart sedang dibuka
    if(selectedStock.code === stock.code){

        candleSeries.update(last);

    }

}
setInterval(()=>{

    stocks.forEach(stock=>{

        const candles = chartData[stock.code];

        const last = candles[candles.length-1];

        candles.push({

            time:last.time+60,

            open:last.close,

            high:last.close,

            low:last.close,

            close:last.close

        });

        if(candles.length>120){

            candles.shift();

        }

        if(selectedStock.code===stock.code){

            candleSeries.setData(candles);

        }

    });

},10000);

// ======================================

generateChart(stocks[0]);

window.addEventListener("resize",()=>{

    chart.applyOptions({

        width:chartContainer.clientWidth

    });

});