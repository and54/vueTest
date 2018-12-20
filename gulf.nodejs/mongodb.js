const MongoClient = require('mongodb').MongoClient;

function ConnectMongo(callBack) {
    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
        let db = null;

        if (err) console.log('ConnectMongo >>> ', err);
        else db = client.db('gulf');

        callBack(err, db, client);
    })
}

module.exports = {
    CheckUser(data, callBack) {
        ConnectMongo((err, db, client) => {
            if (err) callBack(err, null);
            else {
                db.collection('users').findOne(data, (err, result) => {
                    if (err) console.log('Login >>> ', err);
                    client.close();
                    callBack(err, result);
                })
            }
        })
    },
    Login(data, callBack) {
        ConnectMongo((err, db, client) => {
            if (err) callBack(err, null);
            else {
                db.collection('users').findOne(data, (err, result) => {
                    if (err) console.log('Login >>> ', err);
                    client.close();
                    callBack(err, result);
                })
            }
        })
    },
    InsertField(collection, data, callBack) {
        ConnectMongo((err, db, client) => {
            if (err) callBack(err, null);
            else {
                db.collection(collection).save(data, (err, result) => {
                    if (err) console.log('InsertField >>> ', err);
                    client.close();
                    callBack(err, (err ? null : 'saved to database'));
                })
            }
        })
    }
}