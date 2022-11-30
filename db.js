var MongoClient = require('mongodb').MongoClient;
var dotenv = require('dotenv');
dotenv.config();

URL = `${process.env.DBTYPE}://${process.env.DBHOST}/${process.env.DBNAME}`;

const DB_URL = URL;

class DbConnector {

    static async open(app) {

        if (this.db) {            
            return this.db;
        }

        this.db = await MongoClient.connect(process.env.DBHOST, {
            // serverSelectionTimeoutMS: 300000,
             useNewUrlParser: true, useUnifiedTopology: true
        }).then(db => {

            this.client = db;
            app.emit('db-ready'); 
            return db.db(process.env.DBNAME);
     
        })
        .catch(err => {
            console.error("Error to db", err);
            process.exit(1);
        });

    }

    close() {
        this.client.close();
    }
/*
    connect(app) {
        
        //return MongoClient.connect(DB_URL, {
        return MongoClient.connect(DB_URL, {
           // serverSelectionTimeoutMS: 300000,
            useNewUrlParser: true, useUnifiedTopology: true
        })
        .then(db => {

            this.client = db;
            app.emit('db-ready'); 
           //app.locals.dbo = db.db(process.env.DBNAME);

            return db.db(process.env.DBNAME);
     
        })
        .catch(err => {
            console.error("Error to db", err);
            process.exit(1);
        });
    }

    close() {
        this.client.close();
    }
    */
}

DbConnector.db = null;
DbConnector.client = null;

module.exports = {
    //DbConnector: DbConnector
    DbConnector
}