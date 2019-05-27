const { Router } = require('express');
const path = require('path');
const APIRESTController = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'controller', 'api_rest_controller')
);

const router = new Router();

router.post('/registerEmployeeUseCase', async (req, res) => {
    console.log('Register Employee Use Case Start');
    let apiRestController = new APIRESTController(res);

    await apiRestController.registerEmployeeUseCase(req.body);

    console.log('Register Employee Use Case End');
});

module.exports = router;