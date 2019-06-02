class GetEmployeesResponse {
    constructor(employeesList) {
        this._employeesList = employeesList;
    }

    get employeesList() { return this._employeesList; }
}

module.exports = GetEmployeesResponse;