const mongoose = require('mongoose');
require('dotenv').config();
const { DB_URI, DB_PASSWORD, DB_USERNAME } = process.env;



const db_uri = DB_URI.replace(/\<username\>/g, encodeURIComponent(DB_USERNAME)).replace(/\<password\>/g, encodeURIComponent(DB_PASSWORD))

const db = (cb) => {
    mongoose.connect(
        db_uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            cb();
        }
    )
}

module.exports = db;