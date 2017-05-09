"use strict";

const IO = require(`fs`);
const DATASTORE = require('nedb');
const DB = new DATASTORE({ filename: 'data/log_db.json', autoload: true });

let userTrips = [];
let users = [];

class DataHandler {
    static handleUserSignup(data) {
        data = JSON.parse(data);
        data = data.toString().split(/,/);
        for (let i = 0; i < users.length; i++) {
            if (data[0] == users[i][0]) {
                return 1;
            }
        }
        users.push(data);
        return users;
    }

    static handleUserData(data) {
        let isTrue = 0;
        data = JSON.parse(data);
        data = data.toString().split(/,/);
        for (let i = 0; i < users.length; i++) {
            if (users[i][0] == data[0] && users[i][1] == data[1]) {
                isTrue = 1;
            }
        }
        if (isTrue == 1) {
            return true;
        }
    }

    static handleUserTrips(data) {
        let alreadyPresent = false;
        let tempdata = JSON.parse(data).toString().split(/,/);
        if (userTrips.length == 0) {
            userTrips[0] = tempdata;
        } else {
            for (let i = 0; i < userTrips.length; i++) {
                if (tempdata[0] == userTrips[i][0]) {
                    userTrips[i][2] = userTrips[i][2] - -tempdata[2];
                    userTrips[i][3] = userTrips[i][3] - -tempdata[3];
                    alreadyPresent = true;
                }
            }
            if (alreadyPresent != true) {
                userTrips[userTrips.length] = tempdata;
            }
        }
        for (let i = 0; i < userTrips.length; i++) {
            if (i != 0) {
                if (userTrips[i][3] - -userTrips[i][2] > userTrips[i - 1][3] - -userTrips[i - 1][2]) {
                    let holder = userTrips[i - 1];
                    userTrips[i - 1] = userTrips[i];
                    userTrips[i] = holder;
                    i = 0;
                }
            }
        }
        return userTrips;
    }
}

module.exports = DataHandler;