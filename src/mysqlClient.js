
import mysql from 'mysql';
import Promise from 'bluebird';
import extend from 'lodash/extend';

export default class MySqlClient {

    constructor(mysqlService) {
        this.config = mysqlService;
    }

    query(...q) {
        return new Promise((resolve, reject) => {
            const pool = this.getPool();
            pool.query(...q, (err, data) => {
                err ? reject(err) : resolve(data);
            });
        });
    }

    getPool() {
        if (!this.pool) {
            const poolOpts = extend(
                { multipleStatements: true },
                this.config.getPoolParams()
            );
            this.pool = mysql.createPool(poolOpts);
        }
        return this.pool;
    }

}
