
-- create database
create user '${MYSQL_USER}'@'localhost' identified by 'password';
create database if not exists ${MYSQL_DB_NAME};
grant all privileges on `${MYSQL_DB_NAME}`.* to 'myUser'@'localhost';
flush privileges;

-- create liquibase user
grant all privileges on `${MYSQL_DB_NAME}`.* to 'liquibase'@'localhost';
flush privileges;
