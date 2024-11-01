// ==UserScript==
// @name         隐藏tracker.network的贴片广告
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  隐藏tracker系列游戏信息显示网站的贴片广告和Premium广告
// @match        *://*.tracker.network/*
// @match        *://*.tracker.gg/*
// @match        *://destinytracker.com/*
// @match        *://fortnitetracker.com/*
// @match        *://halotracker.com/*
// @match        *://battlefieldtracker.com/*
// @match        *://realmtracker.com/*
// @grant        none
// @downloadURL  https://cdn.bili33.top/gh/GamerNoTitle/TemperMonkeyScript@master/Hide-Ads-on-Tracker-Network.js
// @updateURL    https://cdn.bili33.top/gh/GamerNoTitle/TemperMonkeyScript@master/Hide-Ads-on-Tracker-Network.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to hide elements
    function hideElements() {
        // Hide all iframe elements
        const iframes = document.getElementsByTagName('iframe');
        for (let iframe of iframes) {
            if (iframe.style.display !== 'none') {
                iframe.style.display = 'none';
            }
        }

        // Hide all elements with class 'bordered-davert'
        const borderedElements = document.getElementsByClassName('bordered-davert');
        for (let element of borderedElements) {
            if (element.style.display !== 'none') {
                element.style.display = 'none';
            }
        }

        // Hide all elements with class 'upo-label'
        const upolabelElements = document.getElementsByClassName('upo-label');
        for (let element of upolabelElements) {
            if (element.style.display !== 'none') {
                element.style.display = 'none';
            }
        }

        // Hide all elements with class 'ad-container'
        const adElements = document.getElementsByClassName('ad-container');
        for (let element of adElements) {
            if (element.style.display !== 'none') {
                element.style.display = 'none';
            }
        }
    }

    // Initial hide on page load
    hideElements();

    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(hideElements);
    observer.observe(document.body, { childList: true, subtree: true });
})();
