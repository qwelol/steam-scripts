// ==UserScript==
// @name         Steamawards vote
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://store.steampowered.com/steamawards?snr=1_4_wintersale__winter2019-SteamAwards
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let style = document.createElement('style');
    style.type = 'text/css';
    let h = '.steamawards_header_subtitle:hover {color:white;}';
    let anim = document.createTextNode(h);
    let head = document.getElementsByTagName('head')[0];
    style.appendChild(anim);
    head.appendChild(style);
    function vote(){
        console.log("worked");
        var a = document.getElementsByClassName("category_nominations_ctn");
        for(var i=0;i<a.length;i++)
        {
            if (a[i].getElementsByClassName("active_vote").length>0) continue;
            var n = Math.floor(Math.random() * (5));
            var b = a[i].getElementsByClassName("category_nomination  ");
            var appid = b[2*n].dataset.voteAppid;
            var voteid = 34+i;
            console.log(voteid+"  "+appid);
            $J.post('https://store.steampowered.com/salevote',{sessionid: g_sessionID, voteid: voteid, appid: appid, developerid: 0 }
                   ).done( function (data) { console.log("vote"); window.location.reload();}).fail( function() {    console.log("fail");});
        }
    }
    let subTitle = document.querySelector(".steamawards_header_subtitle");
    subTitle.style.cursor = "pointer";
    subTitle.onclick = vote;
})();