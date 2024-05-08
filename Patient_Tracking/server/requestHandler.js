import express, { json } from 'express';
import 'dotenv/config.js';
import { RequestPatientData, RequestDepartmentsData, RequestPatientByID, RequestPatientIsolation } from './database.js';
import { DBConnect, closeConn } from './hospitalDBConn.js';
import { openDB, closeDB, writeNewJob, readJobData, updateJobStatus, getJobStatus } from './manageJobsDB.js';
import { openLoginDB, closeLoginDB, verifyLoginCreds } from './manageLogin.js';

const app = express();
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const PORT = parseInt(process.env.TEMP_PORT);
const APIKEY = process.env.APIKEY;

function authRequest(requestApiKey) {

    if (requestApiKey === APIKEY) {
        return true;
    }
    return false;
};

app.listen(
    PORT,
    () => console.log(`http://localhost:${PORT}`)
);


app.get('/patients/:apiKey', (req, res) => {

    const key = req.params;
    if (authRequest(key.apiKey)) {
        let conn = DBConnect();

        RequestPatientData(conn)
            .then(data => {
                res.status(200).send({
                    data
                });
            });

        closeConn(conn);
    } else {
        res.status(400).send({ message: 'invalid api key' });
    }
});


app.post('/patients/:apiKey', (req, res) => {

    const key = req.params;
    const id = req.body;

    if (!id) {
        res.status(400).send({ message: 'Request must include valid patient id' })
    };

    if (authRequest(key.apiKey)) {
        let stringID = parseInt(id.id)
    
        let conn = DBConnect();

        RequestPatientByID(conn, stringID)
            .then(data => {
                if (data.length != 0) {
                    res.status(200).send({
                        data
                    });
                } else {
                    res.status(200).send({ message: 'no data found' })
                }
            });

        closeConn(conn);
    } else {
        res.status(400).send({ message: 'invalid api key' });
    }
    
});


app.get('/departments/:apiKey', (req, res) => {

    const key = req.params;

    if (authRequest(key.apiKey)) {
        let conn = DBConnect();

        RequestDepartmentsData(conn)
        .then(data => {
            res.status(200).send({
                data
            });
        });

        closeConn(conn);
    } else {
        res.status(400).send({ message: 'invalid api key' });
    }
});


app.post('/new-job/:apiKey', (req, res) => {
    
    const key = req.params;
    const jobData = req.body.jobData;
    const userData = req.body.userData;
    const jobStatus = req.body.jobStatus;

    if (!jobData.patient_id) {
        res.status(400).send({ message: "invalid patient id" })
    }

    if (authRequest(key.apiKey)) {
        let hospitalConn = DBConnect();

        RequestPatientIsolation(hospitalConn, jobData.patient_id)
            .then(isolation => {
                jobData.isolation = isolation;

                let conn = openDB();
                if (writeNewJob(conn, jobData, userData, jobStatus)) {
                    res.status(200).send({
                        message: "job added successfully"
                    })
                } else {
                    res.status(202).send({
                        message: "job could not be added as patient is already part of another job"
                    })
                }
                closeDB(conn);
            })

        closeConn(hospitalConn);
    }
});


app.get('/jobs/:apiKey', (req, res) => {
    
    const key = req.params;

    if (authRequest(key.apiKey)) {

        let hospitalConn = DBConnect();

        let conn = openDB();

        readJobData(conn)
            .then(data => {

                let jobData = data[0]
                let userData = data[1]
                let statusData = data[2]

                let dataToSend = [];

                for (let i = 0; i < data[0].length; i++) {

                    jobData[i]["username"] = userData[i].username
                    jobData[i]["job_status"] = statusData[i].job_status                    

                    dataToSend.push(jobData[i])
                }

                res.status(200).send({
                    dataToSend
                })

            })
        closeDB(conn);
        closeConn(hospitalConn);
    }
});


app.post('/patient-isolation/:apiKey', (req, res) => {
    
    const key = req.params;
    const id = req.body.id;
    
    if (authRequest(key.apiKey)) {
        let conn = DBConnect();

        RequestPatientIsolation(conn, id)
            .then(data => {
                res.status(200).send({
                    data
                })
            })
        closeConn(conn);
    }
});


app.post('/login/:apiKey', (req, res) => {

    const key = req.params;
    const username = req.body.username,
          password = req.body.password

    if (authRequest(key.apiKey)) {
        
        let conn = openLoginDB();

        verifyLoginCreds(conn, [username, password])
            .then(data => {
                if (!data) {
                    res.status(200).send({
                        message: "login denied"
                    })
                } else {
                    let returnData = {
                        "f_name": data.f_name,
                        "l_name": data.l_name
                    }
                    res.status(200).send({
                        returnData
                    });
                }
            });

        closeLoginDB(conn);
    };
});


app.post('/update-job-status/:apiKey', (req, res) => {
    
    const key = req.params;
    const jobID = req.body.jobID;
    const newStatus = req.body.newStatus;

    if (authRequest(key.apiKey)) {
        let conn = openDB();

        updateJobStatus(conn, jobID, newStatus);

        res.status(200).send({
            newStatus
        })

        closeDB(conn);
    }
})


app.post('/get-job-status/:apiKey', (req, res) => {

    const key = req.params;
    const jobID = req.body.jobID;

    if (authRequest(key.apiKey)) {
        let conn = openDB();

        getJobStatus(conn, jobID)
            .then(data => {
                res.status(200).send({
                    data
                })
            })

        closeDB(conn);
    }
})