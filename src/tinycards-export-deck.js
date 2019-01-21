// ==UserScript==
// @name         Tinycards export cards from deck
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  When on Tinycards deck "Cards" view, renders cards' contents in CSV format near top of page.
// @author       Bryan Smith
// @match        https://tinycards.duolingo.com/decks/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // The fragile stuff
    var delay = 3000;
    var selContainer = "._3dvU9";
    var selCard = "._2QLEC";
    var selVal = "._2tErK";
    var HR = "---------------------------------------------------------------";

    var exportCards = function() {
        var container = document.querySelector(selContainer);
        if (!container) {
            console.error('No cards found. You may need to refresh the page after selecting the "cards" view for a deck.');
            return;
        }
        var csv = document.createElement("div");
        csv.style.cssText = "height: 150px; border: 1px solid #aaa; background-color: #eee; padding: 1em; overflow: scroll; margin-bottom: 1em; border-radius: .5em;";
        container.prepend(csv);

        var cards = document.querySelectorAll(selCard);
        console.log("Found " + cards.length + " cards.");
        console.log(HR);
        // Anki doesn't support CSV headers, but if it did, they would be:
        //   Korean,English
        for(var i = 0; i < cards.length; i++) {
            var cardSides = cards[i].querySelectorAll(selVal);
            if (cardSides.length == 2) {
                csv.innerHTML += '"'+cardSides[0].innerText+'","'+cardSides[1].innerText+'"<br />';
            } else {
                console.error("Expected two sides, found: " + cardSides.length);
            }
        }
        console.log(HR);
    };

    setTimeout(exportCards, delay);

})();
