class RegisterEmployeeRequest {
    constructor(id, name, type, isInLaborUnion) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._isInLaborUnion = isInLaborUnion;
    }

    get id() { return this._id; }
    get name() { return this._name; }
    get type() { return this._type; }
    get isInLaborUnion() { return this._isInLaborUnion; }
}

module.exports = RegisterEmployeeRequest;