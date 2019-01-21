// ==UserScript==
// @name         Tinycards export cards from deck
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Exports Tinycard deck's cards as a CSV to your JS console. Copy & paste everything between the horizontal lines.
// @author       Bryan Smith
// @match        https://tinycards.duolingo.com/decks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // The fragile stuff
    var delay = 3000;
    var selCard = "._2QLEC";
    var selVal = "._2tErK";
    var HR = "---------------------------------------------------------------";

    var exportCards = function() {
        var cards = document.querySelectorAll(selCard);
        console.log("Found " + cards.length + " cards.");
        console.log(HR);
        // Anki doesn't support CSV headers, but if it did, they would be:
        //   Korean,English
        for(var i = 0; i < cards.length; i++) {
            var cardSides = cards[i].querySelectorAll(selVal);
            if (cardSides.length == 2) {
                console.log('"'+cardSides[0].innerText+'","'+cardSides[1].innerText+'"');
            } else {
                console.error("Expected two sides, found: " + cardSides.length);
            }
        }
        console.log(HR);
    };

    setTimeout(exportCards, delay);

})();
