


DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id int NOT NULL AUTO_INCREMENT,
  roomname VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL AUTO_INCREMENT,
  userID int,
  roomID int,
  contents VARCHAR(50),
  PRIMARY KEY (id),
  CONSTRAINT FK_userID FOREIGN KEY (userID) REFERENCES users(id),
  CONSTRAINT FK_roomID FOREIGN KEY (roomID) REFERENCES rooms(id)
);


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

