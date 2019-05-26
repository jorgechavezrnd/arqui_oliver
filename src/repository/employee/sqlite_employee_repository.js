const EmployeeRepository = require('../../domain/entityGateways/employee_repository');
const sqlite3 = require('sqlite3').verbose();

class SQLiteEmployeeRepository extends EmployeeRepository {
    constructor() {
        super();
    }

    async saveEmployee(employee) {
        let executionInsertEmployeePromise = new Promise((resolve, reject) => {
            let db = new sqlite3.Database('./db/companydb.db', sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    console.error(`ERROR IN CREATE DATABASE: ${err.message}`);
                    process.exit(1);
                }
            });

            let selectEmployeeStatement = `SELECT id FROM Employee WHERE id = '${employee.id}'`;

            db.all(selectEmployeeStatement, [], (err, rows) => {
                if (err) {
                    console.log(`ERROR IN SELECT STATEMENT: ${err.message}`);
                    process.exit(1);
                }

                if (rows.length > 0) {
                    resolve(false);
                } else {
                    let insertEmployeeStatement = `INSERT INTO Employee (
                                                        id,
                                                        name,
                                                        type,
                                                        isInLaborUnion,
                                                        registrationDate
                                                   ) VALUES (
                                                        '${employee.id}',
                                                        '${employee.name}',
                                                        '${employee.type}',
                                                        '${employee.isInLaborUnion}',
                                                        '${employee.registrationDate}'
                                                   )`;

                    db.run(insertEmployeeStatement, [], (err) => {
                        if (err) {
                            console.log(`ERROR IN INSERT STATEMENT: ${err.message}`);
                            process.exit(1);
                        }
                        resolve(true);
                    });
                }
            });

            db.close();

        });

        let isSuccessfulRegistration = await executionInsertEmployeePromise;

        return isSuccessfulRegistration;
    }
}

module.exports = SQLiteEmployeeRepository;