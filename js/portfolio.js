// ======================================
// SMARTMONEY PORTFOLIO
// ======================================

let portfolio = [];

// ======================================
// UPDATE TABLE
// ======================================

function renderPortfolio(){

    const table = document.getElementById("portfolio");

    table.innerHTML = "";

    portfolio.forEach(item=>{

        const profit =
        (item.lastPrice-item.avgPrice) *
        item.lot * 100;

        const percent =
        ((item.lastPrice-item.avgPrice) /
        item.avgPrice) * 100;

        table.innerHTML += `

        <tr>

            <td>${item.code}</td>

            <td>${item.lot}</td>

            <td>
                Rp ${Math.round(item.avgPrice).toLocaleString("id-ID")}
            </td>

            <td>
                Rp ${Math.round(item.lastPrice).toLocaleString("id-ID")}
            </td>

            <td class="${profit>=0?'green':'red'}">

                Rp ${Math.round(profit).toLocaleString("id-ID")}

            </td>

            <td class="${percent>=0?'green':'red'}">

                ${percent.toFixed(2)}%

            </td>

        </tr>

        `;

    });

}