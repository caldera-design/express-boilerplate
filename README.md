Caldera Products Service
---------------

Dependencies
============

First ensure that you have all the necessary dependencies. This project requires `node`, `maven` and `mysql`.

Installation
============

Install all the node modules, and then install and run liquibase.

NOTE: You will want to edit the database installation script, `./sql/createDb.sql`, before running it.

```sh
npm install
mysql.server start

# edit with your mysql configuration
export MYSQL_USER=myUser
export MYSQL_DB_NAME=myDatabase
export MYSQL_ADDR=localhost:3306

mysql -u root < ./sql/createDb.sql
mvn clean dependency:copy-dependencies
mvn liquibase:update
```

Usage
============

```sh
npm start
npm run build
```

Copyright and License
============
Code and documentation copyright 2017 Jon Brennecke. Code released under the MIT license. Docs released under Creative Commons.
