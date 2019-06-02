class APIRESTGetEmployeesView {
    constructor(serverResponse) {
        this._serverResponse = serverResponse;
    }

    sendGetEmployeesResponse(apiRestGetEmployeesViewModel) {
        this._serverResponse.json(apiRestGetEmployeesViewModel.employeesListJSON);
    }
}

module.exports = APIRESTGetEmployeesView;