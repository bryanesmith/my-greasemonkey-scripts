// ==UserScript==
// @name         TOPIK Guide 6000 Most Common Korean Words
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  When on TOPIK Guide 6000 Most Common Korean Words pages, renders cards' contents in CSV format near top of page.
// @author       Bryan Smith
// @match        https://www.topikguide.com/6000-most-common-korean-words-*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // The fragile stuff
    var delay = 3000;
    var selContainer = "#content";
    var HR = "---------------------------------------------------------------";

    var exportCards = function() {
        var container = document.querySelector(selContainer);
        if (!container) {
            console.error('No cards found. You may need to refresh the page after selecting the "cards" view for a deck.');
            return;
        }

        var content = '';
        var cards = document.querySelectorAll('tr');
        console.log("Found " + cards.length + " vocab.");
        console.log(HR);
        // Anki doesn't support CSV headers, but if it did, they would be:
        //   Korean,English
        for(var i = 0; i < cards.length; i++) {
            var paras = cards[i].querySelectorAll('td p');

            if (paras.length != 3) {
                paras = cards[i].querySelectorAll('td');
            }

            if (paras.length == 3) {
                var str='"'+paras[1].innerText.trim()+'","'+paras[2].innerText.trim()+'"';
                content += str + '<br />'
                console.log(str)
            } else {
                console.error("Expected three sides, found: " + paras.length);
            }
        }
        console.log(HR);

        var csv = document.createElement("div");
        csv.style.cssText = "height: 300px; border: 1px solid #aaa; background-color: #eee; padding: 1em; overflow: scroll; margin-bottom: 1em; border-radius: .5em; z-index: 9999";
        container.prepend(csv);
        csv.innerHTML = content;
    };

    setTimeout(exportCards, delay);

})();
