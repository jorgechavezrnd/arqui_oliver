const express = require('express');
const path = require('path');
const APIRESTRoutesConfigurator = require(
    path.join(process.cwd(), 'src', 'utils', 'routes', 'api_rest_routes_configurator')
);
const EJSRoutesConfigurator = require(
    path.join(process.cwd(), 'src', 'utils', 'routes', 'ejs_routes_configurator')
);

class ServerConfigurator {
    static setUpServerVariables(server) {
        server.set('port', process.env.PORT || 3000);
        server.set(
            'views',
            path.join(process.cwd(), 'src', 'presentation', 'ejs', 'view')
        );
        server.set('view engine', 'ejs');
    }

    static setUpServerMiddlewares(server) {
        server.use(express.urlencoded({ extended: false }));
        server.use(express.json());
    }

    static setUpServerRoutes(server) {
        server.use(APIRESTRoutesConfigurator);
        server.use(EJSRoutesConfigurator);
    }

    static startServer(server) {
        server.listen(server.get('port'), () => {
            console.log('Sever on port', server.get('port'));
        });
    }
}

module.exports = ServerConfigurator;