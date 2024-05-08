// import { DBConnect, closeConn } from './hospitalDBConn.js';
import mysql from 'mysql';

export function RequestPatientData(connection) {
    let query = 'SELECT * FROM tracking_data';

    return new Promise ((resolve, reject) => {
            connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
};

export function RequestDepartmentsData(connection) {
    let query = 'SELECT * FROM departments_view';

    return new Promise ((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            };
            resolve(result);
        });
    });
};

export function RequestPatientByID(connection, id) {
    let query = 'SELECT * FROM tracking_data WHERE id =' + mysql.escape(id);

    return new Promise ((resolve, reject) => {
        connection.query(query, [true], (err, result) => {
            if (err) {
                reject(err);
            };
            resolve(result);
        });
    });
};

export function RequestPatientIsolation(connection, id) {

    return new Promise ((resolve, reject) => {
        RequestPatientByID(connection, id)
            .then(data => {
                resolve(data[0].isolation_level)
            });
    });
};

