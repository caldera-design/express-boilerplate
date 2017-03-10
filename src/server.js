
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import healthCheck from 'express-healthcheck';
import cors from 'cors';
import morgan from 'morgan';

import log from './log';

export default function startServer({ server: { port } }) {
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors({
        origin: true,
        credentials: true,
        preflightContinue: true
    }));
    app.use(morgan('combined'));
    app.set('trust proxy', true);

    const errorHandler = require('express-error-handler');
    const handler = errorHandler({
        serializer(err) {
            const body = {
                status: err.status,
                message: err.message
            };
            if (errorHandler.isClientError(err.status)) {
                ['code', 'name', 'type', 'details'].forEach(function(prop) {
                    if (err[prop]) {
                        body[prop] = err[prop];
                    }
                });
            }
            return body;
        }
    });

    // When the "domain" is "localhost", set offset to 1
    if (process.env.NODE_ENV !== 'production') {
        app.set('subdomain offset', 1);
    }

    const router = express.Router();
    router.use('/healthcheck', healthCheck());

    /*
    TODO:
    add your custom routes here:

    router.use('/myRoute', myRouteHandler);

    */

    app.use('/api', router);

    app.use(errorHandler.httpError(400));
    app.use(errorHandler.httpError(401));
    app.use(errorHandler.httpError(404));
    app.use(errorHandler.httpError(500));
    app.use(handler);

    return app.listen(port, () => {
        log.debug(`Listening on localhost:${port}`);
    });
}
