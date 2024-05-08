import 'dotenv/config.js';
import mysql from 'mysql';

const CLIENT_PASSWORD = process.env.WEBCLIENT_MYSQL_PWORD;

export function DBConnect() {

    const conn = mysql.createConnection({
        host: "localhost",
        user: "webclient",
        password: CLIENT_PASSWORD,
        database: "jmr_jacob",
        connectionLimit: 10
    });
    
    return conn
};

export function closeConn(connection) {
    connection.end((err) => {
        if (err) {
            return err
        }
        // return console.log("\n", '-'.repeat(25), "\n     connection closed\n", '-'.repeat(25), )
    })
};

