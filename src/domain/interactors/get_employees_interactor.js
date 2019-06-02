const path = require('path');
const GetEmployeesUseCase = require(
    path.join(process.cwd(), 'src', 'domain', 'boundary', 'input', 'get_employees_use_case')
);
const GetEmployeesResponse = require(
    path.join(process.cwd(), 'src', 'domain', 'dto', 'response', 'get_employees_response')
);

class GetEmployeesInteractor extends GetEmployeesUseCase {
    constructor(employeeRepository, getEmployeesPresenter) {
        super();
        this._employeeRepository = employeeRepository;
        this._getEmployeesPresenter = getEmployeesPresenter;
    }

    async getEmployees(request) {
        let type = request.type;
        let employeesList = null;

        if (type === 'ALL') {
            employeesList = await this._employeeRepository.getAllEmployees();
        } else {
            employeesList = await this._employeeRepository.getEmployeesByType(type);
        }

        let getEmployeesResponse = new GetEmployeesResponse(employeesList);
        this._getEmployeesPresenter.displayEmployees(getEmployeesResponse);
    }
}

module.exports = GetEmployeesInteractor;