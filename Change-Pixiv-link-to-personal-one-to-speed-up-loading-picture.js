// ==UserScript==
// @name         使用CDN加快Pixiv图片加载速度
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  将所有的i.pximg.net替换为pximg.bili33.top来加快Pixiv的图片加载速度
// @author       GamerNoTitle
// @match        *://pixiv.net/*
// @grant        none
// @icon         https://www.pixiv.net/favicon.ico
// @downloadURL  https://cdn.bili33.top/gh/GamerNoTitle/TemperMonkeyScript@master/Change-Pixiv-link-to-personal-one-to-speed-up-loading-picture.js
// @updateURL    https://cdn.bili33.top/gh/GamerNoTitle/TemperMonkeyScript@master/Change-Pixiv-link-to-personal-one-to-speed-up-loading-picture.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to replace domain in img src and a href
    function replaceDomain() {
        // Select all 'img' tags on the page
        const imgTags = document.querySelectorAll('img');
        // Iterate over each 'img' tag
        imgTags.forEach(img => {
            // Check if the src attribute contains 'i.pximg.net'
            if (img.src.includes('i.pximg.net')) {
                // Replace 'i.pximg.net' with 'pximg.bili33.top'
                img.src = img.src.replace('i.pximg.net', 'pximg.bili33.top');
            }
        });

        // Select all 'a' tags on the page
        const aTags = document.querySelectorAll('a');
        // Iterate over each 'a' tag
        aTags.forEach(a => {
            // Check if the href attribute contains 'i.pximg.net'
            if (a.href.includes('i.pximg.net')) {
                // Replace 'i.pximg.net' with 'pximg.bili33.top'
                a.href = a.href.replace('i.pximg.net', 'pximg.bili33.top');
            }
        });
    }

    // Initial domain replacement
    replaceDomain();

    // Create a MutationObserver to monitor the DOM for changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // When new nodes are added, replace the domain in img src and a href
                replaceDomain();
            }
        });
    });

    // Configure the observer to watch for changes in the entire document
    const config = { childList: true, subtree: true };

    // Start observing the document
    observer.observe(document.body, config);
})();
