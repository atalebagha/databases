CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  'id' 'datatype',
  'userid' 'integer',
  'message' 'varchar',
  'roomname' 'integer'

  /* Describe your table here.*/
);

CREATE TABLE users (
  'id' 'integer',
  'username' 'varchar'
);

CREATE TABLE rooms (
  'id' 'integer',
  'roomane' 'varchar'
)

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

