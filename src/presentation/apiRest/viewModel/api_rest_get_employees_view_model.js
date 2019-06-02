class APIRESTGetEmployeesViewModel {
    constructor(employeesList) {
        this._employeesListJSON = [];

        employeesList.forEach((employee) => {
            this._employeesListJSON.push({
                id: employee.id,
                name: employee.name,
                type: employee.type,
                isInLaborUnion: employee.isInLaborUnion,
                registrationDate: employee.registrationDate
            });
        });
    }

    get employeesListJSON() { return { employeesList: this._employeesListJSON }; }
}

module.exports = APIRESTGetEmployeesViewModel;