const express = require('express');
const path = require('path');
const APIRESTController = require(
    path.join(process.cwd(), 'src', 'presentation', 'apiRest', 'controller', 'api_rest_controller')
);

class ServerConfigurator {
    static setUpServerVariables(server) {
        server.set('port', process.env.PORT || 3000);
    }

    static setUpServerMiddlewares(server) {
        server.use(express.json());
    }

    static setUpServerRoutes(server) {
        server.post('/registerEmployeeUseCase', async (req, res) => {
            console.log('Register Employee Use Case Start');
            let apiRestController = new APIRESTController(res);
    
            await apiRestController.registerEmployeeUseCase(req.body);
    
            console.log('Register Employee Use Case End');
        });
    }

    static startServer(server) {
        server.listen(server.get('port'), () => {
            console.log('Sever on port', server.get('port'));
        });
    }
}

module.exports = ServerConfigurator;