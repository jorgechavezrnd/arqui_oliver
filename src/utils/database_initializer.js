const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

class DatabaseInitializer {
    static async createDatabaseIfNotExist() {
        let executionDdlStatementsPromise = new Promise((resolve, reject) => {
            if (!fs.existsSync(path.join(process.cwd(), 'db', 'companydb.db'))) {
                let db = new sqlite3.Database(path.join(process.cwd(), 'db', 'companydb.db'), (err) => {
                    if (err) {
                        console.error(`ERROR IN CREATE DATABASE: ${err.message}`);
                        process.exit(1);
                    }
                });

                let ddlContent = fs.readFileSync(path.join(process.cwd(), 'src', 'utils', 'ddl.sql'), 'utf8');
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
}

module.exports = DatabaseInitializer;