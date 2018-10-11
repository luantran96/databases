var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (username, roomname, message) {
 
 
        var userSQL = `SELECT id from users WHERE username = ?`;
        var roomSQL = `SELECT id from rooms WHERE roomname = ?`;
        var testSQL = `SELECT * from users`;
        var userID;
        var roomID;
             
      db.con.connect((err) => {               
        //check if username exists in db
      const FirstPromise = new Promise ( (resolve,reject) => {
        
        
        
      });
      
        db.con.query(userSQL, [username], function (err, result) {
          if (err) {
            console.log(err);
          }
          //if not then insert username into users table  
          if (!result) {
                
            var insertSQL = `INSERT INTO users (username) VALUES(?)`;
            db.con.query(insertSQL, [username], function (err, result) {     
              if( err ) {
                console.log(err);
              }       
              console.log(`Insert ${username} complete!`);
            });  
            //get new userid
            db.con.query(userSQL, [username], function (err, result) {     
              if( err ) {
                console.log('error');
              }       
              userID = result[0].id;            
            });        
          //if username exists, get userid         
          } else {
          console.log('result in username query:', result);

          userID = result[0].id;      
          } 
        });
        
        //check if roomname exists in db
        db.con.query(roomSQL, [roomname], function (err, result) {
          if (err) {
            console.log(err);
          }
          //if not, create new roomname & insert into rooms table
          if (!result.length) {         
            var insertSQL = `INSERT INTO rooms (roomname) VALUES(?)`;
            
            db.con.query(insertSQL, [roomname], function (err, result) {     
              if( err ) {
                console.log(err);
              }       
              console.log(`Insert ${roomname} complete!`);
            });  
            //get new roomid
            db.con.query(roomSQL, [roomname], function (err, result) {     
              if( err ) {
                console.log(err);
              }       
              roomID = result[0].id;       
            }); 
          //if room exists, grab roomid            
          } else {
            console.log('result in room query:', result);           
            roomID = result[0].id;
                      
          } 
        });
        
        console.log('roomID: ', roomID); 
        console.log('userID: ', userID);
        
        console.log('Before msgSQL');
        var msgSQL = `INSERT INTO messages (contents, roomID, userID) VALUES(?, ${roomID}, ${userID})`;
               
        db.con.query(msgSQL,[message], function (err, result) {
          if (err) {
            console.log(err);
          }
          
          console.log('Message inserted!');
        });
        
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

