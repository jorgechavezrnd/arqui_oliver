const { Router } = require('express');
const path = require('path');
const APIRESTController = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'controller', 'api_rest_controller')
);
const HTTPRequestManager = require(
    path.join(process.cwd(), 'src', 'utils', 'http_request_manager')
);

const router = new Router();

//------------------------------USE CASES ENDPOINTS----------------------------------

router.post('/registerEmployeeUseCase', async (req, res) => {
    console.log('Register Employee Use Case Start');
    let apiRestController = new APIRESTController(res);

    await apiRestController.registerEmployeeUseCase(req.body);

    console.log('Register Employee Use Case End');
});

router.get('/getEmployeesUseCase/:type', async (req, res) => {
    console.log('Get Employees Use Case Start');
    let apiRestController = new APIRESTController(res);

    await apiRestController.getEmployeesUseCase(req.params);

    console.log('Get Employees Use Case End');
});

//--------------------------------VIEWS ENDPOINTS------------------------------------

router.get('/', async (req, res) => {
    let employeesList = await HTTPRequestManager.getEmployeesRequest();

    res.render('index', { employeesList: employeesList });
});

router.get('/employee_registration_form', (req, res) => {
    res.render('employee_registration_form_view');
});

module.exports = router;