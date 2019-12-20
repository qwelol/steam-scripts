// ==UserScript==
// @name         Discovery Queue spinner
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add discovery queue spinner button
// @author       Damarus
// @match        https://store.steampowered.com/explore
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let style = document.createElement('style');
    style.type = 'text/css';
    let h = '@keyframes spin {  0% { transform: rotate(0deg); }  100% { transform: rotate(360deg); }}';
    let anim = document.createTextNode(h);
    let head = document.getElementsByTagName('head')[0];
    style.appendChild(anim);
    head.appendChild(style);
            var GenerateQueue = function( queueNumber )
        {
            console.log( 'Queue #' + ++queueNumber );
            jQuery.post( 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { sessionid: g_sessionID, queuetype: 0 } ).done( function( data )
                                                                                                                                             {
                var requests = [];
                for( var i = 0; i < data.queue.length; i++ )
                {
                    requests.push( jQuery.post( 'https://store.steampowered.com/app/10', { appid_to_clear_from_queue: data.queue[ i ], sessionid: g_sessionID } ) );
                }
                jQuery.when.apply( jQuery, requests ).done( function()
                                                           {
                    if( queueNumber < 3 )
                    {
                        GenerateQueue( queueNumber );
                    }
                    else
                    {
                        window.location.reload();
                    }
                } );
            } );
        };
    let header = document.querySelector(".pageheader");
    let btn = document.createElement("div");
    let spinner = document.createElement("div");
    let marker = true;
    btn.onclick = ()=>{
        spinner.style.display = "block";
        btn.style.cursor = "default";
        if (marker){
            GenerateQueue( 0 );
            marker=!marker;
        }
    };
    btn.textContent = "spin";
    btn.classList.add("tst");
    btn.style.cssText = "position:relative; background: linear-gradient(0deg, #54712a 0%, #94c054 100%); cursor:pointer; padding: 5px 7px; text-decoration: none; border: none; border-radius: 3px; font-size: 20px; user-select:none;" ;
    spinner.style.cssText = "display:none; position: absolute; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 20px; height: 20px; top: calc(50% - 14px ); left: -40px; animation: spin 1s linear infinite;";
    btn.appendChild(spinner);
    header.appendChild(btn);
    header.style.display = "flex";
    header.style.justifyContent ="space-between";
    header.style.alignItems = "center";
})();