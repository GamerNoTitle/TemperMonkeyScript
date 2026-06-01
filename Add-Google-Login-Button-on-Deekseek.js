// ==UserScript==
// @name         在中国大陆的Deepseek登录页面中添加Google登录方式
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  在大陆的Deepseek登录页面中添加Google登录方式
// @author       GamerNoTitle
// @match        *://chat.deepseek.com/*
// @match        *://platform.deepseek.com/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/525119/%E5%9C%A8%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86%E7%9A%84Deepseek%E7%99%BB%E5%BD%95%E9%A1%B5%E9%9D%A2%E4%B8%AD%E6%B7%BB%E5%8A%A0Google%E7%99%BB%E5%BD%95%E6%96%B9%E5%BC%8F.user.js
// @updateURL https://update.greasyfork.org/scripts/525119/%E5%9C%A8%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86%E7%9A%84Deepseek%E7%99%BB%E5%BD%95%E9%A1%B5%E9%9D%A2%E4%B8%AD%E6%B7%BB%E5%8A%A0Google%E7%99%BB%E5%BD%95%E6%96%B9%E5%BC%8F.meta.js
// ==/UserScript==

(function () {
    'use strict';

    function generateRandomDeviceId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let deviceId = '';
        for (let i = 0; i < 64; i++) {
            deviceId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return btoa(deviceId).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function addGoogleLoginButton() {
        const container = document.querySelector(".ds-sign-in-form__social-buttons").querySelector(".ds-sign-in-form__social-links")
        if (!container) return;

        const buttons = container.querySelectorAll("div[role='button']");
        let hasGoogle = false;

        buttons.forEach(btn => {
            if (btn.textContent == "使用 Google 账号登录") {
                hasGoogle = true;
            }
        });

        if (hasGoogle) return;

        const separator = document.createElement('span');
        separator.classList.add('ds-sign-in-form__social-link-separator');

        container.appendChild(separator);

        const isChat = window.location.hostname === 'chat.deepseek.com';
        const baseUrl = isChat
            ? 'https://chat.deepseek.com/api/v0/users/oauth/google/authorize'
            : 'https://platform.deepseek.com/auth-api/v0/users/oauth/google/authorize';

        const shumeiVerification = isChat
            ? '{"region":"CN","rid":""}'
            : '{%22region%22:%22CN%22,%22rid%22:%22%22}';

        const deviceId = generateRandomDeviceId();
        const googleOAuthURL = `${baseUrl}?os=web&device_id=${deviceId}&shumei_verification=${shumeiVerification}`;

        const googleButton = document.createElement('div');
        googleButton.setAttribute('custom-google', 'true');
        if (window.location.hostname === 'chat.deepseek.com') {
            "ds-button ds-button--primary ds-button--text ds-button--capsule ds-button--m ds-button--icon-relative-m ds-button--underlined ds-sign-in-form__social-link ds-link-button".split(" ").forEach(cls => googleButton.classList.add(cls));
        } else {
            "ds-link-button ds-sign-in-form__social-link".split(" ").forEach(cls => googleButton.classList.add(cls));
        }
        googleButton.setAttribute('role', 'button');
        googleButton.style.textUnderPosition = 'from-font';
        googleButton.setAttribute('tabindex', '0');

        const googleButtonBG = document.createElement('div');
        googleButtonBG.classList.add('ds-button__background');
        

        const googleButtonFocusRing = document.createElement('div');
        googleButtonFocusRing.classList.add('ds-focus-ring');
        googleButton.appendChild(googleButtonFocusRing);

        const googleButtonText = document.createElement('span');
        if (window.location.hostname === 'chat.deepseek.com') {
            googleButtonText.classList.add('ds-button__content');
        } else {
            googleButtonText.classList.add('ds-link-button__text');
        }
        googleButtonText.textContent = "使用 Google 账号登录";
        googleButton.appendChild(googleButtonText);

        googleButton.addEventListener('click', () => {
            window.location.href = googleOAuthURL;
        });


        if (window.location.hostname === 'chat.deepseek.com') {
            googleButton.appendChild(googleButtonBG);
            container.appendChild(googleButton);
        } else {
            container.appendChild(googleButton);
            googleButton.appendChild(googleButtonFocusRing);
        }
    }

    const observer = new MutationObserver(() => {
        addGoogleLoginButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
