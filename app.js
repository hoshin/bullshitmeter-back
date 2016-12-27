const debug = require('debug')('core');

import {Server} from 'hapi';
import logger from 'morgan';
import {routes} from './routes/indexRouter';

const app = new Server();

app.connection({port: process.env.PORT || 3000});

app.route(routes);
app.register([ require('vision'), require('inert') ], function ( err ) {
    if (err) {
        logger.error('Failed to load a plugin:', {errorMessage: err.message});
        throw err;
    }
    app.views({
        engines: {
            ejs: require('ejs')
        },
        relativeTo: __dirname,
        path: './views'
    });
});
app.start(( err ) => {
    if (err) {
        throw err;
    }
    debug('Express server listening on port ' + app.info.port);
});

module.exports = app;