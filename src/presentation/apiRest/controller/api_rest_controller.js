const path = require('path');
const APIRESTRegisterEmployeeView = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'view', 'api_rest_register_employee_view')
);
const APIRESTGetEmployeesView = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'view', 'api_rest_get_employees_view')
);
const APIRESTRegisterEmployeePresenter = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'presenter', 'api_rest_register_employee_presenter')
);
const APIRESTGetEmployeesPresenter = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'presenter', 'api_rest_get_employees_presenter')
);
const SQLiteEmployeeRepository = require(
    path.join(process.cwd(), 'src', 'repository', 'employee', 'sqlite_employee_repository')
);
const RegisterEmployeeRequest = require(
    path.join(process.cwd(), 'src', 'domain', 'dto', 'request', 'register_employee_request')
);
const GetEmployeesRequest = require(
    path.join(process.cwd(), 'src', 'domain', 'dto', 'request', 'get_employees_request')
);
const RegisterEmployeeInteractor = require(
    path.join(process.cwd(), 'src', 'domain', 'interactors', 'register_employee_interactor')
);
const GetEmployeesInteractor = require(
    path.join(process.cwd(), 'src', 'domain', 'interactors', 'get_employees_interactor')
);

class APIRESTController {
    constructor(serverResponse) {
        this._serverResponse = serverResponse;
    }

    async registerEmployeeUseCase(serverRequestBody) {
        let id = serverRequestBody.id;
        let name = serverRequestBody.name;
        let type = serverRequestBody.type;
        let isInLaborUnion = serverRequestBody.isInLaborUnion;


        let registerEmployeeView = new APIRESTRegisterEmployeeView(this._serverResponse);
        let registerEmployeePresenter = new APIRESTRegisterEmployeePresenter(registerEmployeeView);
        let employeeRepository = new SQLiteEmployeeRepository();
        let registerEmployeeRequest = new RegisterEmployeeRequest(id, name, type, isInLaborUnion);
        let registerEmployeeUseCase = new RegisterEmployeeInteractor(employeeRepository, registerEmployeePresenter);

        await registerEmployeeUseCase.registerEmployee(registerEmployeeRequest);
    }

    async getEmployeesUseCase(serverRequestParams) {
        let type = serverRequestParams.type;

        let getEmployeesView = new APIRESTGetEmployeesView(this._serverResponse);
        let getEmployeesPresenter = new APIRESTGetEmployeesPresenter(getEmployeesView);
        let employeeRepository = new SQLiteEmployeeRepository();
        let getEmployeesRequest = new GetEmployeesRequest(type);
        let getEmployeesUseCase = new GetEmployeesInteractor(employeeRepository, getEmployeesPresenter);

        await getEmployeesUseCase.getEmployees(getEmployeesRequest);
    }
}

module.exports = APIRESTController;