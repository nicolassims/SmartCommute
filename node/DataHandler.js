"use strict";

const FS = require ('fs'),
    DATASTORE = require('nedb'),
    DB = new DATASTORE({ filename: './data/log_db.json', autoload: true });

class DataHandler {
    constructor() {
        this.data = [];
    }

    static loadUserData(filePath) {
        return FS.readFileSync(filePath, 'utf8');
    }

    static findRecords(user, callback) {
        DB.find({ userID: user }, (err, docs) => {
            if (docs.length > 0) {
                callback(docs);
            } else {
                callback(false);
            }
        });
    }

    static updateData(data) {
        DB.update({ _id: data.id }, {
            userID: data.userID
            , lastName: data.lastName
            , firstName: data.firstName
            , eventDate: data.eventDate
            , miles: data.miles
        }, { upsert: true,
            returnUpdatedDocs: true });
    }

    static addData(data) {
        delete data.id;  // remove id field out of JSON parameter
        DB.insert(data);
    }

    static queryData(data) {
        DB.findOne({ _id: data.id }, (err, docs) => {
            if (docs == null) {
                DataHandler.addData(data);
            } else {
                DataHandler.updateData(data);
            }
        });
    }
}

module.exports = DataHandler;
