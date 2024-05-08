import sqlite3 from 'sqlite3';

export function openDB() {
    const db = new sqlite3.Database('./jobs.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message)
    });
    return db;
}

export function closeDB(conn) {
    conn.close((err) => {
        if (err) return console.error(err.message)
    })
}

export function writeNewJob(conn, dataArray, userData, jobStatus) {

    conn.all(`SELECT * FROM jobs WHERE patient_id = (?)`, [dataArray.patient_id], (err, rows) => {
        if (err) { 
            return console.error(err.message)
        } else if (rows.length > 0) {
            return false
        } else {
            let query = `INSERT INTO jobs (patient_id, patient_name, origin, destination, mot, creation_time, update_time, isolation) 
                 VALUES (?,?,?,?,?,?,?,?)`;

            conn.run(query, [parseInt(dataArray.patient_id), dataArray.patient_name, dataArray.origin, dataArray.destination, dataArray.mot, dataArray.time_stamp, dataArray.time_stamp, dataArray.isolation]);

            conn.get(`SELECT id FROM jobs WHERE patient_id = (?)`, [dataArray.patient_id], (err, row) => {
                if (err) { return console.error(err.message) }
                else {
                    const db = new sqlite3.Database('./jobs.db', sqlite3.OPEN_READWRITE, (err) => {
                        if (err) return console.error(err.message)
                    })

                    db.run(`INSERT INTO user_jobs (jobs_id, patient_id, username) VALUES (?,?,?)`, [row.id, parseInt(dataArray.patient_id), userData.username]);
                    db.run(`INSERT INTO job_status_lookup (job_id, job_status) VALUES (?,?)`, [row.id, jobStatus])

                    db.close((err) => {
                        if (err) return console.error(err.message)
                    })
                }
            })


            return true
        }
    })


}


function readJobs(conn) {
    let query = `SELECT * FROM jobs`;

    return new Promise((resolve, reject) => {
        conn.all(query, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

function readUserJobs(conn) {
    let query = `SELECT * FROM user_jobs`;

    return new Promise((resolve, reject) => {
        conn.all(query, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

function readJobStatusLookup(conn) {
    let query = `SELECT * FROM job_status_lookup`;

    return new Promise((resolve, reject) => {
        conn.all(query, (err, rows) =>{
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

export async function readJobData(conn) {

    return Promise.all([
        readJobs(conn),
        readUserJobs(conn),
        readJobStatusLookup(conn)
    ])
}

export function updateJobStatus(conn, job_id, new_status) {

    let query = `UPDATE job_status_lookup SET job_status = (?) WHERE job_id = (?)`;

    conn.run(query, [new_status, parseInt(job_id)]);
}


export function getJobStatus(conn, job_id) {

    let query = `SELECT job_status FROM job_status_lookup WHERE job_id = (?)`;

    return new Promise((resolve, reject) => {
        conn.get(query, [job_id], (err, row) => {
            if (err) {
                reject(err)
            }
            resolve(row)
        })
    })
}
