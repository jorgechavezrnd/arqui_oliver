const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const EmployeeRepository = require(
    path.join(process.cwd(), 'src', 'domain', 'entityGateways', 'employee_repository')
);
const Employee = require(
    path.join(process.cwd(), 'src', 'domain', 'entities', 'employee')
);

class SQLiteEmployeeRepository extends EmployeeRepository {
    constructor() {
        super();
    }

    async saveEmployee(employee) {
        let executionInsertEmployeePromise = new Promise((resolve, reject) => {
            let db = new sqlite3.Database(path.join(process.cwd(), 'db', 'companydb.db'), sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    console.error(`ERROR IN OPEN DATABASE: ${err.message}`);
                    process.exit(1);
                }
            });

            let selectEmployeeStatement = `SELECT id FROM Employee WHERE id = '${employee.id}'`;

            db.all(selectEmployeeStatement, [], (err, rows) => {
                if (err) {
                    console.error(`ERROR IN SELECT STATEMENT: ${err.message}`);
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
                            console.error(`ERROR IN INSERT STATEMENT: ${err.message}`);
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

    async getAllEmployees() {
        let executionSelectEmployeesPromise = new Promise((resolve, reject) => {
            let db = new sqlite3.Database(path.join(process.cwd(), 'db', 'companydb.db'), sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    console.error(`ERROR IN OPEN DATABASE: ${err.message}`);
                    process.exit(1);
                }
            });

            let selectEmployeeStatement = `SELECT id, name, type, isInLaborUnion, registrationDate
                                           FROM Employee`;

            db.all(selectEmployeeStatement, [], (err, rows) => {
                if (err) {
                    console.error(`ERROR IN SELECT STATEMENT: ${err.message}`);
                    process.exit(1);
                }

                let employeesList = [];

                rows.forEach((row) => {
                    let employee = new Employee(row.id, row.name, row.type, row.isInLaborUnion, row.registrationDate);
                    employeesList.push(employee);
                });

                resolve(employeesList);
            });

            db.close();
        });

        let employeesList = await executionSelectEmployeesPromise;

        return employeesList;
    }

    async getEmployeesByType(type) {
        let executionSelectEmployeesPromise = new Promise((resolve, reject) => {
            let db = new sqlite3.Database(path.join(process.cwd(), 'db', 'companydb.db'), sqlite3.OPEN_READONLY, (err) => {
                if (err) {
                    console.error(`ERROR IN OPEN DATABASE: ${err.message}`);
                    process.exit(1);
                }
            });

            let selectEmployeeStatement = `SELECT id, name, type, isInLaborUnion, registrationDate
                                           FROM Employee
                                           WHERE type = '${type}'`;

            db.all(selectEmployeeStatement, [], (err, rows) => {
                if (err) {
                    console.error(`ERROR IN SELECT STATEMENT: ${err.message}`);
                    process.exit(1);
                }

                let employeesList = [];

                rows.forEach((row) => {
                    let employee = new Employee(row.id, row.name, row.type, row.isInLaborUnion, row.registrationDate);
                    employeesList.push(employee);
                });

                resolve(employeesList);
            });

            db.close();
        });

        let employeesList = await executionSelectEmployeesPromise;

        return employeesList;
    }
}

module.exports = SQLiteEmployeeRepository;