const express = require('express');
const path = require('path');
const DatabaseInitializer = require(
    path.join(process.cwd(), 'src', 'utils', 'database', 'database_initializer')
);
const ServerConfigurator = require(
    path.join(process.cwd(), 'src', 'utils', 'server', 'server_configurator')
);

async function main() {
    await DatabaseInitializer.createDatabaseIfNotExist();

    const server = express();
    ServerConfigurator.setUpServerVariables(server);
    ServerConfigurator.setUpServerMiddlewares(server);
    ServerConfigurator.setUpServerRoutes(server);
    ServerConfigurator.startServer(server);
}

main();