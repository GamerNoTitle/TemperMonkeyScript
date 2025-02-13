// ==UserScript==
// @name         在中国大陆的Deepseek登录页面中添加Google登录方式
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  因为Deepseek会检测IP并且检测方式比较严格，导致我开规则代理无法突破此检测，遂写下该脚本，在大陆的Deepseek登录页面中添加Google登录方式
// @icon         https://cdn.deepseek.com/chat/icon.png
// @author       GamerNoTitle
// @match        *://chat.deepseek.com/*
// @match        *://platform.deepseek.com/*
// @grant        none
// @license      GPLv3
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
        let baseUrl, wechatButtonSelector, shumeiVerification;

        if (window.location.hostname === 'chat.deepseek.com') {
            baseUrl = 'https://chat.deepseek.com/api/v0/users/oauth/google/authorize';
            wechatButtonSelector = '.ds-button.ds-button--secondary.ds-button--bordered.ds-button--rect.ds-button--block.ds-button--l[style*="margin-bottom: 16px;"]';
            shumeiVerification = '{"region":"CN","rid":""}';
        } else if (window.location.hostname === 'platform.deepseek.com') {
            baseUrl = 'https://platform.deepseek.com/auth-api/v0/users/oauth/google/authorize';
            wechatButtonSelector = '.ds-button.ds-button--secondary.ds-button--bordered.ds-button--rect.ds-button--block.ds-button--l[style*="margin-bottom: 16px;"]:has(.ds-button__icon)';
            shumeiVerification = '{%22region%22:%22CN%22,%22rid%22:%22%22}';
        } else {
            return;
        }

        const wechatLoginButton = document.querySelector(wechatButtonSelector);
        var retryTimes = 0;

        if (!wechatLoginButton || !wechatLoginButton.textContent.includes('使用微信扫码登录')) {
            if(!wechatLoginButton) {
                console.warn("[Add-Google-Login-Button-on-Deekseek] 找不到微信按钮，正在重试……");
            } else {
                console.warn("[Add-Google-Login-Button-on-Deekseek] 按钮文本不匹配，正在重试……");
            }
            if (retryTimes >= 10) {
                console.error("[Add-Google-Login-Button-on-Deekseek] 已经到达最大重试次数！不再尝试添加 Google 登录按钮！");
            }
            retryTimes++;
            // observer.disconnect();
            return;
        }

        observer.disconnect();

        const googleLoginButton = document.createElement('div');
        googleLoginButton.role = 'button';
        googleLoginButton.classList.add('ds-button', 'ds-button--secondary', 'ds-button--bordered', 'ds-button--rect', 'ds-button--block', 'ds-button--l');
        googleLoginButton.tabIndex = 0;
        googleLoginButton.style.marginBottom = '16px';
        googleLoginButton.innerHTML = `<div class="ds-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style="width: 16px; height: 16px;"><path fill="#4285f4" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"></path><path fill="#34a853" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"></path><path fill="#fbbc05" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"></path><path fill="#ea4335" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"></path></svg></div>Log in with Google`;

        const deviceId = generateRandomDeviceId();    // 生成随机 deviceId，实测乱填都行
        const googleOAuthURL = `${baseUrl}?os=web&device_id=${deviceId}&shumei_verification=${shumeiVerification}`;

        googleLoginButton.addEventListener('click', () => {
            window.location.href = googleOAuthURL;
        });

        wechatLoginButton.parentNode.insertBefore(googleLoginButton, wechatLoginButton.nextSibling);
        console.info("[Add-Google-Login-Button-on-Deekseek] 成功添加了 Google 登录按钮！");
    }

    const observer = new MutationObserver(addGoogleLoginButton);
    observer.observe(document.body, { childList: true, subtree: true });
    addGoogleLoginButton();
})();
