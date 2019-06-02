const { Router } = require('express');
const path = require('path');
const HTTPRequestManager = require(
    path.join(process.cwd(), 'src', 'utils', 'http', 'http_request_manager')
);

const router = new Router();

router.get('/', async (req, res) => {
    let employeesList = await HTTPRequestManager.getEmployeesRequest();

    res.render('index', { employeesList: employeesList });
});

router.get('/employee_registration_form', (req, res) => {
    res.render('employee_registration_form_view');
});

module.exports = router;