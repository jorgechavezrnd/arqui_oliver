const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const APIRESTController = require('./presentation/apiRest/controller/api_rest_controller');

function setUpDatabase() {
    return new Promise(resolve => {
        if (!fs.existsSync('./db/companydb.db')) {
            let db = new sqlite3.Database('./db/companydb.db', (err) => {
                if (err) {
                    console.error(err.message);
                    process.exit();
                }
            })

            db.run(`CREATE TABLE Employee(
                id TEXT,
                name TEXT,
                type TEXT,
                isInLaborUnion BOOLEAN,
                registrationDate DATE
            )`);

            db.close();

            console.log('DATABASE CREATED');
        } else {
            console.log('DATABASE ALREADY EXIST');
        }

        resolve();
    });
}

function setUpServerVariables(server) {
    server.set('port', process.env.PORT || 3000);
}

function setUpServerMiddlewares(server) {
    server.use(express.json());
}

function setUpServerRoutes(server) {
    server.post('/registerEmployeeUseCase', (req, res) => {
        console.log('Register Employee Use Case Start');
        let apiRestController = new APIRESTController(res);

        apiRestController.registerEmployeeUseCase(req.body);

        console.log('Register Employee Use Case End');
    });
}

function startServer(server) {
    server.listen(server.get('port'), () => {
        console.log('Sever on port', server.get('port'));
    });
}

async function main() {
    await setUpDatabase();

    const server = express();
    setUpServerVariables(server);
    setUpServerMiddlewares(server);
    setUpServerRoutes(server);
    startServer(server);
}

main();