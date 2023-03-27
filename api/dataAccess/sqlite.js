var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "../db/database.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    console.log("Error during connecting to db...", err)
}
);

module.exports = db;