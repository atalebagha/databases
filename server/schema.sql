CREATE DATABASE IF NOT EXISTS chat;

USE chat;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(32) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);



DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms (
   id INT NOT NULL AUTO_INCREMENT,
   roomname VARCHAR(64) NOT NULL UNIQUE,
   PRIMARY KEY (id)
);



DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(140) NULL DEFAULT NULL,
  createdAt TIMESTAMP NOT NULL,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
