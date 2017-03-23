"use strict";

const FS = require('fs');

class DataHandler {
    static handleUserData(data) {
        data = JSON.parse(data);
        const FILE_PATH = 'data/users.csv';
        let users = FS.readFileSync(FILE_PATH, 'utf8');
        let user = {};
        const COLUMNS = 4;
        let tempArray, finalData = [];
        tempArray = users.split(/\r?\n/);
        for (let i = 0; i < tempArray.length; i++) {
            finalData[i] = tempArray[i].split(/,/).slice(0, COLUMNS);
        }
        for (let i = 0; i < finalData.length; i++) {
            if (data === finalData[i][0]) {
                user = JSON.stringify({
                    'email': finalData[i][0],
                    'position': finalData[i][1],
                    'lastName': finalData[i][2],
                    'firstName': finalData[i][3]
                });
                break;
            } else {
                user = 'false';
            }
        }
        return user;
    }
}

module.exports = DataHandler;