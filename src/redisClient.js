
import redis from 'redis';
import Promise from 'bluebird';
import map from 'lodash/map';

Promise.promisifyAll(redis.RedisClient.prototype);

export default class RedisClient {

    constructor(redisService) {
        this.config = redisService;
    }

    getClient() {
        if (!this.client) {
            const { port, host } = this.config;
            this.client = redis.createClient(port, host);
        }
        return this.client;
    }

    set(key, value) {
        const client = this.getClient();
        return client.set(key, value);
    }

    get(key) {
        const client = this.getClient();
        return client.getAsync(key);
    }

    del(key) {
        const client = this.getClient();
        return client.delAsync(key);
    }

    keys(pattern) {
        const client = this.getClient();
        return client.keysAsync(pattern)
            .then(keys => map(keys, key => key && key.toString()));
    }

    deletePartition(partition) {
        return this.deleteKeysLike(`${partition}:*`);
    }

    deleteKeysLike(pattern) {
        return this.keys(pattern)
            .then((keys) => {
                const all = map(keys, key => this.del(key));
                return Promise.all(all);
            });
    }
}
