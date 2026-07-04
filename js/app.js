// ======================================
// SMARTMONEY APP
// ======================================
// Simulator belum dimulai
let simulatorStarted = false;
const watchlist = document.getElementById("watchlist");
const stockSelect = document.getElementById("stockSelect");

const stockName = document.getElementById("stockName");
const stockCompany = document.getElementById("stockCompany");
const lastPrice = document.getElementById("lastPrice");
const priceChange = document.getElementById("priceChange");

let selectedStock = stocks[0];

// ======================================
// LOAD WATCHLIST
// ======================================

function loadWatchlist(){

    watchlist.innerHTML = "";

    stocks.forEach(stock=>{

        watchlist.innerHTML += `

        <tr>

            <td>

                ${stock.code}

                ${
                    stock.lockType=="ARA"
                    ? '<span style="color:#22c55e;font-size:11px;font-weight:700;"> ARA</span>'

                    : stock.lockType=="ARB"
                    ? '<span style="color:#ef4444;font-size:11px;font-weight:700;"> ARB</span>'

                    : ""

                }

            </td>

            <td>

                Rp ${stock.price.toLocaleString("id-ID")}

            </td>

            <td class="${
                stock.change>=0 ? "green" : "red"
            }">

                ${
                    stock.change>0 ? "+" : ""
                }${stock.change}%

            </td>

        </tr>

        `;

    });

}


// ======================================
// LOAD DROPDOWN
// ======================================

function loadDropdown(){

    stockSelect.innerHTML = "";

    stocks.forEach(stock=>{

        stockSelect.innerHTML += `

        <option value="${stock.code}">
            ${stock.code} - ${stock.company}
        </option>

        `;

    });

}


// ======================================
// UPDATE HEADER SAHAM
// ======================================

function updateStockInfo(){

    stockName.innerHTML = `

            ${selectedStock.code}

            ${
            selectedStock.lockType=="ARA"
            ?
            '<span style="color:#22c55e">🟢 ARA</span>'
            :
            selectedStock.lockType=="ARB"
            ?
            '<span style="color:#ef4444">🔴 ARB</span>'
            :
            ""

            }
            `;

    stockCompany.innerHTML = selectedStock.company;

    lastPrice.innerHTML =
        selectedStock.price.toLocaleString("id-ID");

    priceChange.innerHTML =
        `${selectedStock.change>0?'+':''}${selectedStock.change}%`;

    priceChange.className =
        selectedStock.change>=0 ? "green" : "red";

}


// ======================================
// DROPDOWN EVENT
// ======================================

stockSelect.addEventListener("change",()=>{

    selectedStock =
        stocks.find(s => s.code === stockSelect.value);

    updateStockInfo();

    generateChart(selectedStock);

});

// ======================================
// INIT
// ======================================

loadWatchlist();

loadDropdown();

updateStockInfo();

renderPortfolio();

updateAccount();