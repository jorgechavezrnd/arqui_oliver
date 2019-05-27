class EmployeeRegistrationFormViewModel {
    constructor(title, ciText, nameText, typeText, isInLaborUnionText, registerButtonText, employeeTypes) {
        this._title = title;
        this._ciText = ciText;
        this._nameText = nameText;
        this._typeText = typeText;
        this._isInLaborUnionText = isInLaborUnionText;
        this._registerButtonText = registerButtonText;
        this._employeeTypes = employeeTypes;
    }

    get title() { return this._title; }
    get ciText() { return this._ciText; }
    get nameText() { return this._nameText; }
    get typeText() { return this._typeText; }
    get isInLaborUnionText() { return this._isInLaborUnionText; }
    get registerButtonText() { return this._registerButtonText; }
    get employeeTypes() { return this._employeeTypes; }
}

module.exports = EmployeeRegistrationFormViewModel;