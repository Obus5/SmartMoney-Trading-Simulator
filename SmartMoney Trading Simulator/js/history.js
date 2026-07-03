let tradeHistory=[];

function renderHistory(){

    const table=document.getElementById("history");

    table.innerHTML="";

    tradeHistory.slice().reverse().forEach(item=>{

        table.innerHTML+=`

        <tr>

            <td>${item.code}</td>

            <td class="${item.action=="BUY"?"green":"red"}">
                ${item.action}
            </td>

            <td>${item.lot}</td>

            <td>
            Rp ${Math.round(item.buyPrice).toLocaleString("id-ID")}
            </td>

            <td>

            ${
                item.sellPrice=="-"
                ? "-"
                : "Rp "+Math.round(item.sellPrice).toLocaleString("id-ID")
            }

            </td>

            <td>

            Rp ${Math.round(item.gross).toLocaleString("id-ID")}

            </td>

            <td>

            Rp ${Math.round(item.fee).toLocaleString("id-ID")}

            </td>

            <td class="${item.profit>=0?"green":"red"}">

            Rp ${Math.round(item.profit).toLocaleString("id-ID")}

            </td>

            <td class="${item.percent>=0?"green":"red"}">

            ${item.percent.toFixed(2)}%

            </td>

            <td>${item.time}</td>            

        </tr>

        `;

    });

}