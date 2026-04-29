// ==UserScript==
// @name         在中国大陆的Deepseek登录页面中添加Google登录方式
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  在大陆的Deepseek登录页面中添加Google登录方式
// @author       GamerNoTitle
// @match        *://chat.deepseek.com/*
// @match        *://platform.deepseek.com/*
// @grant        none
// ==/UserScript==

(function() {
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
        const container = document.querySelector(".ds-sign-in-form__social-buttons-container");
        if (!container) return;

        const buttons = container.querySelectorAll('button');
        let hasGoogle = false;

        buttons.forEach(btn => {
            if (btn.querySelector('path[fill="#4285f4"]') && !btn.hasAttribute('custom-google')) {
                hasGoogle = true;
            }
        });

        if (hasGoogle || container.querySelector('[custom-google="true"]')) return;

        const isChat = window.location.hostname === 'chat.deepseek.com';
        const baseUrl = isChat
            ? 'https://chat.deepseek.com/api/v0/users/oauth/google/authorize'
            : 'https://platform.deepseek.com/auth-api/v0/users/oauth/google/authorize';

        const shumeiVerification = isChat
            ? '{"region":"CN","rid":""}'
            : '{%22region%22:%22CN%22,%22rid%22:%22%22}';

        const deviceId = generateRandomDeviceId();
        const googleOAuthURL = `${baseUrl}?os=web&device_id=${deviceId}&shumei_verification=${shumeiVerification}`;

        const googleButton = document.createElement('button');
        googleButton.setAttribute('custom-google', 'true');
        googleButton.className = "ds-atom-button ds-basic-button ds-basic-button--outlined ds-sign-in-form__social-button";
        googleButton.style.cssText = "padding: 5px 14px; font-size: 13px; line-height: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;";

        googleButton.innerHTML = `
            <div class="ds-icon ds-atom-button__icon" style="font-size: 16px; width: 16px; height: 16px; margin-right: 0px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style="width: 16px; height: 16px;">
                    <path fill="#4285f4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34a853" d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"/>
                    <path fill="#fbbc05" d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                    <path fill="#ea4335" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"/>
                </svg>
            </div>
            <span></span>
            <div class="ds-focus-ring"></div>
        `;

        googleButton.addEventListener('click', () => {
            window.location.href = googleOAuthURL;
        });

        container.appendChild(googleButton);
    }

    const observer = new MutationObserver(() => {
        addGoogleLoginButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
