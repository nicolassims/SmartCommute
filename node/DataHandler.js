"use strict";

const IO = require('fs');

class DataHandler {
    static handleUserData(data) {
        let isTrue = 0;
        console.log('words3');
        data = JSON.parse(data);
        data = data.toString().split(/,/);
        let users = [];
        let fileReader = IO.readFileSync(`data/users.csv`, `utf8`);
        let tempArray = fileReader.toString().split(/\r?\n/);
        for (let i = 0; i < tempArray.length; i++) {
            users.push(tempArray[i].toString().split(/,/));
        }
        console.log(users);
        console.log(data);
        for (let i = 0; i < users.length; i++) {
            if (users[i][0] == data[0] && users[i][1] == data[1]) {
                isTrue = 1;
            }
        }
        if (isTrue == 1) {
            return true;
        }
    }
}

module.exports = DataHandler;