require('dotenv').config({ path: "./.env"})

const express = require('express');
const mysql = require('mysql');


const CLIENT_PASSWORD = process.env.WEBCLIENT_MYSQL_PWORD;

const conn = mysql.createConnection({
    host: "localhost",
    user: "webclient",
    password: CLIENT_PASSWORD,
    database: "jmr_jacob",
    connectionLimit: 10
});

conn.query('select * from tracking_data', (err, result, fields) => {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
});

conn.end((err) => {
    if (err) {
        return console.log(err)
    }
    return console.log("\n", '-'.repeat(25), "\n     connection closed\n", '-'.repeat(25), )
})

