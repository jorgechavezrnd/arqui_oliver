class Employee {
    constructor(id, name, type, isInLaborUnion, registrationDate) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._isInLaborUnion = isInLaborUnion;
        this._registrationDate = registrationDate;
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get type() { return this._type; }
    get isInLaborUnion() { return this._isInLaborUnion; }
    get registrationDate() { return this._registrationDate; }

    set id(id) { this._id = id; }
    set name(name) { this._name = name; }
    set type(type) { this._type = type; }
    set isInLaborUnion(isInLaborUnion) { this._isInLaborUnion = isInLaborUnion; }
    set registrationDate(registrationDate) { this._registrationDate = registrationDate; }
}

module.exports = Employee;