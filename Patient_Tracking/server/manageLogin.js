import sqlite3 from 'sqlite3';

export function openLoginDB() {
    const db = new sqlite3.Database('./login.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) return console.error(err.message)
    });
    return db;
};

export function closeLoginDB(conn) {
    conn.close((err) => {
        if (err) return console.error(err.message)
    });
};

export function verifyLoginCreds(conn, dataArray) {

    return new Promise((resolve, reject) => {
        conn.all(`SELECT * FROM login_credentials WHERE username = (?) AND password = (?)`, 
            [dataArray[0], dataArray[1]], 
            (err, rows) => {
                if (err) {
                    reject(err)
                }
                if (rows) {
                    resolve(rows[0])
                } else {
                    resolve(false)
                }
        });
    });
};

