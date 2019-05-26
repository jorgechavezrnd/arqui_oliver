const RegisterEmployeePresenter = require('../../../domain/boundary/output/register_employee_presenter');
const APIRESTRegisterEmployeeViewModel = require('../viewModel/api_rest_register_employee_view_model');

class APIRESTRegisterEmployeePresenter extends RegisterEmployeePresenter {
    constructor(apiRestRegisterEmployeeView) {
        super();
        this._apiRestRegisterEmployeeView = apiRestRegisterEmployeeView;
    }

    displayRegisterSuccess(response) {
        let apiRestRegisterEmployeeViewModel = new APIRESTRegisterEmployeeViewModel(true, response.message);
        this._apiRestRegisterEmployeeView.sendRegisterEmployeeResponse(apiRestRegisterEmployeeViewModel);
    }

    displayRegisterFailed(response) {
        let apiRestRegisterEmployeeViewModel = new APIRESTRegisterEmployeeViewModel(false, response.message);
        this._apiRestRegisterEmployeeView.sendRegisterEmployeeResponse(apiRestRegisterEmployeeViewModel);
    }
}

module.exports = APIRESTRegisterEmployeePresenter;