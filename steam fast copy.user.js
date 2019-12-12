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
            let tbody = tables[i].children[0];
            for (let j=1; j<tbody.children.length; j++){
                let tr = tbody.children[j];
                let th = tr.children[0];
                th.style.cursor = "pointer";
                th.style.transition="0.25s";
                th.onclick = ()=> {
                    let price = th.textContent.split(" ")[0];
                    navigator.clipboard.writeText(price)
                        .then( ()=> {
                        th.style.color = "#ffff00";
                        setTimeout ( () => {th.style.color = "#8F98A0"}, 500);
                    }
                    );
                }
            }
        }
        let summaryPrice = document.getElementsByClassName("market_commodity_order_summary");
        for (let i=0; i<summaryPrice.length; i++) {
            let priceSpan = summaryPrice[i].children[1];
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
            let buyRequestPrice = buyRequest.children[1];
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
        //tables[0].children[0].children[0].children[0].onclick = () => {console.log("clicked")};
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

