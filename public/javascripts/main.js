/*  AUTHOR: Nicolas Sims
 *  VERSION: 1
 *  CREATED: 2.18.2016
 *  PURPOSE: Create a text adventure.
 */

'use strict';

let leaderboard = [];

class main {
    constructor() {
        main.setUp();
        main.handleContinue();
        main.handlePageswitch();
        main.setupLeaderboard();
    }

    static setUp() {
        document.getElementById('loggerPage').style.display = "none";
        document.getElementById('leaderboardPage').style.display = "none";
    }

    static handleContinue() {
        document.getElementById('loginSubmit').addEventListener('click', () => {
            if (document.getElementById('email').value === '' || ! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('email').value)) {
                alert(`You must provide a proper email address and password to continue.`)
            } else {
                main.performAjax('XMLHttpRequest0', JSON.stringify([document.getElementById('email').value, document.getElementById('password').value]), (response) => {
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

    static setupLeaderboard() {
        document.getElementById('loggerSubmit').addEventListener('click', () => {
            if (document.getElementById('dateInput').value === '' || document.getElementById('tripInput').value === '' || document.getElementById('mileInput').value === '') {
                alert(`Please fully fill out the three required fields.`);
            } else {
                main.performAjax('XMLHttpRequest1', JSON.stringify([document.getElementById('email').value, document.getElementById('dateInput').value, document.getElementById('tripInput').value, document.getElementById('mileInput').value]), (response) => {
                    leaderboard = JSON.parse(response);
                });
            }
        });
    }

    static handlePageswitch() {
        document.getElementById('leaderboardButton').addEventListener('click', () => {
            document.getElementById('leaderboardPage').style.display = "block";
            document.getElementById('loggerPage').style.display = "none";
            for (let i = 0; i < leaderboard.length; i++) {
                if (leaderboard[i] != null) {
                    document.getElementById('username'+i).innerHTML = leaderboard[i][0];
                    document.getElementById('trips'+i).innerHTML = leaderboard[i][2];
                    document.getElementById('mileage'+i).innerHTML = leaderboard[i][3];
                }
            }
            let totalTrips = 0;
            let totalMileage = 0;
            for (let i = 0; i < leaderboard.length; i++) {
                totalTrips = totalTrips - -leaderboard[i][2];
                totalMileage = totalMileage - -leaderboard[i][3];
            }
            document.getElementById('totalTrips').innerHTML = JSON.stringify(totalTrips);
            document.getElementById('totalMileage').innerHTML = JSON.stringify(totalMileage);
        });
        document.getElementById('loggerButton').addEventListener('click', () => {
            document.getElementById('loggerPage').style.display = "block";
            document.getElementById('leaderboardPage').style.display = "none";
        });
    }

    static performAjax(requestNum, sendToNode, callback) {
        let bustCache = '?' + new Date().getTime();
        const XHR = new XMLHttpRequest();
        XHR.open('POST', document.url + bustCache, true);
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