-- 1. EMPLOYEE TABLE
CREATE TABLE IF NOT EXISTS Employee (
    id TEXT,
    name TEXT,
    type TEXT,
    isInLaborUnion BOOLEAN,
    registrationDate DATE,
    PRIMARY KEY(id)
);