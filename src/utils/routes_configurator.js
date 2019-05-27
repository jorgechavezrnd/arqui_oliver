const { Router } = require('express');
const path = require('path');
const APIRESTController = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'controller', 'api_rest_controller')
);
const EmployeeRegistrationFormViewModel = require(
    path.join(process.cwd(), 'src', 'presentation', 'ejs', 'viewModel', 'employee_registration_form_view_model')
);

const router = new Router();

router.post('/registerEmployeeUseCase', async (req, res) => {
    console.log('Register Employee Use Case Start');
    let apiRestController = new APIRESTController(res);

    await apiRestController.registerEmployeeUseCase(req.body);

    console.log('Register Employee Use Case End');
});

router.get('/', (req, res) => {
    let employeeRegistrationFormViewModel = new EmployeeRegistrationFormViewModel(
        'Nuevo Empleado',
        'CI',
        'Nombre',
        'Tipo',
        'Está en el sidicato',
        'Registrar',
        {
            'Por hora': 'H',
            'Fijo': 'F',
            'Por comisión': 'C',
        }
    );

    res.render('employee_registration_form_view', { model: employeeRegistrationFormViewModel });
});

module.exports = router;