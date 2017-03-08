/**
 * Created by root on 2/27/2017.
 */

"use strict";

class main {
    constructor() {
        main.prepApp();
        new EventHandler();
        this.user = [];
    }

/*    static prepApp() {
        document.getElementById('log').style.display = 'none';
        document.getElementById('create').style.display = 'none';
    }*/
}

class EventHandler {
    constructor() {
        this.handleFB();
        this.handleContinue();
        this.handleCreate();
    }

/*    handleFB() {
        document.getElementById('fb').addEventListener('click', () => {
            document.getElementById('login').style.display = 'none';
            document.getElementById('log').style.display = 'block';
        });
    }*/

    handleContinue() {
        document.getElementById('continue').addEventListener('click', () => {
            if (document.getElementById('email').value === '' || ! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('email').value)) {
                EventHandler.alertId();
            } else {
                this.performAjax('XMLHttpRequest0', document.getElementById('email').value, (response) => {
                    if (response === 'false') {
                        EventHandler.alertId();
                    } else {
                        console.log('\nYAY!');
                        this.user = JSON.parse(response);
                        document.getElementById('login').style.display = 'none';
                        document.getElementById('log').style.display = 'block';
                        if (Object.prototype.toString.call(this.user) === '[object Array]') {
                            document.getElementById('name').innerHTML = `${this.user[0].firstName} ${this.user[0].lastName}`;
                        } else {
                            document.getElementById('name').innerHTML = `${this.user.firstName} ${this.user.lastName}`;
                        }
                    }
                });
            }
        });
    }

    handleCreate() {
        document.getElementById('creator').addEventListener('click', () => {
            document.getElementById('login').style.display = 'none';
            document.getElementById('create').style.display = 'block';
        });
    }

    static alertId() {
        alert('You must provide your proper email address to continue.');
    }

    performAjax(requestNum, sendToNode, callback) {
        let bustCache = '?' + new Date().getTime();
        const XHR = new XMLHttpRequest();
        XHR.open('POST', document.url  + bustCache, true);
        XHR.setRequestHeader('X-Requested-with', requestNum);
        XHR.send(sendToNode);
        XHR.onload = () => {
            if (XHR.readyState == 4 && XHR.status == 200) {
                return callback(XHR.responseText);
            }
        };
    }
}

window.addEventListener('load', () => {
    new main();
});
