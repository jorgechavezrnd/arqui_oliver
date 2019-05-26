const APIRESTRegisterEmployeeView = require('../view/api_rest_register_employee_view');
const APIRESTRegisterEmployeePresenter = require('../presenter/api_rest_register_employee_presenter');
const SQLiteEmployeeRepository = require('../../../repository/employee/sqlite_employee_repository');
const RegisterEmployeeRequest = require('../../../domain/dto/request/register_employee_request');
const RegisterEmployeeInteractor = require('../../../domain/interactors/register_employee_interactor');

class APIRESTController {
    constructor(serverResponse) {
        this._serverResponse = serverResponse;
    }

    registerEmployeeUseCase(serverRequestBody) {
        let id = serverRequestBody.id;
        let name = serverRequestBody.name;
        let type = serverRequestBody.type;
        let isInLaborUnion = serverRequestBody.isInLaborUnion;


        let registerEmployeeView = new APIRESTRegisterEmployeeView(this._serverResponse);
        let registerEmployeePresenter = new APIRESTRegisterEmployeePresenter(registerEmployeeView);
        let employeeRepository = new SQLiteEmployeeRepository();
        let registerEmployeeRequest = new RegisterEmployeeRequest(id, name, type, isInLaborUnion);
        let registerEmployeeUseCase = new RegisterEmployeeInteractor(employeeRepository, registerEmployeePresenter);

        registerEmployeeUseCase.registerEmployee(registerEmployeeRequest);
    }
}

module.exports = APIRESTController;