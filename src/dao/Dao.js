
/*

NOTE: this is just a very simple base class for DAOs (Database Access Objects)

*/
export default class Dao {
    constructor(mysqlClient) {
        this.client = mysqlClient;
    }
}
