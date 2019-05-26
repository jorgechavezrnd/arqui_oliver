const EmployeeRepository = require('../../domain/entityGateways/employee_repository');
const sqlite3 = require('sqlite3').verbose();

class SQLiteEmployeeRepository extends EmployeeRepository {
    constructor() {
        super();
    }

    // saveEmployee(employee) {
    //     if (employee.id === '5') {
    //         console.log('ERROR');
    //         return false;
    //     }

    //     console.log(`(${employee.id}, ${employee.name}, ${employee.type}, ${employee.isInLaborUnion}, ${employee.registrationDate}) saved!`);

    //     return true;
    // }

    saveEmployee(employee) {
        let db = new sqlite3.Database('./db/companydb.db', (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Connected to the chinook database.|');
            }
        });

        return true;
    }
}

module.exports = SQLiteEmployeeRepository;