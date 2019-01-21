// ==UserScript==
// @name         TTMIK download everything from downloads page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Download everything with a reasonable name
// @author       Bryan Smith
// @match        https://www.talktomeinkorean.com/mypage/downloads
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function() {
        setTimeout(function() {
            console.log("Downloading everything from your TTMIK downloads page");
            var downloads = document.querySelectorAll("a[href$=mp3]");
            for(var i = 0; i < downloads.length; i++) {
                var name = downloads[i].previousSibling.innerText;
                // console.log("Would have downloaded: " + name);
                GM_download({
                    name: name,
                    url: downloads[i].href,
                    onload: function(r) {
                        console.error("Success, downloaded "+name);
                    },
                    onerror: function(r) {
                        console.error("Failed to download "+name);
                    }
                });
            }
        }, 5000);
    };

})();
