// ==UserScript==
// @name         steam fast copy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  fas copy steam items price
// @author       damarus
// @match        https://steamcommunity.com/market/listings/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addListener() {
       let tables = document.querySelectorAll("table.market_commodity_orders_table");
        for (let i=0; i<tables.length; i++){
            let tbody = tables[i].getElementsByTagName("tbody")[0];
            let rows = tbody.getElementsByTagName("tr");
            for (let j=1; j<rows.length; j++){
                let td = rows[j].getElementsByTagName("td")[0];
                td.style.cursor = "pointer";
                td.style.transition="0.25s";
                td.onclick = ()=> {
                    let price = td.textContent.split(" ")[0];
                    navigator.clipboard.writeText(price)
                        .then( ()=> {
                        td.style.color = "#ffff00";
                        setTimeout ( () => {td.style.color = "#8F98A0"}, 500);
                    }
                    );
                }
            }
        }
        let summaryPrice = document.getElementsByClassName("market_commodity_order_summary");
        for (let i=0; i<summaryPrice.length; i++) {
            let priceSpan = summaryPrice[i].getElementsByClassName("market_commodity_orders_header_promote")[1];
            priceSpan.style.cursor = "pointer";
            priceSpan.style.transition="0.25s";
            priceSpan.onclick = ()=> {
                    let price = priceSpan.textContent.split(" ")[0];
                    navigator.clipboard.writeText(price)
                        .then( ()=> {
                        priceSpan.style.color = "#ffff00";
                        setTimeout ( () => {priceSpan.style.color = "#ffffff"}, 500);
                    }
                    );
                }

        }
        let buyRequest = document.getElementById("market_commodity_buyrequests");
        if (buyRequest){
            let buyRequestPrice = buyRequest.getElementsByClassName("market_commodity_orders_header_promote")[1];
            buyRequestPrice.style.cursor = "pointer";
            buyRequestPrice.style.transition="0.25s";
            buyRequestPrice.onclick = ()=> {
                let price = buyRequestPrice.textContent.split(" ")[0];
                navigator.clipboard.writeText(price)
                    .then( ()=> {
                    buyRequestPrice.style.color = "#ffff00";
                    setTimeout ( () => {buyRequestPrice.style.color = "#ffffff"}, 500);
                });
            }
        }
    }
    setInterval(addListener, 500);
    let itemName = document.getElementById("largeiteminfo_item_name");
    itemName.style.transition = "0.45s";
    itemName.style.cursor = "pointer";
    itemName.addEventListener("click", ()=> {
            navigator.clipboard.writeText(itemName.textContent)
                .then(() => {
                itemName.style.color = "#ffff00";
                setTimeout ( () => {itemName.style.color = "rgb(210, 210, 210)"}, 500);
            });
    });
})();

