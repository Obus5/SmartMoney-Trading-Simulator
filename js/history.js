// ======================================
// SMARTMONEY HISTORY
// ======================================

let tradeHistory = [];

function renderHistory(){

    const table = document.getElementById("history");

    if(!table) return;

    table.innerHTML = "";

    tradeHistory
    .slice()
    .reverse()
    .forEach(item=>{

        let actionColor = "";
        let actionText = item.action;

        switch(item.action){

            case "BUY":
                actionColor = "green";
                actionText = "BUY";
                break;

            case "SELL":
                actionColor = "red";
                actionText = "SELL";
                break;

            case "BORROW":
                actionColor = "blue";
                actionText = "BORROW";
                break;

            case "REPAY":
                actionColor = "orange";
                actionText = "REPAY";
                break;

            case "INTEREST":
                actionColor = "orange";
                actionText = "INTEREST";
                break;

            case "FORCE SELL":
                actionColor = "pink";
                actionText = "FORCE SELL";
                break;

            default:
                actionColor = "";
                actionText = item.action;
        }

        const buyPrice =
            item.buyPrice === "-" || item.buyPrice == null
            ? "-"
            : "Rp " + Math.round(item.buyPrice).toLocaleString("id-ID");

        const sellPrice =
            item.sellPrice === "-" || item.sellPrice == null
            ? "-"
            : "Rp " + Math.round(item.sellPrice).toLocaleString("id-ID");

        const gross =
            "Rp " + Math.round(item.gross ?? 0).toLocaleString("id-ID");

        const fee =
            "Rp " + Math.round(item.fee ?? 0).toLocaleString("id-ID");

        const profit =
            Math.round(item.profit ?? 0);

        const percent =
            Number(item.percent ?? 0);

        table.innerHTML += `

        <tr>

            <td>${item.code ?? "-"}</td>

            <td class="${actionColor}">
                ${actionText}
            </td>

            <td>${item.lot ?? "-"}</td>

            <td>${buyPrice}</td>

            <td>${sellPrice}</td>

            <td>${gross}</td>

            <td>${fee}</td>

            <td class="${profit>=0?"green":"red"}">
                Rp ${profit.toLocaleString("id-ID")}
            </td>

            <td class="${percent>=0?"green":"red"}">
                ${percent.toFixed(2)}%
            </td>

            <td>${item.time ?? "-"}</td>

        </tr>

        `;

    });

}