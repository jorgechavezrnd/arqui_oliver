const path = require('path');
const GetEmployeesPresenter = require(
    path.join(process.cwd(), 'src', 'domain', 'boundary', 'output', 'get_employees_presenter')
);
const APIRESTGetEmployeesViewModel = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'viewModel', 'api_rest_get_employees_view_model')
);

class APIRESTGetEmployeesPresenter extends GetEmployeesPresenter {
    constructor(apiRestGetEmployeesView) {
        super();
        this._apiRestGetEmployeesView = apiRestGetEmployeesView;
    }

    displayEmployees(response) {
        let apiRestGetEmployeesViewModel = new APIRESTGetEmployeesViewModel(response.employeesList);
        this._apiRestGetEmployeesView.sendGetEmployeesResponse(apiRestGetEmployeesViewModel);
    }
}

module.exports = APIRESTGetEmployeesPresenter;