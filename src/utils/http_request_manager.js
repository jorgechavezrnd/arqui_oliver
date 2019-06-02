const http = require('http');

class HTTPRequestManager {
    static async getEmployeesRequest() {
        let getEmployeesUseCaseRequestPromise = new Promise((resolve, reject) => {
            http.get('http://localhost:3000/getEmployeesUseCase/ALL', (resp) => {
                let data = '';
    
                resp.on('data', (chunk) => {
                    data += chunk;
                });
    
                resp.on('end', () => {
                    let employeesListResponse = JSON.parse(data).employeesList;
                    resolve(employeesListResponse);
                });
            }).on('error', (err) => {
                console.error(`ERROR ON INDEX GET REQUEST: ${err.message}`);
                process.exit(1);
            });
        });
    
        let employeesListResponse = await getEmployeesUseCaseRequestPromise;
        let employeesType = {
            'F': 'Fijo',
            'H': 'Por hora',
            'C': 'Por comisión'
        };
        let employeesList = [];
    
        employeesListResponse.forEach((employee) => {
            employeesList.push({
                id: employee.id,
                name: employee.name,
                type: employeesType[employee.type],
                isInLaborUnion: employee.isInLaborUnion ? 'Si' : 'No',
                registrationDate: employee.registrationDate
            });
        });

        return employeesList;
    }
}

module.exports = HTTPRequestManager;