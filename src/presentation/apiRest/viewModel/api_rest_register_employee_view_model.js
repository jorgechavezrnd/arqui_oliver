class APIRESTRegisterEmployeeViewModel {
    constructor(isSuccessfulRegistration, message) {
        this._isSuccessfulRegistration = isSuccessfulRegistration;
        this._message = message;
    }

    get isSuccessfulRegistration() { return this._isSuccessfulRegistration; }
    get message() { return this._message; }
}

module.exports = APIRESTRegisterEmployeeViewModel;