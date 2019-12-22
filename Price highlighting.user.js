// ==UserScript==
// @name         Price highlighting
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  fas copy steam items price
// @author       damarus
// @match        https://steamcommunity.com/market/listings/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let style = document.createElement('style');
    style.type = 'text/css';
    let string = 'span.market_listing_price.market_listing_price_with_fee {color: #E10505}span.market_listing_price.market_listing_price_without_fee {display: block;color: #08B032}div#market_buyorder_info_details {display: block !important;}';
    let textNode = document.createTextNode(string);
    let head = document.getElementsByTagName('head')[0];
    style.appendChild(textNode);
    head.appendChild(style);
    // Your code here...
})();