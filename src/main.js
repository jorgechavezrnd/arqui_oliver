const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const APIRESTController = require('./presentation/apiRest/controller/api_rest_controller');

async function CreateDatabaseIfNotExist() {
    let executionDdlStatementsPromise = new Promise((resolve, reject) => {
        if (!fs.existsSync('./db/companydb.db')) {
            let db = new sqlite3.Database('./db/companydb.db', (err) => {
                if (err) {
                    console.error(`ERROR IN CREATE DATABASE: ${err.message}`);
                    process.exit(1);
                }
            });

            let ddlContent = fs.readFileSync('./utils/ddl.sql', 'utf8');
            let ddlStatements = ddlContent.split(';');

            ddlStatements.forEach(function(ddlStatement) {
                if (ddlStatement.includes('CREATE')) {
                    db.run(ddlStatement, [], (err, rows) => {
                        if (err) {
                            console.error(`ERROR IN DDL STATEMENT: ${err.message}`);
                            process.exit(1);
                        }
                    });
                }
            });

            db.close();

            resolve('DATABASE CREATED');
        } else {
            resolve('DATABASE ALREADY EXIST');
        }
    });

    await executionDdlStatementsPromise;
}

function setUpServerVariables(server) {
    server.set('port', process.env.PORT || 3000);
}

function setUpServerMiddlewares(server) {
    server.use(express.json());
}

function setUpServerRoutes(server) {
    server.post('/registerEmployeeUseCase', async (req, res) => {
        console.log('Register Employee Use Case Start');
        let apiRestController = new APIRESTController(res);

        await apiRestController.registerEmployeeUseCase(req.body);

        console.log('Register Employee Use Case End');
    });
}

function startServer(server) {
    server.listen(server.get('port'), () => {
        console.log('Sever on port', server.get('port'));
    });
}

async function main() {
    await CreateDatabaseIfNotExist();

    const server = express();
    setUpServerVariables(server);
    setUpServerMiddlewares(server);
    setUpServerRoutes(server);
    startServer(server);
}

main();