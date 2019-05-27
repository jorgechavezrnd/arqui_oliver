const express = require('express');
const path = require('path');
const RoutesConfigurator = require(
    path.join(process.cwd(), 'src', 'utils', 'routes_configurator')
);

class ServerConfigurator {
    static setUpServerVariables(server) {
        server.set('port', process.env.PORT || 3000);
    }

    static setUpServerMiddlewares(server) {
        server.use(express.json());
        server.set(
            'views',
            path.join(process.cwd(), 'src', 'presentation', 'ejs', 'view')
        );
        server.set('view engine', 'ejs');
    }

    static setUpServerRoutes(server) {
        server.use(RoutesConfigurator);
    }

    static startServer(server) {
        server.listen(server.get('port'), () => {
            console.log('Sever on port', server.get('port'));
        });
    }
}

module.exports = ServerConfigurator;