DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username VARCHAR(20),
  PRIMARY KEY (id),
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  userId int,
  roomname VARCHAR(30),
  message VARCHAR(50),
  PRIMARY KEY (id),
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  CONSTRAINT FK_userId FOREIGN KEY (userId) REFERENCES users(id)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

