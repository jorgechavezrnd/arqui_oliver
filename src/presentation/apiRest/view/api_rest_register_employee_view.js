class APIRESTRegisterEmployeeView {
    constructor(serverResponse) {
        this._serverResponse = serverResponse;
    }

    sendRegisterEmployeeResponse(apiRestRegisterEmployeeViewModel) {
        this._serverResponse.json({
            isSuccessfulRegistration: apiRestRegisterEmployeeViewModel.isSuccessfulRegistration,
            message: apiRestRegisterEmployeeViewModel.message
        });
    }
}

module.exports = APIRESTRegisterEmployeeView;