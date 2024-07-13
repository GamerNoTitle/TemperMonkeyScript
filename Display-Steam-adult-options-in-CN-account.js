// ==UserScript==
// @name         国区Steam显示成人内容选项
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动去除account_setting_not_customer_facing这一class使得成人内容选项可以展示
// @author       GamerNoTitle
// @match        https://store.steampowered.com/account/preferences
// @grant        none
// @icon         https://store.steampowered.com/favicon.ico
// @downloadURL  https://cdn.bili33.top/gh/GamerNoTitle/TemperMonkeyScript@master/Display-Steam-adult-options-in-CN-account.js
// @updateURL    https://cdn.bili33.top/gh/GamerNoTitle/TemperMonkeyScript@master/Display-Steam-adult-options-in-CN-account.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove class from elements
    function removeClassFromElements() {
        // Select all elements with the class account_setting_not_customer_facing
        document.querySelectorAll('.account_setting_not_customer_facing').forEach(el => {
            el.classList.remove('account_setting_not_customer_facing');
        });
    }

    // Wait for the page to load completely
    window.addEventListener('load', removeClassFromElements);
    // Also run the function after any AJAX call (just in case the content is loaded dynamically)
    let observer = new MutationObserver(removeClassFromElements);
    observer.observe(document.body, { childList: true, subtree: true });
})();
