// ==UserScript==
// @name         在大陆的Deepseek登录页面中添加Google登录方式
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  因为Deepseek会检测IP并且检测方式比较严格，导致我开规则代理无法突破此检测，遂写下该脚本，在大陆的Deepseek登录页面中添加Google登录方式
// @author       GamerNoTitle
// @match        *://chat.deepseek.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addGoogleLoginButton() {
        const wechatButtonXPath = '/html/body/div[1]/div/div[2]/div/div/div[9]';
        const wechatLoginButton = document.evaluate(wechatButtonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (wechatLoginButton) {
             // 停止观察器，避免多次添加按钮
            observer.disconnect();

            // 创建 Google 登录按钮
            const googleLoginButton = document.createElement('div');
            googleLoginButton.role = 'button';
            googleLoginButton.classList.add('ds-button', 'ds-button--secondary', 'ds-button--bordered', 'ds-button--rect', 'ds-button--block', 'ds-button--l');
            googleLoginButton.tabIndex = 0;
            googleLoginButton.style.marginBottom = '16px';
            googleLoginButton.innerHTML = `
                <div class="ds-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style="width: 16px; height: 16px;"><path fill="#4285f4" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"></path><path fill="#34a853" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M9.003 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.26c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"></path><path fill="#fbbc05" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"></path><path fill="#ea4335" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"></path></svg></div>Log in with Google
            `;
           const googleOAuthURL = 'https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=205977709770-3d0am349pfuhpv45soo1qt5o6h7cbofk.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fchat.deepseek.com%2Fapi%2Fv0%2Fusers%2Foauth%2Fgoogle%2Fcallback&response_type=code&scope=profile%20email&access_type=offline&state=N82LbezOa0SkHTsCfOumG7wvyNXzzpIUSUCu5yO05cTkpSFv7s95BpQKHmDmsx382wYS2tjPRBELZ_AHjTbWHzQq20Jug_2UExuTDIZIo_D3XX5EhrMf9YgkMQKOf_du0TDwkolnVNfsnGnq8wBBubZ_6IRXtQSbufGT4FaKBSSbDwkw2ZprtmGaFFymD0Hs_kUGKV2BkeGX8lG95U6O3o6_0QsFA4IoBKAEF9RLs6zMpwEp5T75TvFDCvJNMNChvRLNJHeh3dDzH5V8LJcVLOrHa34UAxb1NntlkXoczW5JWKWPr2t-4pKms43ZgB489MCdZmHQvBPci2dW4enblzcB2Gd-WbzMdy1r41-JHzCdF61cBPmNGNfASFOREFwB9I6dj3V4VVHdHHGd1A8P3L1F__klN3SN_fJws2SXUwdAUOAoF9qD8d-ro2flrng3qXD-WzC22g9avJW8njdUzrA5BiF4h6fkodY-6N6wosRHj-RxOl9p9H6RtqeWQSsoQbrzPUutIqj4HbULXL7jfaWf0P3dvMWb_cqdnaOSH3HZHStF0YeP-ZskqzNPXt_5SEGpEuLhoGiuoM6vM9OeRRac5GOvfpliBB0dOj2zuVlhwi8i3oL_0Ngwniz17Sg-TPppiZDF3VKSOnH-nOdUypUEr8LvxSjNolF58LZj_mW_uql7ZRJp-cWZrlkq-mY1xdQ-bEcOURtpHZjwBswwTO5fNxL_BUtsiFYspqnWCSzcIPd1xA%3D%3D&prompt=consent&service=lso&o2v=1&ddm=1&flowName=GeneralOAuthFlow';

            // 添加点击事件处理函数
            googleLoginButton.addEventListener('click', () => {
                window.location.href = googleOAuthURL;
            });
            // 将 Google 登录按钮插入到微信登录按钮之后
             wechatLoginButton.parentNode.insertBefore(googleLoginButton, wechatLoginButton.nextSibling);

            return;
        }
    }
    const observer = new MutationObserver(addGoogleLoginButton);
    // 监听整个body内的变化
    observer.observe(document.body, {childList: true, subtree: true});
     // 尝试直接添加，如果页面已经加载完毕，则直接添加
    addGoogleLoginButton();

})();
