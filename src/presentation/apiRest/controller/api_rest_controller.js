const path = require('path');
const APIRESTRegisterEmployeeView = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'view', 'api_rest_register_employee_view')
);
const APIRESTRegisterEmployeePresenter = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'presenter', 'api_rest_register_employee_presenter')
);
const SQLiteEmployeeRepository = require(
    path.join(process.cwd(), 'src', 'repository', 'employee', 'sqlite_employee_repository')
);
const RegisterEmployeeRequest = require(
    path.join(process.cwd(), 'src', 'domain', 'dto', 'request', 'register_employee_request')
);
const RegisterEmployeeInteractor = require(
    path.join(process.cwd(), 'src', 'domain', 'interactors', 'register_employee_interactor')
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
}

module.exports = APIRESTController;