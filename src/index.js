
if (process.env.NODE_ENV === 'production') {
    require('newrelic');
}

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Promise from 'bluebird';

import startServer from './server';
import log from './log';

Promise.resolve()
    .then(() => loadConfig())
    .then(config => {
        log.debug('Starting server');
        return startServer(config);
    });

function loadConfig() {
    const yamlPath = path.join(__dirname, '../app.yml');
    return yaml.load(fs.readFileSync(yamlPath, 'utf8'));
}
