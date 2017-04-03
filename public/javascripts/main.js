/*  AUTHOR: Nicolas Sims
 *  VERSION: 1
 *  CREATED: 2.18.2016
 *  PURPOSE: Create a text adventure.
 */

'use strict';

class main {
    constructor() {
        main.setUp();
        this.handleContinue();
    }

    static setUp() {
        document.getElementById('loggerPage').style.display = "none";
        document.getElementById('leaderboardPage').style.display = "none";
    }

    handleContinue() {
        document.getElementById('loginSubmit').addEventListener('click', () => {
            if (document.getElementById('email').value === '' || ! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('email').value)) {
                alert(`You must provide a proper email address and password to continue.`)
            } else {
                this.performAjax('XMLHttpRequest0', JSON.stringify([document.getElementById('email').value, document.getElementById('password').value]), (response) => {
                    if (response == 'true') {
                        document.getElementById('loginPage').style.display = "none";
                        document.getElementById('loggerPage').style.display = "block";
                    } else {
                        alert('You must provide a proper email address and password to continue.');
                    }
                });
            }
        });
    }


    performAjax(requestNum, sendToNode, callback) {
        console.log('words1');
        let bustCache = '?' + new Date().getTime();
        const XHR = new XMLHttpRequest();
        XHR.open('POST', document.url  + bustCache, true);
        XHR.setRequestHeader('X-Requested-with', requestNum);
        XHR.send(sendToNode);
        XHR.onload = () => {
            if (XHR.readyState == 4 && XHR.status == 200 && callback) {
                return callback(XHR.responseText);
            }
        };
    }
}

window.onload = function() {
    new main();
};