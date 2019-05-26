const RegisterEmployeeUseCase = require('../boundary/input/register_employee_use_case');
const RegisterEmployeeResponse = require('../dto/response/register_employee_response');
const Employee = require('../entities/employee');
const Utils = require('../utils/utils');

class RegisterEmployeeInteractor extends RegisterEmployeeUseCase {
    constructor(employeeRepository, registerEmployeePresenter) {
        super();
        this._employeeRepository = employeeRepository;
        this._registerEmployeePresenter = registerEmployeePresenter;
    }

    async registerEmployee(request) {
        let id = request.id;
        let name = request.name;
        let type = request.type;
        let isInLaborUnion = request.isInLaborUnion;
        let registrationDate = Utils.formatDate(new Date());

        let employee = new Employee(id, name, type, isInLaborUnion, registrationDate);

        let isSuccessfulRegistration = await this._employeeRepository.saveEmployee(employee);

        if (isSuccessfulRegistration) {
            let registerEmployeeResponse = new RegisterEmployeeResponse(`Empleado ${employee.name} registrado correctamente`);
            this._registerEmployeePresenter.displayRegisterSuccess(registerEmployeeResponse);
        } else {
            let registerEmployeeResponse = new RegisterEmployeeResponse(`ERROR: El empleado con el CI ${employee.id} ya existe`);
            this._registerEmployeePresenter.displayRegisterFailed(registerEmployeeResponse);
        }
    }
}

module.exports = RegisterEmployeeInteractor;